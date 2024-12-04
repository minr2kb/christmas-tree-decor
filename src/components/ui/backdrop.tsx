import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * 배경 클릭시 닫기 이벤트
   */
  onClose?: () => void;
  /**
   * 배경색
   * @default 'blackAlpha.600'
   */
  bgColor?: string;
  /**
   * z-index
   * @default 'modal'
   */
  zIndex?: string | number;
  /**
   * 표시 여부
   */
  show?: boolean;
  /**
   * 트랜지션 지속 시간
   * @default '0.2s'
   */
  transitionDuration?: string;
}

export const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(function Backdrop(
  {
    children,
    onClose,
    bgColor = 'blackAlpha.500',
    zIndex = 'modal',
    show = true,
    transitionDuration = '0.2s',
    ...props
  },
  ref,
) {
  return (
    <Box
      ref={ref}
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgColor={bgColor}
      zIndex={zIndex}
      onClick={onClose}
      opacity={show ? 1 : 0}
      visibility={show ? 'visible' : 'hidden'}
      transition={`opacity ${transitionDuration}, visibility ${transitionDuration}`}
      {...props}
    >
      {children && (
        <Box
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
});
