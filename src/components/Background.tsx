import { ornamentsCountAtom } from '@/store/atoms';
import { Image, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { memo } from 'react';

type BackgroundProps = {
  showCount?: boolean;
  showStars?: boolean;
};

const starsAnimation = keyframes`
  from {
    filter: brightness(50%);
  }
  to {
    filter: brightness(100%);
  }
`;

const Background = memo(({ showCount = false, showStars = true }: BackgroundProps) => {
  const ornamentsCount = useAtomValue(ornamentsCountAtom);

  return (
    <>
      {showStars && (
        <Image
          id="stars"
          src="/assets/images/stars.png"
          alt="stars"
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            objectFit: 'cover',
            animation: `${starsAnimation} 1.5s infinite alternate`,
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
          lineHeight={1}
        >
          {ornamentsCount}
        </Text>
      )}

      <Image
        id="snow-bottom"
        src="/assets/images/snow.png"
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
});

export default Background;
