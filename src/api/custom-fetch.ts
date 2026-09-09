export type CustomFetchConfig = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, string>;
  data?: unknown;
  headers?: HeadersInit;
  signal?: AbortSignal;
};

export async function customFetch<T>({
  url,
  method,
  params,
  data,
  headers,
  signal,
}: CustomFetchConfig): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  
  // Monta os query parameters caso existam
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  const fullUrl = `${baseUrl}${url}${queryString}`;

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
    signal,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || `Erro HTTP: ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}