import { AppShell, Burger, Button, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import api from '../config/api';

export function MainApp() {
  const [opened, { toggle }] = useDisclosure();

  const [logout] = api.useLogoutMutation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Button
            onClick={async () => {
              await logout();
            }}
          >
            Logout
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar is collapsed on mobile at sm breakpoint. At that point it is no longer offset by
        padding in the main element and it takes the full width of the screen when opened.
      </AppShell.Navbar>
      <AppShell.Main>
        <Text>This is the main section, your app content here.</Text>
        <Text>Layout used in most cases – Navbar and Header with fixed position</Text>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
