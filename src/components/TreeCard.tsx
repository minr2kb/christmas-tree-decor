import { CardHeader, CardBody, CardFooter, Text, IconButton, HStack, Box, CardRoot } from '@chakra-ui/react';
import { TreeType } from '@/types/tree';
import { LuTrash2, LuSettings } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/utils/date';

interface TreeCardProps {
  tree: TreeType;
  onDelete: (id: string) => void;
}

const TreeCard = ({ tree, onDelete }: TreeCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tree/${tree.id}`);
  };

  return (
    <CardRoot variant="subtle" onClick={handleClick} transition="all 0.2s" w="100%">
      <CardHeader>
        <HStack justify="space-between">
          <Text fontWeight="bold">{tree.name}</Text>
          <HStack gap={2}>
            <IconButton
              aria-label="트리 삭제"
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(tree.id);
              }}
            >
              <LuTrash2 />
            </IconButton>
            <IconButton
              aria-label="트리 관리"
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/tree/${tree.id}`);
              }}
            >
              <LuSettings />
            </IconButton>
          </HStack>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <Text fontSize="sm" color="gray.300">
          {tree.description || '설명이 없습니다'}
        </Text>
      </CardBody>
      <CardFooter pt={0}>
        <Box flex={1}>
          <Text fontSize="xs" color="gray.500">
            생성일: {formatDate(tree.createdAt)}
          </Text>
        </Box>
      </CardFooter>
    </CardRoot>
  );
};

export default TreeCard;
