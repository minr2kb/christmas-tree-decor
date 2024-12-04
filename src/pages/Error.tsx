import { Container, Heading, Text } from '@chakra-ui/react';

type Props = {
  error: Error;
};

const ErrorPage = ({ error }: Props) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="bg"
      color="text"
      p={4}
      textAlign="center"
      gap={4}
    >
      <Heading fontSize="2xl">⚠️ Error</Heading>
      <Text fontSize="lg">{error.message}</Text>
    </Container>
  );
};

export default ErrorPage;
