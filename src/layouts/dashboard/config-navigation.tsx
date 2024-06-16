import SvgColor from '@/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_dashbord'),
  },
  {
    title: 'milestones',
    path: '/milestones',
    icon: icon('ic_milestone'),
  },
  {
    title: 'messages',
    path: '/messages',
    icon: icon('ic_message'),
  },
  {
    title: 'contacts',
    path: '/contacts',
    icon: icon('ic_contact'),
  },
  {
    title: 'support',
    path: '/support',
    icon: icon('ic_support'),
  },
  {
    title: 'settings',
    path: '/settings',
    icon: icon('ic_settings'),
  },
];

export default navConfig;
