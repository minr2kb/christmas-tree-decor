import { authStatusAtom, sessionAtom, userAtom } from '@/store/auth';
import { AuthStatus } from '@/types/auth';
import { useAtomValue } from 'jotai';

const useSession = () => {
  const session = useAtomValue(sessionAtom);
  const authStatus = useAtomValue(authStatusAtom);
  const user = useAtomValue(userAtom);

  return {
    session,
    isAuthenticated: authStatus === AuthStatus.AUTHENTICATED,
    isUnauthenticated: authStatus === AuthStatus.UNAUTHENTICATED,
    isLoading: authStatus === AuthStatus.LOADING,
    user,
  };
};

export default useSession;
