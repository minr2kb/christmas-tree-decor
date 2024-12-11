import AuthAPI from '@/api/auth';
import { toaster } from '@/components/ui/toaster';
import { Tooltip } from '@/components/ui/tooltip';

import useConfirmDialog from '@/hooks/useConfirmDialog';
import useLoginModal from '@/hooks/useLoginModal';
import useSession from '@/hooks/useSession';
import { Heading, Link, Separator, Text, VStack } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { LuLogIn } from 'react-icons/lu';
import { MdFormatListBulleted } from 'react-icons/md';
import { RiQrScan2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import PageLayout from '@/components/PageLayout';
import { logger } from '@/utils/logger';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSession();
  const { confirm } = useConfirmDialog();
  const { openLoginModal } = useLoginModal();

  const handleCreateTree = () => {
    if (!isAuthenticated) {
      confirm({
        title: '로그인 후 이용 가능해요!',
        body: '로그인 후 트리를 만들어보세요',
        onConfirm: () => openLoginModal({ redirectUrl: ROUTES.create }),
        confirmText: '로그인',
      });
      return;
    }
    navigate(ROUTES.create);
  };

  const handleScanTree = () => {
    navigate(ROUTES.scan);
  };

  const handleLogin = () => {
    openLoginModal();
  };

  const handleTrees = () => {
    navigate(ROUTES.myTrees);
  };

  const handleFeedback = () => {
    logger.info('Feedback clicked');
  };

  const handleLogout = async () => {
    try {
      await AuthAPI.signOut();
      logger.info('Logged out');
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

  return (
    <PageLayout center headerProps={{ showBackButton: false, showLogo: true }}>
      <Heading fontSize="2xl">크리스마스 트리 꾸미기🎄</Heading>
      <Text fontSize="md" color="gray.200">
        실시간으로 함께 꾸미는 크리스마스 트리
      </Text>
      <VStack gap={4} mt={7} w="full">
        <Tooltip
          content="로그인 후 이용 가능해요!"
          positioning={{ placement: 'top' }}
          showArrow
          disabled={!!isAuthenticated}
        >
          <Button w="full" onClick={handleCreateTree} _icon={{ boxSize: 4 }}>
            새로운 트리 만들기
            <IoMdAdd />
          </Button>
        </Tooltip>
        <Button w="full" onClick={handleScanTree} _icon={{ boxSize: 4 }}>
          기존 트리 꾸미기
          <RiQrScan2Line />
        </Button>
        <Separator />
        {isAuthenticated && (
          <Button variant={'subtle'} w="full" onClick={handleTrees} _icon={{ boxSize: 4 }}>
            내 트리 관리
            <MdFormatListBulleted />
          </Button>
        )}
        <Button
          variant={'subtle'}
          w="full"
          onClick={isAuthenticated ? handleLogout : handleLogin}
          _icon={{ boxSize: 4 }}
        >
          {isAuthenticated ? '로그아웃' : '간편로그인'}
          <LuLogIn />
        </Button>

        <Link variant={'underline'} fontSize="xs" mt={3} href="mailto:kbmin1129@gmail.com" onClick={handleFeedback}>
          피드백 보내기
        </Link>
      </VStack>
    </PageLayout>
  );
};

export default HomePage;
