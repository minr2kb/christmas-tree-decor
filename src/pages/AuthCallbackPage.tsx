import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import supabase from '@/supabase/client';
import LoadingPage from './LoadingPage';
import { toaster } from '@/components/ui/toaster';
import { ROUTES } from '@/constants/routes';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        toaster.success({
          title: '로그인 성공',
        });
        navigate(from || ROUTES.home);
      }
    });
  }, [navigate]);

  return <LoadingPage />;
};

export default AuthCallbackPage;
