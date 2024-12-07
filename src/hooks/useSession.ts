import { isAuthenticatedAtom, sessionAtom, userAtom } from '@/store/auth';
import { useAtomValue } from 'jotai';

const useSession = () => {
  const session = useAtomValue(sessionAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const user = useAtomValue(userAtom);

  return { session, isAuthenticated, user };
};

export default useSession;
