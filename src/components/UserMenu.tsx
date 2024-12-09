import { Box, BoxProps, Separator } from '@chakra-ui/react';
import useSession from '@/hooks/useSession';
import { toaster } from '@/components/ui/toaster';
import { MenuContent, MenuItem, MenuItemGroup, MenuRoot, MenuTrigger } from './ui/menu';
import { Avatar } from './ui/avatar';
import { Button, ButtonProps } from './ui/button';
import AuthAPI from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import useLoginModal from '@/hooks/useLoginModal';
import { memo, useCallback } from 'react';

type UserMenuProps = {
  containerProps?: BoxProps;
  triggerProps?: ButtonProps;
};

const UserMenu = memo(({ containerProps, triggerProps }: UserMenuProps) => {
  const { user, isAuthenticated } = useSession();
  const navigate = useNavigate();
  const { openLoginModal } = useLoginModal();

  const handleLogin = () => {
    openLoginModal();
  };

  const handleLogout = useCallback(async () => {
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
  }, []);

  const handleTrees = useCallback(() => {
    navigate(ROUTES.myTrees);
  }, [navigate]);

  const handleFeedback = useCallback(() => {
    window.open('mailto:kbmin1129@gmail.com', '_blank');
  }, []);

  return (
    <Box {...containerProps}>
      {isAuthenticated ? (
        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="ghost" p={0} {...triggerProps}>
              <Avatar size="xs" name={user?.email} src={user?.user_metadata?.avatar_url} shape="rounded" />
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItemGroup>
              <MenuItem value="trees" onClick={handleTrees}>
                내 트리 관리
              </MenuItem>

              <MenuItem value="logout" onClick={handleLogout} color="fg.error">
                로그아웃
              </MenuItem>
            </MenuItemGroup>
            <Separator />
            <MenuItemGroup>
              <MenuItem value="feedback" onClick={handleFeedback} color="fg.subtle">
                피드백 보내기
              </MenuItem>
            </MenuItemGroup>
          </MenuContent>
        </MenuRoot>
      ) : (
        <Button variant="outline" {...triggerProps} onClick={handleLogin}>
          로그인
        </Button>
      )}
    </Box>
  );
});

export default UserMenu;
