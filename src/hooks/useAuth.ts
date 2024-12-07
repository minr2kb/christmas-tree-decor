import { useCallback } from 'react';
import supabase from '@/supabase/client';
import { Provider } from '@/types/auth';
import { toaster } from '@/components/ui/toaster';

const useAuth = () => {
  const signInWithProvider = useCallback(async (provider: Provider, from?: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?from=${from}`,
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      toaster.error({
        title: '로그인 실패',
        description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했어요',
      });
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      toaster.error({
        title: '로그아웃 실패',
        description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했어요',
      });
      throw error;
    }
  }, []);

  return {
    signInWithProvider,
    signOut,
  };
};

export default useAuth;
