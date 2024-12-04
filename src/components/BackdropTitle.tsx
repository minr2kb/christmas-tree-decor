import { showTitleAtom, treeAtom } from '@/store/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { Backdrop } from './ui/backdrop';
import { Text } from '@chakra-ui/react';

const BackdropTitle = () => {
  const [showTitle, setShowTitle] = useAtom(showTitleAtom);
  const tree = useAtomValue(treeAtom);
  if (!tree) return null;
  return (
    <Backdrop show={showTitle} transitionDuration="1s" onClose={() => setShowTitle(false)}>
      <Text
        fontSize="9xl"
        fontWeight="bold"
        fontFamily={'SF_HambakSnow'}
        textAlign={'center'}
        css={{ filter: 'drop-shadow(0 0 3px #fff)' }}
      >
        {tree.name}
      </Text>
      <Text
        fontSize="5xl"
        fontWeight="medium"
        fontFamily={'SF_HambakSnow'}
        textAlign={'center'}
        css={{ filter: 'drop-shadow(0 0 3px #fff)' }}
      >
        {tree.description}
      </Text>
    </Backdrop>
  );
};

export default BackdropTitle;
