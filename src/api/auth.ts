import supabase from '@/supabase/client';
import { Provider } from '@/types/auth';

export const signInWithProvider = async (provider: Provider, from?: string) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback?from=${from}`,
    },
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
