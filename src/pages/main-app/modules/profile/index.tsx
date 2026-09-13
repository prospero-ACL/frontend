import { Button, LoadingOverlay, Stack, Text } from '@mantine/core';
import { useAppSelector } from '@/config/store';
import SecurityLevelModal from './components/security-level-modal';
import { useProfile } from './hooks/use-profile';

export default function Profile() {
  const { securityLevel, handleUpdate, isModalOpened, openModal, closeModal } = useProfile();
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <Stack pos="relative">
      <LoadingOverlay visible={isLoading} />
      <Text>Welcome to profile</Text>
      <Text>Security level: {securityLevel ?? '—'}</Text>
      <Button onClick={openModal} disabled={!securityLevel}>
        Change security level
      </Button>
      {securityLevel && (
        <SecurityLevelModal
          isLoading={isLoading}
          opened={isModalOpened}
          currentLevel={securityLevel}
          onClose={closeModal}
          onSubmit={handleUpdate}
        />
      )}
    </Stack>
  );
}
