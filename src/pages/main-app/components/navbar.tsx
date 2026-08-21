import { NavLink } from '@mantine/core';
import { HouseIcon, GaugeIcon, ProhibitIcon } from '@phosphor-icons/react';
import { Link, useMatch } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <NavLink
        component={Link}
        to="/app"
        label="Chat with LLM"
        description="The main app"
        leftSection={<HouseIcon size={16} />}
        active={!!useMatch('/app')}
      />
      <NavLink
        component={Link}
        to="/app/profile"
        label="With right section"
        description="User profile and authorization"
        leftSection={<GaugeIcon size={16} />}
        active={!!useMatch('/app/profile')}
      />
      <NavLink
        component={Link}
        to="/app/documents"
        label="Documents"
        description="Add or remove documents"
        leftSection={<ProhibitIcon size={16} />}
        active={!!useMatch('/app/documents')}
      />
    </>
  );
}
