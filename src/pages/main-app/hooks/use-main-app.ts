import { useDisclosure } from '@mantine/hooks';
import api from '@/config/api';

export function useMainApp() {
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();
  const [logout] = api.useLogoutMutation();

  async function handleLogout() {
    await logout();
  }

  return {
    navbarOpened,
    toggleNavbar,
    handleLogout,
  };
}
