import { Box, Text } from '@chakra-ui/react';
import useSession from '@/hooks/useSession';
import useAuth from '@/hooks/useAuth';
import { toaster } from '@/components/ui/toaster';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from './ui/menu';
import { Avatar } from './ui/avatar';
import { Button } from './ui/button';

const UserMenu = () => {
  const { user, isAuthenticated } = useSession();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    toaster.success({
      title: '로그아웃 성공',
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box position="fixed" top={4} right={4}>
      <MenuRoot>
        <MenuTrigger asChild>
          <Button variant="ghost">
            <Avatar size="xs" name={user?.email} src={user?.user_metadata?.avatar_url} />
            <Text fontSize="sm">{user?.email}</Text>
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem value="logout" onClick={handleLogout}>
            로그아웃
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </Box>
  );
};

export default UserMenu;
