import { useModal } from '@/shared/hooks/use-modal';

// dev talks to the backend on its own port; prod serves both behind one origin
const OAUTH_BASE_URL = import.meta.env.DEV ? 'http://localhost:8000' : '';

export function useLoginModal() {
  const { opened, close } = useModal('login');

  function handleGithubLogin() {
    window.location.href = `${OAUTH_BASE_URL}/oauth2/authorization/github`;
  }

  function handleGoogleLogin() {
    window.location.href = `${OAUTH_BASE_URL}/oauth2/authorization/google`;
  }

  return { opened, close, handleGithubLogin, handleGoogleLogin };
}
