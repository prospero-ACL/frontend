import { LoadingOverlay, Stack, Text } from '@mantine/core';
import { useAppSelector } from '@/config/store';

export default function Profile() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <Stack pos="relative">
      <LoadingOverlay visible={isLoading} />
      <Text>Welcome to profile</Text>
    </Stack>
  );
}
