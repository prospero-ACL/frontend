import { AppShell, UnstyledButton, Button, Stack, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ClearanceTiers from '@/homepage/components/clearance-tiers/clearance-tiers';
import ExampleMarquee from '@/homepage/components/example-marquee/example-marquee';
import FinalCta from '@/homepage/components/final-cta/final-cta';
import HowItWorks from '@/homepage/components/how-it-works/how-it-works';
import LoginModal from '@/homepage/components/login-modal';
import Welcome from '@/homepage/components/welcome/welcome';
import { useHomePage } from '@/homepage/hooks/use-home-page';
import Header from '@/shared/components/header';
import classes from './home.module.css';

export default function HomePage() {
  const { openLoginModal } = useHomePage();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <Header navbarOpened={opened} toggleNavBar={toggle} openLoginModal={openLoginModal} />

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
        <Stack className={classes.main} align="center" gap="xl">
          <Welcome />
          <Space h="xl" />
          <ExampleMarquee />
          <Space h="xl" />
          <HowItWorks />
          <Space h="xl" />
          <ClearanceTiers />
          <Space h="xl" />
          <FinalCta />
          <Space h="xl" />
        </Stack>
        <LoginModal />
      </AppShell.Main>
    </AppShell>
  );
}
