import PageLayout from '@/components/PageLayout';
import QRScanner from '@/components/QRScanner';
import { Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ScanPage = () => {
  // 컴포넌트나 훅에서 사용
  const navigate = useNavigate();

  const handleScan = (result: string) => {
    // 경로 패턴 검사를 위한 정규식
    const isTreePath = (path: string): boolean => {
      const baseUrl = window.location.origin;
      const treePathRegex = new RegExp(`^${baseUrl}/send/[^/]+$`);
      return treePathRegex.test(path);
    };

    // 트리 ID 추출 함수
    const extractTreePath = (path: string): string => {
      const match = path.match(/\/send\/[^/]+$/);
      return match ? match[0] : '';
    };

    if (isTreePath(result)) {
      const treePath = extractTreePath(result);
      navigate(treePath);
    }
  };

  const handleError = (error: Error) => {
    console.error('스캔 에러:', error);
  };

  return (
    <PageLayout disablePadding headerProps={{ title: 'QR 스캔' }} maxWidth={'100vw'}>
      <Box w="100vw" h="80vh" position="relative">
        <QRScanner onScan={handleScan} onError={handleError} />
        <Box position="absolute" bottom={20} left={0} right={0}>
          <Text textAlign="center" bgColor={'blackAlpha.300'} fontWeight={'bold'} p={2}>
            스크린에 표시된 QR코드를 찍어주세요
          </Text>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default ScanPage;
