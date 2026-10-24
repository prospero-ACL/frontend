import { Button } from '@mantine/core';
// import { useHomePage } from '@/homepage/hooks/use-home-page';
import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LoginModal from '@/homepage/components/login-modal';
import Welcome from '@/homepage/components/welcome/welcome';
import { useModal } from '@/shared/hooks/use-modal';
import classes from './home.module.css';

export default function HomePage() {
  // const { openLoginModal } = useHomePage();
  const { open: openLoginModal } = useModal('login');
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
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
              <Button onClick={openLoginModal}>Login</Button>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton
          href="https://github.com/prospero-ACL"
          className={classes.control}
          component="a"
          target="_new"
        >
          Github
        </UnstyledButton>
        <UnstyledButton
          href="https://www.linkedin.com/in/themis-darelis-320a608b"
          className={classes.control}
          component="a"
          target="_new"
        >
          LinkedIn
        </UnstyledButton>
        <Button onClick={openLoginModal}>Login</Button>
      </AppShell.Navbar>

      <AppShell.Main>
        Navbar is only visible on mobile, links that are rendered in the header on desktop are
        hidden on mobile in header and rendered in navbar instead.
        <Welcome />
        <LoginModal />
      </AppShell.Main>
    </AppShell>
  );
}
