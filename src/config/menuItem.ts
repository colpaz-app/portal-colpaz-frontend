import type { MenuItem } from '../types/MenuItem';

const menuItems: MenuItem[] = [
    {
        label: 'Inicio',
        path: '/',
    },
    {
        label: 'Administración',
        protected: true,
        children: [
            {
                title: 'Gestión de Usuarios',
                items: [
                    { label: 'Listado de Usuarios', path: '/admin/users' },
                    { label: 'Roles y Permisos', path: '/admin/roles' },
                ],
            },
            {
                items: [
                    { label: 'Parámetros', path: '/admin/settings' },
                    { label: 'Estadísticas', path: '/admin/stats' },
                ],
            },
            {
                items: [
                    { label: 'Parámetros', path: '/admin/settings' },
                    { label: 'Estadísticas', path: '/admin/stats' },
                ],
            },
            {
                title: 'Gestión de Usuarios',
                items: [
                    { label: 'Listado de Usuarios', path: '/admin/users' },
                    { label: 'Roles y Permisos', path: '/admin/roles' },
                ],
            },
        ],
    },
    {
        label: 'Cerrar sesión',
        path: '/logout',
        protected: true,
    },
];

export default menuItems;