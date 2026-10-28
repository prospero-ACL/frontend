import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Headers from '@/shared/components/header';
import Navbar from '@/shared/components/navbar';
import { useMainApp } from './hooks/use-main-app';

export default function MainApp() {
  const { navbarOpened, toggleNavbar, handleLogout } = useMainApp();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !navbarOpened } }}
      padding="md"
    >
      <Headers
        handleLogout={handleLogout}
        toggleNavBar={toggleNavbar}
        navbarOpened={navbarOpened}
      />
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
