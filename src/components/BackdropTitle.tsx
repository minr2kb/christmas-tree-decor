import { treeStateAtom, treeAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { Backdrop } from './ui/backdrop';
import { Text } from '@chakra-ui/react';
import { memo } from 'react';

const BackdropTitle = memo(() => {
  const treeState = useAtomValue(treeStateAtom);
  const tree = useAtomValue(treeAtom);
  if (!tree) return null;
  return (
    <Backdrop show={treeState?.showTitle ?? false} transitionDuration="1s">
      <Text
        fontSize="9xl"
        fontWeight="bold"
        fontFamily={'Paperlogy'}
        textAlign={'center'}
        css={{ filter: 'drop-shadow(0 0 3px #fff)' }}
      >
        {tree.name}
      </Text>
      <Text
        fontSize="5xl"
        fontWeight="medium"
        fontFamily={'Paperlogy'}
        textAlign={'center'}
        css={{ filter: 'drop-shadow(0 0 3px #fff)' }}
      >
        {tree.description}
      </Text>
    </Backdrop>
  );
});

export default BackdropTitle;
