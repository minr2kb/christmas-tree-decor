import { ROUTES } from '@/constants/routes';
import useLoginModal from '@/hooks/useLoginModal';
import useSession from '@/hooks/useSession';
import LoadingPage from '@/pages/LoadingPage';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  /**
   * 로그인 필수 여부
   */
  requireAuth?: boolean;
  /**
   * 인증 실패시 리다이렉트 경로
   */
  redirectTo?: string;
  /**
   * 모달로 로그인 표시
   */
  showLoginModal?: boolean;
};

const ProtectedRoute = ({
  requireAuth = false,
  redirectTo = ROUTES.home,
  showLoginModal = false,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useSession();
  const { openLoginModal } = useLoginModal();

  // 로그인 모달 열기
  useEffect(() => {
    console.log('isLoading', isLoading);
    if (isLoading) return;
    if (requireAuth && !isAuthenticated && showLoginModal) {
      openLoginModal({ onCancel: () => navigate(redirectTo) });
      return;
    }

    if (requireAuth && !isAuthenticated && !showLoginModal) {
      navigate(redirectTo, { state: { from: location.pathname } });
      return;
    }
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (requireAuth && !isAuthenticated && !showLoginModal) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
