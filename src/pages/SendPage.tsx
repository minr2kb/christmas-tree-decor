import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';
import { ORNAMENT_TYPE_COUNT, SEND_ANIMATION_DURATION } from '@/constants/ui';
import { keyframes } from '@emotion/react';
import { Button } from '@/components/ui/button';
import { PiMonitorArrowUp } from 'react-icons/pi';
import useSendPage from '@/hooks/logic/useSendPage';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PageLayout from '@/components/PageLayout';

const DropAndFlyAnimation = keyframes`
  0% { transform: translateY(0%); opacity: 1; }
  20% { transform: translateY(20%); opacity: 1; }
  40% { transform: translateY(10%); opacity: 1; }
  100% { transform: translateY(-1000%); opacity: 0; }
`;

const SendPage = () => {
  const {
    sliderSettings,
    statusText,
    isSubmitting,
    isSubmitted,
    name,
    selectedType,
    setName,
    isValidTreeId,
    isLoading,
    handleSend,
    handleReset,
  } = useSendPage();

  return (
    <PageLayout
      headerProps={{ title: '트리 장식하기' }}
      center
      containerProps={{ maxW: 'sm' }}
      isLoading={isLoading}
      isError={!isValidTreeId}
      error={new Error('트리를 찾을 수 없어요')}
    >
      <Text fontSize="xl" textAlign="center">
        {statusText}
      </Text>
      <Box w="full" position="relative" h="20vh" p={4}>
        {!isSubmitting && !isSubmitted && (
          <Slider {...sliderSettings}>
            {Array.from({ length: ORNAMENT_TYPE_COUNT }).map((_, index) => (
              <Image
                key={index + 1}
                src={`/assets/images/ornaments/orn2-${index + 1}.png`}
                alt={`ornament-${index + 1}`}
                h="20vh"
                objectFit="contain"
                mx="auto"
              />
            ))}
          </Slider>
        )}
        {isSubmitting && !isSubmitted && (
          <Box height="100%" width="100%">
            <Image
              src={`/assets/images/ornaments/orn2-${selectedType}.png`}
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
        {isSubmitted && (
          <Flex justifyContent="center" alignItems="center" height="100%">
            <PiMonitorArrowUp size={120} style={{ opacity: 0.7 }} />
          </Flex>
        )}
      </Box>

      <Flex direction="column" gap={4} width="100%" mt={8}>
        <Input
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="lg"
          textAlign="center"
          disabled={isSubmitting || isSubmitted}
          bgColor="bg"
        />
        <Button size="lg" disabled={!name.trim() || isSubmitting} onClick={isSubmitted ? handleReset : handleSend}>
          {isSubmitted ? '다시하기' : '트리에 달기'}
        </Button>
      </Flex>
    </PageLayout>
  );
};

export default SendPage;
