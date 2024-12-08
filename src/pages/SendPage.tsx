import { Box, Container, Flex, Image, Input, Text } from '@chakra-ui/react';
import { ORNAMENT_TYPE_COUNT, SEND_ANIMATION_DURATION } from '@/constants/consts';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { keyframes } from '@emotion/react';
import { Button } from '@/components/ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import { PiMonitorArrowUp } from 'react-icons/pi';
import useSendPage from '@/hooks/logic/useSendPage';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

const DropAndFlyAnimation = keyframes`
  0% { transform: translateY(0%); opacity: 1; }
  20% { transform: translateY(20%); opacity: 1; }
  40% { transform: translateY(10%); opacity: 1; }
  100% { transform: translateY(-1000%); opacity: 0; }
`;

const SendPage = () => {
  const {
    settings,
    handleOpen,
    handleSend,
    handleReset,
    statusText,
    isSending,
    isSent,
    selectedType,
    name,
    isOpen,
    dispatch,
    isValidTreeId,
    isLoading,
  } = useSendPage();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isValidTreeId) {
    return <ErrorPage error={new Error('트리를 찾을 수 없어요')} />;
  }

  return (
    <Container
      maxW="sm"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={8}
      bgColor="bg"
    >
      <Text fontSize="xl">{statusText}</Text>
      <Box w="full" position="relative" h="20vh" p={4}>
        {!isSending && !isSent && (
          <Slider {...settings}>
            {Array.from({ length: ORNAMENT_TYPE_COUNT }).map((_, index) => (
              <Image
                key={index + 1}
                src={`/assets/ornaments/orn2-${index + 1}.png`}
                alt={`ornament-${index + 1}`}
                h="20vh"
                objectFit="contain"
                mx="auto"
              />
            ))}
          </Slider>
        )}
        {isSending && !isSent && (
          <Box height="100%" width="100%">
            <Image
              src={`/assets/ornaments/orn2-${selectedType}.png`}
              alt={`ornament-${selectedType}`}
              h="20vh"
              css={{
                mx: 'auto',
                objectFit: 'contain',
                objectPosition: 'center',
                animation: `${DropAndFlyAnimation} ${SEND_ANIMATION_DURATION}s ease-in-out forwards`,
                filter: 'drop-shadow(0 0 5px #fff)',
                zIndex: 'popover',
              }}
            />
          </Box>
        )}
        {isSent && (
          <Flex justifyContent="center" alignItems="center" height="100%">
            <PiMonitorArrowUp size={120} style={{ opacity: 0.7 }} />
          </Flex>
        )}
      </Box>

      <Flex direction="column" gap={4} width="100%" mt={8}>
        <Input
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
          size="lg"
          textAlign="center"
          disabled={isSending || isSent}
          bgColor="bg"
        />
        <Button size="lg" disabled={!name.trim() || isSending} onClick={isSent ? handleReset : handleOpen}>
          {isSent ? '다시하기' : '트리에 달기'}
        </Button>
      </Flex>
      <DialogRoot
        key={'confirm-modal'}
        placement={'center'}
        motionPreset="slide-in-bottom"
        size={'xs'}
        lazyMount
        open={isOpen}
        onOpenChange={(e) => dispatch({ type: 'SET_MODAL', payload: e.open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>트리에 장식을 달까요?</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text fontSize="md">스크린에 선택한 장식과 이름이 표시됩니다</Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">취소</Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Button onClick={handleSend}>확인</Button>
            </DialogActionTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Container>
  );
};

export default SendPage;
