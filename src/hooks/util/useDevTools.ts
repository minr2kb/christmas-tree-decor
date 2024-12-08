import OrnamentAPI from '@/api/ornaments';
import useKeyPress from '@/hooks/util/useKeyPress';
import { toaster } from '@/components/ui/toaster';
import { ORNAMENT_TYPE_COUNT } from '@/constants/ui';
import { useCallback } from 'react';

const useDevTools = ({ treeId }: { treeId?: string }) => {
  const devSendHandler = useCallback(async () => {
    if (!treeId) return;
    try {
      const randomType = Math.floor(Math.random() * ORNAMENT_TYPE_COUNT) + 1;
      await OrnamentAPI.addOrnamentToTree('테스트_db', randomType, treeId);
      toaster.success({ title: '테스트 장식을 추가했습니다' });
    } catch (error) {
      toaster.error({
        title: '테스트 장식을 추가하는 중에 문제가 발생했어요',
        description: error instanceof Error ? error.message : '알 수 없는 오류',
      });
    }
  }, [treeId]);

  useKeyPress(
    { a: devSendHandler },
    {
      enable: import.meta.env.DEV && Boolean(treeId),
      metaKey: true,
    },
  );
};

export default useDevTools;
