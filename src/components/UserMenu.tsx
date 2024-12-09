import { Box, BoxProps } from '@chakra-ui/react';
import useSession from '@/hooks/useSession';
import { toaster } from '@/components/ui/toaster';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from './ui/menu';
import { Avatar } from './ui/avatar';
import { Button, ButtonProps } from './ui/button';
import AuthAPI from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import useLoginModal from '@/hooks/useLoginModal';

type UserMenuProps = {
  containerProps?: BoxProps;
  triggerProps?: ButtonProps;
};

const UserMenu = ({ containerProps, triggerProps }: UserMenuProps) => {
  const { user, isAuthenticated } = useSession();
  const navigate = useNavigate();
  const { openLoginModal } = useLoginModal();

  const handleLogin = () => {
    openLoginModal();
  };

  const handleLogout = async () => {
    try {
      await AuthAPI.signOut();
      toaster.success({
        title: '로그아웃 성공',
      });
    } catch (error) {
      toaster.error({
        title: '로그아웃 실패',
        description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했어요',
      });
    }
  };

  const handleTrees = () => {
    navigate(ROUTES.myTrees);
  };

  return (
    <Box {...containerProps}>
      {isAuthenticated ? (
        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="ghost" p={0} {...triggerProps}>
              <Avatar size="sm" name={user?.email} src={user?.user_metadata?.avatar_url} shape="rounded" />
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="trees" onClick={handleTrees}>
              내 트리 관리
            </MenuItem>
            <MenuItem value="logout" onClick={handleLogout}>
              로그아웃
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      ) : (
        <Button variant="outline" {...triggerProps} onClick={handleLogin}>
          로그인
        </Button>
      )}
    </Box>
  );
};

export default UserMenu;
