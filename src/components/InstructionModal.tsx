import { DialogRoot } from './ui/dialog';

import { DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Link, Text, Stack, Separator, List, Kbd } from '@chakra-ui/react';
import { openInstuctionModal } from '@/store/atoms';
import { useAtom } from 'jotai';
import { memo, useCallback } from 'react';
import { BiInfoCircle } from 'react-icons/bi';

const InstructionModal = memo(() => {
  const [openInstructionModal, setOpenInstructionModal] = useAtom(openInstuctionModal);

  const handleClose = useCallback(() => {
    setOpenInstructionModal(false);
  }, [setOpenInstructionModal]);

  return (
    <DialogRoot
      key={'confirm-modal'}
      placement={'center'}
      motionPreset="slide-in-bottom"
      size={'xs'}
      lazyMount
      open={!!openInstructionModal}
      onOpenChange={(e) => !e.open && handleClose()}
      closeOnInteractOutside={false}
      scrollBehavior={'inside'}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>트리만들기 사용법</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={4}>
            <Stack>
              <Text fontSize="md" fontWeight="bold">
                🎄 트리 만들기
              </Text>

              <List.Root gap={2} as="ol" listStyle="decimal" ml={4}>
                <List.Item>로그인 후 [새로운 트리 만들기]를 선택해주세요</List.Item>
                <List.Item>트리 이름과 설명을 입력하고 생성해주세요</List.Item>
                <List.Item>
                  생성된 트리 화면을 대형 스크린이나 모니터에 띄워주세요 (전체화면 단축키: <Kbd>F</Kbd>)
                </List.Item>
                <List.Item>
                  우측 상단 메뉴에서 QR코드나 링크를 공유해주세요 (단축키: <Kbd>Q</Kbd>, <Kbd>L</Kbd>)
                </List.Item>
                <List.Item>우측 상단 메뉴에서 트리의 다양한 설정이 가능해요</List.Item>
              </List.Root>
            </Stack>
            <Separator />
            <Stack>
              <Text fontSize="md" fontWeight="bold">
                🎁 트리 꾸미기 참여
              </Text>
              <List.Root gap={2} as="ol" listStyle="decimal" ml={4}>
                <List.Item>[기존 트리 꾸미기]를 선택하거나 공유받은 QR/링크로 접속해주세요</List.Item>
                <List.Item>원하는 장식을 선택하고 이름을 입력해주세요</List.Item>
                <List.Item>전송이 완료되면 화면에 실시간으로 장식이 나타날거에요</List.Item>
              </List.Root>
            </Stack>
            <Separator />
            <Stack>
              <Text fontSize="md" fontWeight="bold">
                ⚙️ 트리 관리하기
              </Text>
              <List.Root gap={2} as="ol" listStyle="decimal" ml={4}>
                <List.Item>로그인 후 [내 트리 관리]를 선택해주세요</List.Item>
                <List.Item>트리 이름과 설명 변경 및 삭제도 할 수 있어요</List.Item>
                <List.Item>트리 링크 및 QR코드 공유도 가능해요</List.Item>
                <List.Item>[원격 트리 조작]에서 정보 확인 및 조작이 가능해요</List.Item>
              </List.Root>
            </Stack>
          </Stack>
        </DialogBody>
        <DialogFooter justifyContent="space-between">
          <Link variant={'underline'} fontSize="xs" href="mailto:kbmin1129@gmail.com">
            <BiInfoCircle />
            피드백 보내기
          </Link>
          <DialogActionTrigger asChild>
            <Button colorPalette={'fg'}>확인</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
});

export default InstructionModal;
