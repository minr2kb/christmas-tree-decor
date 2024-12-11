import supabase from '@/supabase/client';
import { Provider } from '@/types/auth';
import { logger } from '@/utils/logger';

class AuthAPI {
  static signInWithProvider = async (provider: Provider, redirectUrl?: string) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectUrl=${redirectUrl}`,
      },
    });

    if (error) {
      logger.error('Error signing in', error, {
        provider,
        redirectUrl,
      });
      throw error;
    }
    return data;
  };

  static signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      logger.error('Error signing out:', error);
      throw error;
    }
  };
}

export default AuthAPI;
