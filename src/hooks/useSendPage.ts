import { useCallback, useMemo, useReducer } from 'react';
import { ORNAMENT_TYPE_COUNT, SEND_ANIMATION_DURATION } from '@/constants/consts';
import useCheckTreeId from './useCheckTreeId';
import { addOrnamentToTree } from '@/api/ornaments';
import { toaster } from '@/components/ui/toaster';
import { filterBadWords } from '@/utils/badwords';
import useKeyPress from './useKeyPress';

type State = {
  selectedType: number;
  name: string;
  isSending: boolean;
  isSent: boolean;
  isOpen: boolean;
};

type Action =
  | { type: 'SET_TYPE'; payload: number }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'START_SEND' }
  | { type: 'COMPLETE_SEND' }
  | { type: 'SET_MODAL'; payload: boolean }
  | { type: 'RESET' };

const initialState: State = {
  selectedType: 1,
  name: '',
  isSending: false,
  isSent: false,
  isOpen: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TYPE':
      return { ...state, selectedType: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'START_SEND':
      return { ...state, isSending: true, isOpen: false };
    case 'COMPLETE_SEND':
      return { ...state, isSending: false, isSent: true };
    case 'SET_MODAL':
      return { ...state, isOpen: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const useSendPage = () => {
  const { treeId, isValidTreeId, isLoading } = useCheckTreeId();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedType, name, isSending, isSent, isOpen } = state;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    afterChange: (current: number) => {
      dispatch({ type: 'SET_TYPE', payload: current + 1 });
    },
  };

  const handleOpen = useCallback(() => {
    if (!name.trim()) return;
    dispatch({ type: 'SET_MODAL', payload: true });
  }, [name]);

  const handleSend = useCallback(() => {
    if (!treeId) return;
    dispatch({ type: 'START_SEND' });
    setTimeout(async () => {
      try {
        const sanitizedName = filterBadWords(name);
        await addOrnamentToTree(sanitizedName, selectedType, treeId);
        dispatch({ type: 'COMPLETE_SEND' });
      } catch (error) {
        toaster.error({
          title: '장식을 추가하는 중에 문제가 발생했어요',
          description: error instanceof Error ? error.message : '알 수 없는 오류',
        });
      }
    }, SEND_ANIMATION_DURATION * 1000);
  }, [name, selectedType, treeId]);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const devSendHandler = useCallback(async () => {
    if (!treeId) return;
    try {
      const randomType = Math.floor(Math.random() * ORNAMENT_TYPE_COUNT) + 1;
      await addOrnamentToTree('테스트_db', randomType, treeId);
    } catch (error) {
      toaster.error({
        title: '장식을 추가하는 중에 문제가 발생했어요',
        description: error instanceof Error ? error.message : '알 수 없는 오류',
      });
    }
  }, [treeId]);

  useKeyPress({ a: devSendHandler }, import.meta.env.DEV);

  const statusText = useMemo(() => {
    if (isSending) return '장식을 보내는 중이에요';
    if (isSent) return '앞의 스크린을 확인해주세요!';
    return '트리에 달고 싶은 장식을 선택해주세요';
  }, [isSending, isSent]);

  return {
    settings,
    handleOpen,
    handleSend,
    handleReset,
    statusText,
    isOpen,
    isSending,
    isSent,
    name,
    selectedType,
    dispatch,
    isValidTreeId,
    isLoading,
  };
};

export default useSendPage;
