import { Center, Heading, Text } from '@chakra-ui/react';

type ErrorPageProps = {
  error: Error;
};

const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <Center h="100dvh" bg="bg" color="text" p={4} textAlign="center" gap={4} flexDirection="column">
      <Heading fontSize="2xl">⚠️ Error</Heading>
      <Text fontSize="lg">{error.message}</Text>
    </Center>
  );
};

export default ErrorPage;
