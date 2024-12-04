import { useNavigate } from 'react-router-dom';
import { Button, Container, Text } from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';

const HomePage = () => {
  const navigate = useNavigate();
  const onStart = () => {
    navigate('/create');
  };
  return (
    <Container
      maxW="xs"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
      bgColor="bg"
    >
      <Text fontSize="2xl" fontWeight="bold">
        크리스마스 트리 꾸미기🎄
      </Text>
      <Text fontSize="md" color="gray.200">
        실시간으로 함께 꾸미는 크리스마스 트리
      </Text>

      <Button onClick={onStart} mt={10}>
        시작하기 <LuArrowRight />
      </Button>
    </Container>
  );
};

export default HomePage;
