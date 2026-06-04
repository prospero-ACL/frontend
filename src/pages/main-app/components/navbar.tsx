import { NavLink } from '@mantine/core';
import { HouseIcon, GaugeIcon, ProhibitIcon } from '@phosphor-icons/react';
import { useMatch } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <NavLink
        href="/app"
        label="Chat with LLM"
        leftSection={<HouseIcon size={16} />}
        active={!!useMatch('/app')}
      />
      <NavLink
        href="/app/profile"
        label="With right section"
        leftSection={<GaugeIcon size={16} />}
        active={!!useMatch('/app/profile')}
      />
      <NavLink
        href="/app/docs"
        label="Documents"
        description="Add or remove documents"
        leftSection={<ProhibitIcon size={16} />}
        active={!!useMatch('/app/docs')}
      />
    </>
  );
}
