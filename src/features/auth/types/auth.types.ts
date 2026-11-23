import type {
  AuthResponseDto,
  UserResponseDto,
  StringApiResponse,
  ProblemDetails,
} from '@/api/generated/interfaces';

/**
 * Payload para requisição de login.
 * Permite tanto username quanto email para total flexibilidade com o formulário.
 */
export type LoginCredentials = {
  username?: string;
  email?: string;
  password: string;
};

/**
 * Resposta de autenticação retornada pelo backend.
 */
export type AuthResponse = AuthResponseDto;

/**
 * Sessão do usuário autenticado no sistema.
 */
export type UserSession = {
  token: string;
  username: string;
  email: string;
  expiresAt?: string;
};

/**
 * Dados de perfil do usuário retornados pelo endpoint /api/Users/me.
 */
export type CurrentUser = UserResponseDto;

/**
 * Resposta de erro estruturada da API de autenticação.
 */
export type AuthApiErrorResponse = StringApiResponse | ProblemDetails;

/**
 * Interface de estado da autenticação local / contexto de sessão.
 */
export interface AuthState {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
