import { Button } from '@mantine/core';
import LoginModal from '@/homepage/components/login-modal';
import Welcome from '@/homepage/components/welcome/welcome';
import { useModal } from '@/shared/hooks/use-modal';
// import { useHomePage } from '@/homepage/hooks/use-home-page';

export default function HomePage() {
  // const { openLoginModal } = useHomePage();
  const { open: openLoginModal } = useModal('login');

  return (
    <>
      <Welcome />
      <Button onClick={openLoginModal}>Login</Button>
      <LoginModal />
    </>
  );
}
