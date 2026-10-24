import { AppShell, Burger, Button, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useModal } from '@/shared/hooks/use-modal';
import classes from './header.module.css';

export default function Header({ handleLogout }: { handleLogout: () => void }) {
  const [opened, { toggle }] = useDisclosure(false);
  const { open: openLoginModal } = useModal('login');
  const user = null; // Replace with actual user state from your auth context or store

  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group justify="space-between" style={{ flex: 1 }}>
          Prospero RAG ACL
          <Group ml="xl" gap={4} visibleFrom="sm">
            <UnstyledButton
              className={classes.control}
              href="https://github.com/prospero-ACL"
              component="a"
              target="_new"
            >
              Github
            </UnstyledButton>
            <UnstyledButton
              className={classes.control}
              href="https://www.linkedin.com/in/themis-darelis-320a608b"
              component="a"
              target="_new"
            >
              LinkedIn
            </UnstyledButton>
            {user ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <Button onClick={openLoginModal}>Login</Button>
            )}
          </Group>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
