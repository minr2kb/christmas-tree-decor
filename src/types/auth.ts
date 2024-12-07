export type Provider = 'google' | 'kakao';

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  avatar: string;
  created_at: string;
  provider: Provider;
}
