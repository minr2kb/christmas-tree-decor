export type Provider = 'google' | 'kakao';

export enum AuthStatus {
  LOADING = 'LOADING',
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}
