import { Button, Modal, Stack, Text, Space } from '@mantine/core';
import { useLoginModal } from '@/homepage/hooks/use-login-modal';

export default function LoginModal() {
  const { opened, close, handleGithubLogin, handleGoogleLogin } = useLoginModal();

  return (
    <Modal opened={opened} onClose={close} title="Authentication" centered>
      <Stack p="md" gap="md">
        <Text>
          You need to be logged in to access this feature. Please log in using one of the following
          methods:
        </Text>
        <Space h="sm" />
        <Button onClick={handleGoogleLogin}>Login with Google</Button>
        <Button onClick={handleGithubLogin}>Login with Github</Button>
      </Stack>
    </Modal>
  );
}
