import type { MenuItem } from '../types/MenuItem';

const menuItems: MenuItem[] = [
    {
        label: 'menu.home.label',
        path: '/',
        title: 'menu.home.title',
    },
    {
        label: 'menu.administration.label',
        protected: true,
        path: '/admin',
        title: 'menu.administration.title',
    },
    {
        label: 'menu.logout.label',
        path: '/logout',
        protected: true,
        title: 'menu.logout.title',
    },
];

export default menuItems;