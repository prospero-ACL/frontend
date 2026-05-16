import { Button, Modal, Stack } from '@mantine/core';

export type ModalProps = {
  opened: boolean;
  close: () => void;
  open: () => void;
};

export default function (props: ModalProps) {
  const { opened } = props;

  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:8000/oauth2/authorization/github';
  };
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/oauth2/authorization/google';
  };

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
