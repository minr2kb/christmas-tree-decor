import { Box, Heading } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import BackButton from './BackButton';
import UserMenu from './UserMenu';

export type HeaderProps = {
  title?: string;
  onBack?: () => void;
  showUser?: boolean;
  showBackButton?: boolean;
};

const Header = ({ title, onBack, showUser = true, showBackButton = true }: HeaderProps) => {
  return (
    <Box
      position="sticky"
      top={0}
      left={0}
      right={0}
      bgColor="bg"
      zIndex={'sticky'}
      p={4}
      h="62px"
      borderBottom="1px solid"
      borderColor="border"
    >
      <Flex alignItems="center" position="relative" w="full" h="full">
        {showBackButton && <BackButton variant="ghost" onBack={onBack} position="absolute" left={0} />}

        <Heading textAlign="center" w="full" fontSize="lg">
          {title}
        </Heading>

        {showUser && <UserMenu containerProps={{ position: 'absolute', right: 0 }} />}
      </Flex>
    </Box>
  );
};

export default Header;
