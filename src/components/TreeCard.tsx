import {
  CardBody,
  CardFooter,
  Text,
  IconButton,
  HStack,
  Box,
  CardRoot,
  MenuTrigger,
  Input,
  Flex,
  VStack,
} from '@chakra-ui/react';
import { TreeType } from '@/types/tree';
import { Tooltip } from './ui/tooltip';
import { LuSettings } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/date';
import { ROUTES } from '@/constants/routes';
import { RiExternalLinkLine, RiRemoteControlLine } from 'react-icons/ri';
import { MenuContent, MenuItem, MenuRoot } from './ui/menu';
import { useCallback, useState } from 'react';
import { Button } from './ui/button';
import useShareOptions from '@/hooks/util/useShareOptions';
import { memo } from 'react';
interface TreeCardProps {
  tree: TreeType;
  onDelete: (id: string) => void;
  onEdit: (treeId: string, name: string, description: string | null) => void;
}

const TreeCard = memo(({ tree, onDelete, onEdit }: TreeCardProps) => {
  const { generateQR, copySendLink } = useShareOptions(tree.id);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Pick<TreeType, 'name' | 'description'>>({
    name: tree.name,
    description: tree.description || '',
  });

  const handleCancel = useCallback(() => {
    setForm({
      name: tree.name,
      description: tree.description || '',
    });
    setIsEditing(false);
  }, [tree.name, tree.description]);

  const handleSubmit = useCallback(() => {
    if (!form.name.trim()) return;
    onEdit(tree.id, form.name.trim(), form.description?.trim() || null);
    setIsEditing(false);
  }, [tree.id, form.name, form.description, onEdit]);

  return (
    <CardRoot variant="subtle" transition="all 0.2s" w="full">
      <CardBody>
        {!isEditing && (
          <VStack gap={2} align="flex-start" w="full">
            <HStack justify="space-between" w="full">
              <Text fontWeight="bold">{tree.name}</Text>
              <TreeActions
                treeId={tree.id}
                onEdit={() => setIsEditing(true)}
                onDelete={onDelete}
                generateQR={generateQR}
                copySendLink={copySendLink}
              />
            </HStack>
            <Text fontSize="sm" color="gray.300">
              {tree.description}
            </Text>
          </VStack>
        )}
        {isEditing && (
          <TreeEditForm
            initialData={{ name: tree.name, description: tree.description || '' }}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </CardBody>
      {!isEditing && (
        <CardFooter pt={0}>
          <Box flex={1}>
            <Text fontSize="xs" color="gray.500">
              생성일: {formatDate(tree.createdAt)}
            </Text>
          </Box>
        </CardFooter>
      )}
    </CardRoot>
  );
});

const TreeMenu = memo(
  ({
    treeId,
    onEdit,
    onDelete,
    generateQR,
    copySendLink,
  }: {
    treeId: string;
    onEdit: () => void;
    onDelete: (id: string) => void;
    generateQR: () => void;
    copySendLink: () => void;
  }) => {
    return (
      <MenuRoot>
        <MenuTrigger asChild>
          <IconButton aria-label="트리 관리" size="sm" variant="ghost">
            <LuSettings />
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <MenuItem value="qr" onClick={generateQR}>
            QR 다운로드
          </MenuItem>
          <MenuItem value="link" onClick={copySendLink}>
            공유 링크 복사
          </MenuItem>
          <MenuItem value="edit" onClick={onEdit}>
            수정
          </MenuItem>
          <MenuItem value="delete" color="red.500" onClick={() => onDelete(treeId)}>
            삭제
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    );
  },
);

const TreeActions = memo(
  (props: {
    treeId: string;
    onEdit: () => void;
    onDelete: (id: string) => void;
    generateQR: () => void;
    copySendLink: () => void;
  }) => {
    return (
      <HStack gap={0}>
        <Tooltip content="트리 원격 조작">
          <Link to={ROUTES.remote(props.treeId)}>
            <IconButton aria-label="트리 원격 조작" size="sm" variant="ghost">
              <RiRemoteControlLine />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip content="트리로 이동">
          <Link to={ROUTES.tree(props.treeId)}>
            <IconButton aria-label="트리로 이동" size="sm" variant="ghost">
              <RiExternalLinkLine />
            </IconButton>
          </Link>
        </Tooltip>
        <TreeMenu {...props} />
      </HStack>
    );
  },
);

const TreeEditForm = memo(
  ({
    initialData,
    onCancel,
    onSubmit,
  }: {
    initialData: Pick<TreeType, 'name' | 'description'>;
    onCancel: () => void;
    onSubmit: (name: string, description: string | null) => void;
  }) => {
    const [form, setForm] = useState<Pick<TreeType, 'name' | 'description'>>(initialData);

    const handleSubmit = useCallback(() => {
      if (!form.name.trim()) return;
      onSubmit(form.name.trim(), form.description?.trim() || null);
    }, [form.name, form.description, onSubmit]);

    return (
      <>
        <VStack gap={2}>
          <Input
            autoFocus
            variant="flushed"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="트리 이름"
            w="full"
          />
          <Input
            variant="flushed"
            value={form.description || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="트리 설명(선택)"
            w="full"
          />

          <Flex gap={2} justify="flex-end" w="full">
            <Button aria-label="취소" size="sm" variant="subtle" onClick={onCancel}>
              취소
            </Button>
            <Button aria-label="저장" size="sm" onClick={handleSubmit}>
              저장
            </Button>
          </Flex>
        </VStack>
      </>
    );
  },
);

export default TreeCard;
