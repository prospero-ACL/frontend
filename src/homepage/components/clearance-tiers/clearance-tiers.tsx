import {
  Badge,
  Card,
  Container,
  Group,
  List,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { CheckIcon, LockSimpleIcon, ShieldCheckIcon } from '@phosphor-icons/react';
import { CLEARANCE_TIERS, TRILOGY_PARTS } from './clearance-tiers-data';

export default function ClearanceTiers() {
  return (
    <Container size="lg">
      <Stack gap="xl">
        <Stack gap="xs" align="center">
          <Badge variant="light" radius="xl" leftSection={<ShieldCheckIcon size={14} />}>
            Access control
          </Badge>
          <Title order={2} ta="center">
            Three tiers, three parts
          </Title>
          <Text c="dimmed" ta="center" maw={620}>
            Every trilogy is stratified by part, and every user holds one of three clearances. The
            higher your clearance, the deeper into the work your answers can reach.
          </Text>
        </Stack>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          {CLEARANCE_TIERS.map(({ name, icon: Icon, color, partsCleared, description }) => (
            <Card key={name} withBorder radius="md" padding="lg">
              <Group gap="sm">
                <ThemeIcon size={44} radius="md" variant="light" color={color}>
                  <Icon size={24} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  {name}
                </Text>
              </Group>
              <Group gap={6} mt="md">
                {TRILOGY_PARTS.map((part, index) =>
                  index < partsCleared ? (
                    <Badge key={part} color={color} leftSection={<CheckIcon size={12} />}>
                      {part}
                    </Badge>
                  ) : (
                    <Badge
                      key={part}
                      color="gray"
                      variant="outline"
                      leftSection={<LockSimpleIcon size={12} />}
                    >
                      {part}
                    </Badge>
                  )
                )}
              </Group>
              <Text c="dimmed" size="sm" mt="md">
                {description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
        <List
          size="sm"
          c="dimmed"
          spacing={4}
          mx="auto"
          icon={
            <ThemeIcon size={18} radius="xl" variant="light">
              <CheckIcon size={11} />
            </ThemeIcon>
          }
        >
          <List.Item>
            Everyone sees every trilogy title — only the text behind it is gated.
          </List.Item>
          <List.Item>
            Clearance is assigned by an administrator, never chosen by the user.
          </List.Item>
          <List.Item>
            Enforced in the database itself with per-tier Postgres roles and row-level security.
          </List.Item>
        </List>
      </Stack>
    </Container>
  );
}
