import { AppShell, Burger, Button, Group, UnstyledButton } from '@mantine/core';
import { useAppSelector } from '@/config/store';
import classes from './header.module.css';

export type HeaderProps = {
  handleLogout?: () => void;
  openLoginModal?: () => void;
  toggleNavBar: () => void;
  navbarOpened: boolean;
};

export default function Header(props: HeaderProps) {
  const { handleLogout, toggleNavBar, navbarOpened, openLoginModal } = props;
  const user = useAppSelector((state) => state.auth.user);

  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger opened={navbarOpened} onClick={toggleNavBar} hiddenFrom="sm" size="sm" />
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
