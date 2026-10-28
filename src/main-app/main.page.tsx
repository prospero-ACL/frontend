import { AppShell, Center } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Header from '@/shared/components/header';
import Navbar from '@/shared/components/navbar';
import { useMainApp } from './hooks/use-main-app';

export default function MainApp() {
  const { desktopOpened, toggleDesktop, navbarOpened, toggleNavbar, handleLogout } = useMainApp();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !navbarOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <Header
        handleLogout={handleLogout}
        toggleNavBar={toggleNavbar}
        navbarOpened={navbarOpened}
        toggleDesktop={toggleDesktop}
        desktopOpened={desktopOpened}
      />
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Center maw={1280} mx="auto" h="100%">
          <Outlet />
        </Center>
      </AppShell.Main>
    </AppShell>
  );
}
