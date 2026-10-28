import { Card, Container, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { ChatsCircleIcon, LightbulbIcon, UploadSimpleIcon } from '@phosphor-icons/react';

const STEPS = [
  {
    icon: UploadSimpleIcon,
    title: 'Upload',
    description: 'A patrician adds a trilogy, or any document in three parts, as three PDFs.',
  },
  {
    icon: ChatsCircleIcon,
    title: 'Ask',
    description:
      'Ask in plain language or request a summary — answers use every part you are cleared for.',
  },
  {
    icon: LightbulbIcon,
    title: 'Understand',
    description: 'Get answers grounded in the text, connecting ideas across all three parts.',
  },
];

export default function HowItWorks() {
  return (
    <Container size="lg" id="how-it-works" style={{ scrollMarginTop: 80 }}>
      <Stack gap="xl">
        <Title order={2} ta="center">
          How it works
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          {STEPS.map(({ icon: Icon, title, description }, index) => (
            <Card key={title} withBorder radius="md" padding="lg">
              <ThemeIcon size={48} radius="md" variant="light">
                <Icon size={26} />
              </ThemeIcon>
              <Text fw={700} size="lg" mt="md">
                {index + 1}. {title}
              </Text>
              <Text c="dimmed" size="sm" mt="xs">
                {description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
