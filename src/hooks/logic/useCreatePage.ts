import TreeAPI from '@/api/tree';
import { toaster } from '@/components/ui/toaster';
import { useState } from 'react';
import { FormEventHandler } from 'react';
import useSession from '../useSession';
import { useNavigate } from 'react-router-dom';

const useCreatePage = () => {
  const navigate = useNavigate();
  const { user } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!user) {
      return toaster.error({
        title: '로그인 후 이용 가능해요!',
      });
    }
    const formData = new FormData(e.currentTarget);
    const treeName = formData.get('treeName') as string;
    const description = formData.get('description') as string;

    if (!treeName.trim()) {
      return toaster.error({
        title: '트리 이름을 입력해주세요',
      });
    }

    try {
      setIsSubmitting(true);
      const data = await TreeAPI.createTree(treeName, description, user.id);
      if (data) {
        navigate(`/tree/${data.id}`);
      }
    } catch (error) {
      console.error(error);
      toaster.error({
        title: '트리 생성 실패',
        description: '잠시 후 다시 시도해주세요',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
};

export default useCreatePage;
