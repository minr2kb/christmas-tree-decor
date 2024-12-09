import { Flex, IconButton } from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { LuMenu } from 'react-icons/lu';
import { MenuContent, MenuRoot, MenuItem, MenuTrigger, MenuItemCommand, MenuSeparator } from './ui/menu';
import { toaster } from './ui/toaster';
import useKeyPress from '@/hooks/util/useKeyPress';
import QRCode from 'qrcode';
import useControls from '@/hooks/logic/useControls';

interface ControlsProps {
  toggleFullScreen: () => void;
  treeId?: string;
}

const Controls = memo(({ toggleFullScreen, treeId }: ControlsProps) => {
  const { menuHandlers, addTestOrnament, addTest50, onClickRemoveTree, isOwner, openLoginModal } = useControls(treeId);

  const { generateQR, copySendLink } = useQRActions(treeId);

  const keyHandlers = useMemo(
    () => ({
      t: menuHandlers.toggleTriangle,
      c: menuHandlers.toggleCount,
      s: menuHandlers.toggleSnow,
      x: menuHandlers.toggleStar,
      z: menuHandlers.toggleTitle,
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
          삼각형 토글
          <MenuItemCommand>T</MenuItemCommand>
        </MenuItem>
        <MenuItem value="toggle-count" onClick={menuHandlers.toggleCount}>
          카운트 토글
          <MenuItemCommand>C</MenuItemCommand>
        </MenuItem>
        <MenuItem value="toggle-snow" onClick={menuHandlers.toggleSnow}>
          눈 토글
          <MenuItemCommand>S</MenuItemCommand>
        </MenuItem>
        <MenuItem value="toggle-star" onClick={menuHandlers.toggleStar}>
          별 토글
          <MenuItemCommand>X</MenuItemCommand>
        </MenuItem>
        <MenuItem value="toggle-title" onClick={menuHandlers.toggleTitle}>
          중앙 타이틀 토글
          <MenuItemCommand>T</MenuItemCommand>
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

        {isOwner ? (
          <MenuItem value="delete-tree" onClick={onClickRemoveTree} color="fg.error">
            트리 삭제
          </MenuItem>
        ) : (
          <MenuItem value="login" onClick={() => openLoginModal()}>
            로그인
          </MenuItem>
        )}
      </MenuContent>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [menuHandlers, isOwner, openLoginModal],
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
        toaster.success({ title: '클립보드에 복사되었습니다' });
      },
    }),
    [treeId],
  );
}

export default Controls;
