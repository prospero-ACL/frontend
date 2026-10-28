import { Badge, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { useHomePage } from '@/homepage/hooks/use-home-page';
import classes from './welcome.module.css';

export default function Welcome() {
  const { openLoginModal } = useHomePage();

  return (
    <Container size="md" pt={60}>
      <Stack align="center" gap="lg">
        <Badge variant="light" size="lg" radius="xl">
          Retrieval-augmented reading
        </Badge>
        <Title className={classes.title} ta="center">
          Know your trilogies{' '}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'indigo', to: 'cyan' }}
          >
            better
          </Text>
        </Title>
        <Text c="dimmed" ta="center" size="lg" maw={580}>
          Upload a trilogy — or any document in three parts — and ask anything about it. Get
          summaries and trace ideas across the parts, limited to what your clearance lets you read.
        </Text>
        <Group justify="center" mt="md">
          <Button size="lg" onClick={openLoginModal}>
            Get started
          </Button>
          <Button size="lg" variant="default" component="a" href="#how-it-works">
            How it works
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
