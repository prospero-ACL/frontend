import { Button, Modal, Stack } from '@mantine/core';
import { useLoginModal } from '@/homepage/hooks/use-login-modal';

export default function LoginModal() {
  const { opened, close, handleGithubLogin, handleGoogleLogin } = useLoginModal();

  return (
    <Modal opened={opened} onClose={close} title="Authentication" centered>
      <Stack>
        <Button variant="default" onClick={handleGoogleLogin}>
          Login with Google
        </Button>
        <Button variant="default" onClick={handleGithubLogin}>
          Login with Github
        </Button>
      </Stack>
    </Modal>
  );
}
