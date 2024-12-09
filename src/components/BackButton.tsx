import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { ROUTES } from '@/constants/routes';
import { memo, useCallback } from 'react';

type BackButtonProps = {
  onBack?: () => void;
} & IconButtonProps;

const BackButton = memo(({ onBack, ...props }: BackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickBack = useCallback(() => {
    if (onBack) onBack();
    if (location.pathname === ROUTES.home) return;

    if (window.history.length > 1) {
      const previousUrl = document.referrer;
      const currentDomain = window.location.origin;

      if (previousUrl && previousUrl.startsWith(currentDomain)) {
        window.history.back();
      } else {
        navigate(ROUTES.home);
      }
    } else {
      navigate(ROUTES.home);
    }
  }, [location.pathname, navigate, onBack]);

  return (
    <IconButton onClick={onClickBack} {...props}>
      <IoMdArrowBack />
    </IconButton>
  );
});

export default BackButton;
