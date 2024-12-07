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
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/utils/date';
import { ROUTES } from '@/constants/routes';
import { RiExternalLinkLine } from 'react-icons/ri';
import { MenuContent, MenuItem, MenuRoot } from './ui/menu';
import { useState } from 'react';
import { Button } from './ui/button';

interface TreeCardProps {
  tree: TreeType;
  onDelete: (id: string) => void;
  onEdit: (treeId: string, name: string, description: string | null) => void;
}

const TreeCard = ({ tree, onDelete, onEdit }: TreeCardProps) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Pick<TreeType, 'name' | 'description'>>({
    name: tree.name,
    description: tree.description || '',
  });

  const handleClick = () => {
    navigate(ROUTES.tree(tree.id));
  };

  const handleCancel = () => {
    setForm({
      name: tree.name,
      description: tree.description || '',
    });
    setIsEditing(false);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onEdit(tree.id, form.name.trim(), form.description?.trim() || null);
    setIsEditing(false);
  };

  return (
    <CardRoot variant="subtle" transition="all 0.2s" w="100%">
      <CardBody>
        {!isEditing && (
          <VStack gap={2} align="flex-start" w="full">
            <HStack justify="space-between" w="full">
              <Text fontWeight="bold">{tree.name}</Text>
              <HStack gap={0}>
                <Tooltip content="트리로 이동">
                  <IconButton aria-label="트리로 이동" size="sm" variant="ghost" onClick={handleClick}>
                    <RiExternalLinkLine />
                  </IconButton>
                </Tooltip>
                <MenuRoot>
                  <MenuTrigger asChild>
                    <IconButton aria-label="트리 관리" size="sm" variant="ghost">
                      <LuSettings />
                    </IconButton>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuItem value="edit" onClick={() => setIsEditing(true)}>
                      수정
                    </MenuItem>
                    <MenuItem value="delete" color="red.500" onClick={() => onDelete(tree.id)}>
                      삭제
                    </MenuItem>
                  </MenuContent>
                </MenuRoot>
              </HStack>
            </HStack>
            <Text fontSize="sm" color="gray.300">
              {tree.description}
            </Text>
          </VStack>
        )}
        {isEditing && (
          <VStack gap={2}>
            <Input
              autoFocus
              variant={'flushed'}
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="트리 이름"
              w="full"
            />
            <Input
              variant={'flushed'}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="트리 설명(선택)"
              w="full"
            />
          </VStack>
        )}
      </CardBody>
      <CardFooter pt={0}>
        {isEditing ? (
          <Flex gap={2} justify="flex-end" w="full">
            <Button aria-label="취소" size="sm" variant="subtle" onClick={handleCancel}>
              취소
            </Button>
            <Button aria-label="저장" size="sm" onClick={handleSubmit}>
              저장
            </Button>
          </Flex>
        ) : (
          <Box flex={1}>
            <Text fontSize="xs" color="gray.500">
              생성일: {formatDate(tree.createdAt)}
            </Text>
          </Box>
        )}
      </CardFooter>
    </CardRoot>
  );
};

export default TreeCard;
