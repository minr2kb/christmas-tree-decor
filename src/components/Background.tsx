import { ornamentsAtom, treeAtom } from '@/store/atoms';
import { Image, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

type BackgroundProps = {
  showCount?: boolean;
  showStars?: boolean;
};

export const Background = ({ showCount = false, showStars = true }: BackgroundProps) => {
  const ornaments = useAtomValue(ornamentsAtom);
  const tree = useAtomValue(treeAtom);

  return (
    <>
      {showStars && (
        <Image
          id="stars"
          src="/assets/stars.png"
          alt="stars"
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}
        />
      )}
      {showCount && (
        <Text
          fontSize={'80vh'}
          color={'rgba(255, 255, 255, 0.1)'}
          position={'absolute'}
          top={'50%'}
          left={'50%'}
          transform={'translate(-50%, -50%)'}
          pointerEvents={'none'}
          fontWeight={'black'}
        >
          {ornaments.length}
        </Text>
      )}
      <Text
        fontSize={'2rem'}
        color={'rgba(255, 255, 255, 0.1)'}
        position={'absolute'}
        top={'1rem'}
        left={'1rem'}
        pointerEvents={'none'}
        fontWeight={'black'}
        fontFamily={'HSSanTokki20'}
      >
        {tree?.name}
      </Text>
      <Image
        id="snow-bottom"
        src="/assets/snow.png"
        alt="snow-bottom"
        css={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        }}
      />
    </>
  );
};
