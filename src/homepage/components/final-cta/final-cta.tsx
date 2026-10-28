import { Button, Container, Paper, Stack, Text, Title } from '@mantine/core';
import { useHomePage } from '@/homepage/hooks/use-home-page';

export default function FinalCta() {
  const { openLoginModal } = useHomePage();

  return (
    <Container size="md" pb={60}>
      <Paper withBorder radius="lg" p="xl">
        <Stack align="center" gap="md">
          <Title order={2} ta="center">
            Ready to start reading?
          </Title>
          <Text c="dimmed" ta="center" maw={480}>
            Log in with Google or GitHub to upload documents and start asking questions.
          </Text>
          <Button size="md" onClick={openLoginModal}>
            Log in to begin
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
