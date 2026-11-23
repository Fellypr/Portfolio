export class ApiError<T = unknown> extends Error {
  status: number;
  statusText: string;
  data: T | null;
  headers: Headers;

  constructor(
    status: number,
    statusText: string,
    data: T | null,
    headers: Headers,
    message?: string
  ) {
    let defaultMessage = `Erro HTTP: ${status} ${statusText}`;

    if (data && typeof data === 'object') {
      const dataObj = data as Record<string, unknown>;
      if (typeof dataObj.mensagem === 'string') {
        defaultMessage = dataObj.mensagem;
      } else if (typeof dataObj.message === 'string') {
        defaultMessage = dataObj.message;
      }
    }

    super(message || defaultMessage);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.headers = headers;
  }
}

/**
 * Recupera o token de autenticação de forma compatível com Browser e SSR.
 */
async function resolveAuthToken(): Promise<string | null> {
  if (typeof window !== 'undefined') {
    // 1. Tenta localStorage
    const local = localStorage.getItem('auth_token');
    if (local) return local;

    // 2. Tenta cookie do navegador
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith('auth_session_token='));
    if (match) {
      return decodeURIComponent(match.split('=')[1]);
    }
    return null;
  }

  // Contexto Server-Side (Next.js Server Components / Server Actions)
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get('auth_session_token')?.value || null;
  } catch {
    return null;
  }
}

export async function customFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const fullUrl = `${baseUrl}${url}`;

  const headers = new Headers(options?.headers);
  if (!headers.has('Content-Type') && options?.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Injeção transparente de Authorization: Bearer <token>
  if (!headers.has('Authorization')) {
    const token = await resolveAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json') || contentType.includes('+json');

  let responseData: any = null;
  if (response.status !== 204 && response.status !== 205) {
    try {
      responseData = isJson ? await response.json() : await response.text();
    } catch {
      responseData = null;
    }
  }

  if (!response.ok) {
    // Tratamento defensivo em 401 Unauthorized
    if (response.status === 401 && typeof window !== 'undefined') {
      window.dispatchEvent(new Event('auth:unauthorized'));
    }

    throw new ApiError(
      response.status,
      response.statusText,
      responseData,
      response.headers
    );
  }

  return {
    data: responseData,
    status: response.status,
    headers: response.headers,
  } as T;
}

export default customFetch;