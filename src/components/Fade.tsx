import { Box, BoxProps } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

type Props = {
  in: boolean;
  children: React.ReactNode;
  duration?: number;
  unmountOnExit?: boolean;
} & BoxProps;

const Fade = ({ in: inProp, children, duration = 300, unmountOnExit = true, ...props }: Props) => {
  const [isMounted, setIsMounted] = useState(inProp);

  useEffect(() => {
    if (inProp) {
      setIsMounted(true);
    } else if (unmountOnExit) {
      const timeout = setTimeout(() => setIsMounted(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [inProp, unmountOnExit, duration]);

  if (!isMounted && unmountOnExit) {
    return null;
  }

  const styles = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: inProp ? 1 : 0,
    // visibility: inProp ? 'visible' : 'hidden',
  };

  return (
    <Box {...props} css={{ ...styles, ...props.style }}>
      {children}
    </Box>
  );
};

export default Fade;
