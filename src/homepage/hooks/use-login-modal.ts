import { useModal } from '@/shared/hooks/use-modal';

export function useLoginModal() {
  const { opened, close } = useModal('login');

  function handleGithubLogin() {
    window.location.href = 'http://localhost:8000/oauth2/authorization/github';
  }

  function handleGoogleLogin() {
    window.location.href = 'http://localhost:8000/oauth2/authorization/google';
  }

  return { opened, close, handleGithubLogin, handleGoogleLogin };
}
