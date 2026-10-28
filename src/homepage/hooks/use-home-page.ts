import { useModal } from '@/shared/hooks/use-modal';

export function useHomePage() {
  const { open: openLoginModal } = useModal('login');

  return { openLoginModal };
}
