import { useCallback, useMemo, useState } from 'react';
import { SEND_ANIMATION_DURATION } from '@/constants/ui';
import useCheckTreeId from '@/hooks/useCheckTreeId';
import OrnamentAPI from '@/api/ornaments';
import { toaster } from '@/components/ui/toaster';
import { filterBadWords } from '@/utils/badwords';
import useDevTools from '../util/useDevTools';
import useConfirmDialog from '../useConfirmDialog';
import { SubmitStatus } from '@/types/form';
import { logger } from '@/utils/logger';

const useSendPage = () => {
  const { treeId, isValidTreeId, isLoading } = useCheckTreeId();
  const [status, setStatus] = useState<SubmitStatus>(SubmitStatus.IDLE);
  const [selectedType, setSelectedType] = useState(1);
  const [name, setName] = useState('');

  const { confirm } = useConfirmDialog();

  useDevTools({ treeId });

  const sliderSettings = useMemo(() => {
    return {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '0px',
      afterChange: (current: number) => {
        setSelectedType(current + 1);
      },
    };
  }, []);

  const handleOpen = useCallback(() => {
    if (!name.trim()) return;
    confirm({
      title: '트리에 장식을 달까요?',
      body: '스크린에 선택한 장식과 이름이 표시됩니다',
      onConfirm: handleSend,
    });
  }, [name]);

  const handleSend = useCallback(() => {
    if (!treeId) return;
    setStatus(SubmitStatus.SUBMITTING);
    setTimeout(async () => {
      try {
        const sanitizedName = filterBadWords(name);
        await OrnamentAPI.addOrnamentToTree(sanitizedName, selectedType, treeId);
        setStatus(SubmitStatus.SUBMITTED);
        logger.info('Ornament sent to tree', {
          treeId,
          name: sanitizedName,
          type: selectedType,
        });
      } catch (error) {
        setStatus(SubmitStatus.IDLE);
        toaster.error({
          title: '장식을 추가하는 중에 문제가 발생했어요',
          description: error instanceof Error ? error.message : '알 수 없는 오류',
        });
      }
    }, SEND_ANIMATION_DURATION * 1000);
  }, [name, selectedType, treeId]);

  const handleReset = useCallback(() => {
    setSelectedType(1);
    setName('');
    setStatus(SubmitStatus.IDLE);
  }, []);

  const statusText = useMemo(() => {
    switch (status) {
      case SubmitStatus.SUBMITTING:
        return '장식을 보내는 중이에요';
      case SubmitStatus.SUBMITTED:
        return '앞의 스크린을 확인해주세요!';
      default:
        return '트리에 달고 싶은 장식을 선택해주세요';
    }
  }, [status]);

  return {
    sliderSettings,
    handleSend: handleOpen,
    handleReset,
    statusText,
    isSubmitting: status === SubmitStatus.SUBMITTING,
    isSubmitted: status === SubmitStatus.SUBMITTED,
    name,
    selectedType,
    setName,
    isValidTreeId,
    isLoading,
  };
};

export default useSendPage;
