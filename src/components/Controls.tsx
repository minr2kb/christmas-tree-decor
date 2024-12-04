import { Flex, IconButton, Text } from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { LuMenu } from 'react-icons/lu';
import { MenuContent, MenuRoot, MenuItem, MenuTrigger, MenuItemCommand, MenuSeparator } from './ui/menu';
import { toaster } from './ui/toaster';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import useKeyPress from '@/hooks/useKeyPress';
import QRCode from 'qrcode';
import { useControls } from '@/hooks/useControls';

interface ControlsProps {
  toggleFullScreen: () => void;
  treeId?: string;
}

const Controls = memo(({ toggleFullScreen, treeId }: ControlsProps) => {
  const {
    showTriangle,
    showCount,
    showSnow,
    showStar,
    isOpen,
    setIsOpen,
    menuHandlers,
    addTestOrnament,
    addTest50,
    removeTree,
  } = useControls(treeId);

  const { generateQR, copySendLink } = useQRActions(treeId);

  const keyHandlers = useMemo(
    () => ({
      t: menuHandlers.toggleTriangle,
      c: menuHandlers.toggleCount,
      s: menuHandlers.toggleSnow,
      x: menuHandlers.toggleStar,
      f: toggleFullScreen,
      a: addTestOrnament,
      d: addTest50,
      q: generateQR,
      l: copySendLink,
    }),
    [menuHandlers, toggleFullScreen, addTestOrnament, addTest50, generateQR, copySendLink],
  );

  useKeyPress(keyHandlers);

  const MenuItems = useMemo(
    () => (
      <MenuContent bgColor={'bg.emphasized'}>
        <MenuItem value="toggle-triangle" onClick={menuHandlers.toggleTriangle}>
          삼각형 {showTriangle ? '숨기기' : '보이기'}
          <MenuItemCommand>T</MenuItemCommand>
        </MenuItem>
        <MenuItem value="toggle-count" onClick={menuHandlers.toggleCount}>
          카운트 {showCount ? '숨기기' : '보이기'}
          <MenuItemCommand>C</MenuItemCommand>
        </MenuItem>
        <MenuItem value="toggle-snow" onClick={menuHandlers.toggleSnow}>
          눈 {showSnow ? '멈추기' : '보이기'}
          <MenuItemCommand>S</MenuItemCommand>
        </MenuItem>
        <MenuItem value="toggle-star" onClick={menuHandlers.toggleStar}>
          별 {showStar ? '숨기기' : '보이기'}
          <MenuItemCommand>X</MenuItemCommand>
        </MenuItem>
        <MenuItem value="add-1" onClick={addTestOrnament}>
          1개 추가 <MenuItemCommand>A</MenuItemCommand>
        </MenuItem>
        <MenuItem value="add-50" onClick={addTest50}>
          50개 추가 <MenuItemCommand>D</MenuItemCommand>
        </MenuItem>

        <MenuItem value="toggle-fullscreen" onClick={toggleFullScreen}>
          전체화면 토글 <MenuItemCommand>F</MenuItemCommand>
        </MenuItem>
        <MenuSeparator />
        <MenuItem value="generate-qr" onClick={generateQR}>
          꾸미기 QR코드 생성 <MenuItemCommand>Q</MenuItemCommand>
        </MenuItem>
        <MenuItem value="copy-send-link" onClick={copySendLink}>
          꾸미기 링크 복사 <MenuItemCommand>L</MenuItemCommand>
        </MenuItem>
        <MenuSeparator />
        <MenuItem value="delete-tree" onClick={() => setIsOpen(true)} color="fg.error">
          트리 삭제
        </MenuItem>
      </MenuContent>
    ),
    [showTriangle, showCount, showSnow, menuHandlers],
  );

  const DialogContents = useMemo(
    () => (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>트리를 삭제하시겠어요?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text fontSize="md">모든 장식도 함께 사라집니다</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">취소</Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button colorPalette="red" onClick={removeTree}>
              삭제
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    ),
    [removeTree],
  );

  return (
    <Flex
      justifyContent={'flex-end'}
      alignItems={'center'}
      p={4}
      w={'100%'}
      position={'absolute'}
      top={0}
      right={0}
      gap={2}
    >
      <MenuRoot>
        <MenuTrigger asChild>
          <IconButton variant="outline">
            <LuMenu />
          </IconButton>
        </MenuTrigger>
        {MenuItems}
      </MenuRoot>
      <DialogRoot
        key={'confirm-modal'}
        placement={'center'}
        motionPreset="slide-in-bottom"
        size={'xs'}
        lazyMount
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
      >
        {DialogContents}
      </DialogRoot>
    </Flex>
  );
});

function useQRActions(treeId?: string) {
  return useMemo(
    () => ({
      generateQR: () => {
        if (!treeId) return;
        QRCode.toDataURL(`${window.location.origin}/send/${treeId}`, {
          width: 256,
          margin: 1,
        }).then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `tree-${treeId}-qr.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toaster.success({ title: 'QR코드가 다운로드되었습니다' });
        });
      },
      copySendLink: () => {
        if (!treeId) return;
        navigator.clipboard.writeText(`${window.location.origin}/send/${treeId}`);
        toaster.success({ title: '복사되었습니다' });
      },
    }),
    [treeId],
  );
}

export default Controls;
