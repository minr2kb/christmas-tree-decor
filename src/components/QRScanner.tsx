import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Box, Text, Spinner } from '@chakra-ui/react';

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: Error) => void;
}

const QRScanner = ({ onScan, onError }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!QrScanner.hasCamera()) {
      setError('카메라를 찾을 수 없습니다.');
      setIsLoading(false);
      return;
    }

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        onScan(result.data);
      },
      {
        preferredCamera: 'environment', // 후면 카메라 우선 사용
        highlightScanRegion: false, // 스캔 영역 하이라이트
        highlightCodeOutline: true, // QR코드 인식 시 외곽선 표시
        maxScansPerSecond: 5, // 배터리 소모 줄이기 위해 스캔 속도 제한
        returnDetailedScanResult: true,
      },
    );

    scanner
      .start()
      .then(() => {
        console.log('카메라 초기화 완료');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('카메라 초기화 실패', err);
        if (onError) onError(err);
        setError(err.message);
        setIsLoading(false);
      });

    return () => {
      scanner.destroy();
    };
  }, [onScan, onError]);

  return (
    <Box css={{ position: 'relative', w: 'full', h: 'full' }}>
      {isLoading ? (
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex={1} textAlign="center">
          <Spinner size="xl" color="blue.500" mb={4} />
          <Text>카메라 초기화 중...</Text>
        </Box>
      ) : (
        <>
          <video
            ref={videoRef}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s',
            }}
          />
          <Box
            position="absolute"
            top={'50%'}
            left={'50%'}
            transform="translate(-50%, -50%)"
            w={'80%'}
            maxW={200}
            aspectRatio={1}
            border="1px solid yellow"
          />
        </>
      )}
      {error && (
        <Text
          position="absolute"
          top={'50%'}
          left={'50%'}
          transform="translate(-50%, -50%)"
          w="full"
          color="red"
          textAlign="center"
          fontSize="sm"
          fontWeight="bold"
        >
          {error}
        </Text>
      )}
    </Box>
  );
};

export default QRScanner;
