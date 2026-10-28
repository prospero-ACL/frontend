import { BankIcon, CrownIcon, UserIcon } from '@phosphor-icons/react';

export const TRILOGY_PARTS = ['Part I', 'Part II', 'Part III'];

export const CLEARANCE_TIERS = [
  {
    name: 'Plebian',
    icon: UserIcon,
    color: 'gray',
    partsCleared: 1,
    description: 'Every new account starts here. Answers draw on the first part only.',
  },
  {
    name: 'Eques',
    icon: BankIcon,
    color: 'blue',
    partsCleared: 2,
    description: 'Answers draw on the first two parts.',
  },
  {
    name: 'Patrician',
    icon: CrownIcon,
    color: 'yellow',
    partsCleared: 3,
    description: 'Answers draw on the whole work. Only patricians can upload new trilogies.',
  },
];
