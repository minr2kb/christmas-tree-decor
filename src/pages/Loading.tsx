import { Container } from '@chakra-ui/react';
import { BarLoader } from 'react-spinners';

const LoadingPage = () => {
  return (
    <Container display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" bg="bg">
      <BarLoader color="#FFF" />
    </Container>
  );
};

export default LoadingPage;
