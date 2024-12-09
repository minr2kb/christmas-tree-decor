import { Fieldset, Input, Stack } from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import useCreatePage from '@/hooks/logic/useCreatePage';
import { Field } from '@/components/ui/field';
import PageLayout from '@/components/PageLayout';

const CreatePage = () => {
  const { onSubmit, isSubmitting } = useCreatePage();
  return (
    <PageLayout headerProps={{ title: '트리 만들기' }} center>
      <form
        onSubmit={onSubmit}
        onChange={(e) => {
          e.currentTarget
            .querySelector('button[type="submit"]')
            ?.toggleAttribute('disabled', !e.currentTarget?.checkValidity?.());
        }}
        style={{ width: '100%' }}
      >
        <Stack gap={4} w="full">
          <Fieldset.Root size="lg">
            <Fieldset.Content>
              <Field label="트리 이름" required>
                <Input size="lg" name="treeName" placeholder="트리 이름" required />
              </Field>
              <Field label="트리 설명 (선택사항)">
                <Input size="lg" name="description" placeholder="트리 설명 (선택사항)" />
              </Field>
            </Fieldset.Content>

            <Button size="lg" colorScheme="green" loading={isSubmitting} width="full" type="submit" disabled>
              트리 만들기 <LuArrowRight />
            </Button>
          </Fieldset.Root>
        </Stack>
      </form>
    </PageLayout>
  );
};

export default CreatePage;
