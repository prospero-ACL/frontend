import { Button, Modal } from '@mantine/core';

export type ModalProps = {
  opened: boolean;
  close: () => void;
  open: () => void;
};

export default function (props: ModalProps) {
  const { opened } = props;

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/oauth2/authorization/google';
  };
  return (
    <Modal opened={opened} onClose={close} title="Authentication" centered>
      <Button variant="default" onClick={handleGoogleLogin}>
        Open centered Modal
      </Button>
    </Modal>
  );
}
