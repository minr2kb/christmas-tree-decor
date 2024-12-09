import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as="footer" w="full" h={10} justify="center" align="center" zIndex="sticky" mixBlendMode="difference">
      <Text fontSize="xs" color="gray.100">
        Created by{' '}
        <Link
          href="https://github.com/minr2kb"
          target="_blank"
          variant="underline"
          color="gray.200"
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
