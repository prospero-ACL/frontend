import { AppShell, Burger, Button, Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Navbar from '@/shared/components/navbar';
import { useMainApp } from './hooks/use-main-app';

export function MainApp() {
  const { navbarOpened, toggleNavbar, handleLogout } = useMainApp();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !navbarOpened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={navbarOpened} onClick={toggleNavbar} hiddenFrom="sm" size="sm" />
          <Button onClick={handleLogout}>Logout</Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
