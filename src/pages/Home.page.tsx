import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LoginModal from '@/components/login-modal';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export function HomePage() {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <Button onClick={open}>Login</Button>
      <LoginModal opened={opened} close={close} open={open} />
    </>
  );
}
