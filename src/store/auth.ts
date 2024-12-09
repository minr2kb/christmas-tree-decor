import { atom } from 'jotai';
import { Session } from '@supabase/supabase-js';
import { AuthStatus } from '@/types/auth';

export const sessionAtom = atom<Session | null>();

// session 상태에 따라 자동으로 authStatus가 결정되도록 함
export const authStatusAtom = atom((get) => {
  const session = get(sessionAtom);

  if (session === undefined) return AuthStatus.LOADING;
  if (session) return AuthStatus.AUTHENTICATED;
  return AuthStatus.UNAUTHENTICATED;
});

export const userAtom = atom((get) => get(sessionAtom)?.user ?? null);
