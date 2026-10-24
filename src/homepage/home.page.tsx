import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LoginModal from '@/homepage/components/login-modal';
import Welcome from '@/homepage/components/welcome/welcome';

export default function HomePage() {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Welcome />
      <Button onClick={open}>Login</Button>
      <LoginModal opened={opened} close={close} open={open} />
    </>
  );
}
