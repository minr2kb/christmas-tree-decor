import supabase from '@/supabase/client';
import { Provider } from '@/types/auth';

class AuthAPI {
  static signInWithProvider = async (provider: Provider, redirectUrl?: string) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectUrl=${redirectUrl}`,
      },
    });

    if (error) throw error;
    return data;
  };

  static signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };
}

export default AuthAPI;
