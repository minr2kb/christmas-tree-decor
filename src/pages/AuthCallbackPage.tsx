import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import supabase from '@/supabase/client';
import LoadingPage from './LoadingPage';
import { toaster } from '@/components/ui/toaster';

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
        navigate(from || '/');
      }
    });
  }, [navigate]);

  return <LoadingPage />;
};

export default AuthCallbackPage;
