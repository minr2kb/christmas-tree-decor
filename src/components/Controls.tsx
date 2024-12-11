import { Flex, IconButton } from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { LuMenu } from 'react-icons/lu';
import { MenuContent, MenuRoot, MenuItem, MenuTrigger, MenuItemCommand, MenuSeparator } from './ui/menu';
import useKeyPress from '@/hooks/util/useKeyPress';

import useControls from '@/hooks/logic/useControls';
import useShareOptions from '@/hooks/util/useShareOptions';

interface ControlsProps {
  toggleFullScreen: () => void;
  treeId?: string;
}

const Controls = memo(({ toggleFullScreen, treeId }: ControlsProps) => {
  const { menuHandlers, addTest1, addTest50, onClickRemoveTree, isOwner, openLoginModal, onClickHome } =
    useControls(treeId);

  const { generateQR, copySendLink } = useShareOptions(treeId);

  const keyHandlers = useMemo(
    () => ({
      t: menuHandlers.toggleTriangle,
      c: menuHandlers.toggleCount,
      s: menuHandlers.toggleSnow,
      x: menuHandlers.toggleStar,
      z: menuHandlers.toggleTitle,
      f: toggleFullScreen,
      a: addTest1,
      d: addTest50,
      q: generateQR,
      l: copySendLink,
    }),
    [menuHandlers, toggleFullScreen, addTest1, addTest50, generateQR, copySendLink],
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
        <MenuItem value="add-1" onClick={addTest1}>
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
        <MenuItem value="home" onClick={onClickHome}>
          홈으로
        </MenuItem>

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

export default Controls;
