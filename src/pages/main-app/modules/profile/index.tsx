import { LoadingOverlay, Stack, Text } from '@mantine/core';
import { useAppSelector } from '@/config/store';
import { useProfile } from './hooks/use-profile';

export default function Profile() {
  const { securityLevel } = useProfile();
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <Stack pos="relative">
      <LoadingOverlay visible={isLoading} />
      <Text>Welcome to profile</Text>
      <Text>Security level: {securityLevel ?? '—'}</Text>
      <Text size="sm" c="dimmed">
        Your clearance decides which books are used to answer you. It is assigned by an
        administrator and cannot be changed here.
      </Text>
    </Stack>
  );
}
