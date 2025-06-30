import type { MenuItem } from "../types/MenuItem";

const menuItems: MenuItem[] = [
  {
    label: "Inicio",
    path: "/",
    title: "Ir al inicio",
    isVisible: true,
    isVisibleSitemap: true,
  },
  {
    label: "Administración",
    protected: true,
    isVisible: true,
    isVisibleSitemap: true,
    children: [
      {
        title: "Sección de administración",
        items: [
          {
            label: "Entrada Admin",
            path: "/admin-entry",
            title: "Acceso al panel de administración",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Usuarios",
            title: "Gestión de usuarios",
            isVisible: true,
            isVisibleSitemap: true,
            children: [
              {
                label: "Lista de Usuarios",
                path: "/usuarios/lista",
                title: "Ver todos los usuarios",
                isVisible: true,
                isVisibleSitemap: true,
              },
              {
                label: "Configuración",
                title: "Configuración de usuarios",
                path: "/usuarios/configuracion",
                isVisible: true,
                isVisibleSitemap: true,
                children: [
                  {
                    label: "Perfil",
                    path: "/usuarios/configuracion/perfil",
                    title: "Editar perfil de usuario",
                    isVisible: true,
                    isVisibleSitemap: true,
                  },
                  {
                    label: "Seguridad",
                    path: "/usuarios/configuracion/seguridad",
                    title: "Configuraciones de seguridad",
                    isVisible: true,
                    isVisibleSitemap: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Módulos Internos",
        items: [
          {
            label: "Control de Acceso",
            path: "/admin/control-acceso",
            isVisible: true,
            isVisibleSitemap: true,
            children: [
              {
                label: "Lista de Usuarios",
                path: "/usuarios/lista",
                title: "Ver todos los usuarios",
                isVisible: true,
                isVisibleSitemap: true,
              },
              {
                label: "Configuración",
                title: "Configuración de usuarios",
                path: "/usuarios/configuracion",
                isVisible: true,
                isVisibleSitemap: true,
                children: [
                  {
                    label: "Perfil",
                    path: "/usuarios/configuracion/perfil",
                    title: "Editar perfil de usuario",
                    isVisible: true,
                    isVisibleSitemap: true,
                  },
                  {
                    label: "Seguridad",
                    path: "/usuarios/configuracion/seguridad",
                    title: "Configuraciones de seguridad",
                    isVisible: true,
                    isVisibleSitemap: true,
                  },
                ],
              },
            ],
          },
          {
            label: "Logs del Sistema",
            path: "/admin/logs",
            isVisible: true,
            isVisibleSitemap: true,
          },
        ],
      },
    ],
  },
  {
    label: "Documentación",
    isVisible: true,
    isVisibleSitemap: true,
    children: [
      {
        title: "Guías Técnicas",
        items: [
          {
            label: "API REST",
            path: "/docs/api",
            title: "Referencia de la API",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Webhooks",
            path: "/docs/webhooks",
            isVisible: true,
            isVisibleSitemap: true,
          },
        ],
      },
      {
        title: "Guías de Usuario",
        items: [
          {
            label: "Manual de Usuario",
            path: "/docs/manual",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Preguntas Frecuentes",
            path: "/docs/faq",
            isVisible: true,
            isVisibleSitemap: true,
          },
        ],
      },
    ],
  },
  {
    label: "Reportes",
    isVisible: true,
    isVisibleSitemap: true,
    children: [
      {
        title: "Panel de Reportes",
        items: [
          {
            label: "Finanzas",
            path: "/reportes/financieros",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Estadísticas",
            isVisible: true,
            isVisibleSitemap: true,
            children: [
              {
                label: "Tráfico",
                path: "/reportes/estadisticas/trafico",
                isVisible: true,
                isVisibleSitemap: true,
              },
              {
                label: "Comportamiento",
                path: "/reportes/estadisticas/comportamiento",
                isVisible: true,
                isVisibleSitemap: true,
              },
            ],
          },
        ],
      },
      {
        title: "Indicadores Clave",
        items: [
          {
            label: "KPIs de Marketing",
            path: "/reportes/kpis/marketing",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "KPIs de Ventas",
            path: "/reportes/kpis/ventas",
            isVisible: true,
            isVisibleSitemap: true,
          },
        ],
      },
      {
        title: "Indicadores Clave",
        items: [
          {
            label: "KPIs de Marketing",
            path: "/reportes/kpis/marketing",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "KPIs de Ventas",
            path: "/reportes/kpis/ventas",
            isVisible: true,
            isVisibleSitemap: true,
          },
        ],
      },
    ],
  },
  {
    label: "Servicios",
    isVisible: true,
    isVisibleSitemap: true,
    children: [
      {
        title: "Ofrecemos",
        items: [
          {
            label: "Consultoría",
            path: "/servicios/consultoria",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Capacitación",
            path: "/servicios/capacitacion",
            isVisible: true,
            isVisibleSitemap: true,
          },
        ],
      },
      {
        title: "Integraciones",
        items: [
          {
            label: "Slack",
            path: "/servicios/integraciones/slack",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Microsoft Teams",
            path: "/servicios/integraciones/teams",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Zapier",
            path: "/servicios/integraciones/zapier",
            isVisible: true,
            isVisibleSitemap: true,
          },
        ],
      },
      {
        title: "Integraciones",
        items: [
          {
            label: "Slack",
            path: "/servicios/integraciones/slack",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Microsoft Teams",
            path: "/servicios/integraciones/teams",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Zapier",
            path: "/servicios/integraciones/zapier",
            isVisible: true,
            isVisibleSitemap: true,
          },
        ],
      },
      {
        title: "Integraciones",
        items: [
          {
            label: "Slack",
            path: "/servicios/integraciones/slack",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Microsoft Teams",
            path: "/servicios/integraciones/teams",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Zapier",
            path: "/servicios/integraciones/zapier",
            isVisible: true,
            isVisibleSitemap: true,
          },
        ],
      },
    ],
  },
  {
    label: "Soporte",
    isVisible: true,
    isVisibleSitemap: true,
    children: [
      {
        title: "Centro de Soporte",
        items: [
          {
            label: "Tickets",
            path: "/soporte/tickets",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Chat en Línea",
            path: "/soporte/chat",
            isVisible: true,
            isVisibleSitemap: true,
          },
        ],
      },
      {
        title: "Comunidad",
        items: [
          {
            label: "Foros",
            path: "/soporte/foros",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "Eventos",
            path: "/soporte/eventos",
            isVisible: true,
            isVisibleSitemap: true,
          },
        ],
      },
    ],
  },
  {
    label: "Ayuda",
    path: "/ayuda",
    title: "Centro de ayuda",
    isVisible: true,
    isVisibleSitemap: true,
  },
];

export default menuItems;