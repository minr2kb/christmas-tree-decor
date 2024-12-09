import { Center } from '@chakra-ui/react';
import { BarLoader } from 'react-spinners';

const LoadingPage = () => {
  return (
    <Center h="100dvh" bg="bg">
      <BarLoader color="#FFF" />
    </Center>
  );
};

export default LoadingPage;
