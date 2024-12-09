import { HStack, Separator, Stack, Text } from '@chakra-ui/react';
import PageLayout from '@/components/PageLayout';
import useRemotePage from '@/hooks/logic/useRemotePage';
import { Switch } from '@/components/ui/switch';
import { DataListItem, DataListRoot } from '@/components/ui/data-list';

const RemotePage = () => {
  const {
    isValidTreeId,
    isLoading,
    isOwner,
    tree,
    treeState,
    handleToggleCount,
    handleToggleSnow,
    handleToggleStar,
    handleToggleTitle,
    getErrorMessage,
  } = useRemotePage();

  return (
    <PageLayout
      center
      headerProps={{ title: '원격 트리 조작' }}
      isLoading={isLoading}
      isError={!isValidTreeId || !isOwner}
      error={new Error(getErrorMessage())}
    >
      <DataListRoot orientation="horizontal">
        <DataListItem label="트리 이름" value={tree?.name} />
        <DataListItem label="트리 설명" value={tree?.description} />
        <DataListItem label="트리 ID" value={tree?.id} />
        <DataListItem label="트리 생성일" value={tree?.createdAt?.toLocaleDateString()} />
      </DataListRoot>

      <Separator my={8} />

      {/* 트리 조작 */}
      <Stack w="full" gap={8}>
        <HStack justify="space-between">
          <Text>카운트</Text>
          <Switch checked={treeState?.showCount} onChange={handleToggleCount} />
        </HStack>
        <HStack justify="space-between">
          <Text>눈</Text>
          <Switch checked={treeState?.showSnow} onChange={handleToggleSnow} />
        </HStack>
        <HStack justify="space-between">
          <Text>별</Text>
          <Switch checked={treeState?.showStar} onChange={handleToggleStar} />
        </HStack>
        <HStack justify="space-between">
          <Text>타이틀</Text>
          <Switch checked={treeState?.showTitle} onChange={handleToggleTitle} />
        </HStack>
      </Stack>
    </PageLayout>
  );
};

export default RemotePage;
