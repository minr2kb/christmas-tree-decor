import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import supabase from '@/supabase/client';
import LoadingPage from './LoadingPage';
import { toaster } from '@/components/ui/toaster';
import { ROUTES } from '@/constants/routes';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        toaster.success({
          title: '로그인 성공',
        });
      }
      navigate(redirectUrl || ROUTES.home, { replace: true });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <LoadingPage />;
};

export default AuthCallbackPage;
