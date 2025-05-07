import { uniqueId } from 'lodash';

import {
  IconLayoutDashboard,
  IconBed, IconCalendarCheck, IconUser
} from '@tabler/icons-react';


const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },

  {
    navlabel: true,
    subheader: 'Service',
  },
  {
    id: uniqueId(),
    title: 'Room Management',
    icon: IconBed,
    href: '/rooms',
  },
  {
    id: uniqueId(),
    title: 'Booking Management',
    icon: IconCalendarCheck,
    href: '/bookings',
  },
  
  {
    navlabel: true,
    subheader: 'Other',
  },
  {
    id: uniqueId(),
    title: 'Account Management',
    icon: IconUser,
    href: '/accounts',
  },
];

export default Menuitems;
