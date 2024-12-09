import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { ROUTES } from '@/constants/routes';
import { useCallback } from 'react';

type BackButtonProps = {
  onBack?: () => void;
} & IconButtonProps;

const BackButton = ({ onBack, ...props }: BackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClickBack = useCallback(() => {
    if (onBack) onBack();
    if (location.pathname === ROUTES.home) return;

    if (window.history.length > 1) {
      // 브라우저의 이전 기록 확인
      const previousUrl = document.referrer; // 이전 페이지 URL
      const currentDomain = window.location.origin;

      if (previousUrl && previousUrl.startsWith(currentDomain)) {
        // 이전 URL이 같은 도메인 내라면 뒤로가기
        window.history.back();
      } else {
        // 외부 URL이거나 이전 기록이 없을 경우 홈으로 이동
        navigate(ROUTES.home);
      }
    } else {
      // 히스토리 스택이 없으면 홈으로 이동
      navigate(ROUTES.home);
    }
  }, [location.pathname, navigate, onBack]);

  return (
    <IconButton onClick={onClickBack} {...props}>
      <IoMdArrowBack />
    </IconButton>
  );
};

export default BackButton;
