import { Center } from '@chakra-ui/react';
import { BarLoader } from 'react-spinners';

const LoadingPage = () => {
  return (
    <Center h="100vh" bg="bg">
      <BarLoader color="#FFF" />
    </Center>
  );
};

export default LoadingPage;
