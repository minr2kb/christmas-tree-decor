import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as="footer" w="full" h={10} justify="center" align="center">
      <Text fontSize="xs" color="gray.500">
        Created by{' '}
        <Link
          href="https://github.com/minr2kb"
          target="_blank"
          variant="underline"
          color="gray.400"
          rel="noopener noreferrer"
        >
          Kyungbae Min
        </Link>{' '}
        © 2024
      </Text>
    </Flex>
  );
};

export default Footer;
