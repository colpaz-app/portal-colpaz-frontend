import type { MenuItem } from "../types/MenuItem";

const menuItems: MenuItem[] = [
  {
    label: "menu.home.label",
    path: "/",
    title: "menu.home.title",
    isVisible: true,
    isVisibleSitemap: true,
  },
  {
    label: "menu.administration.label",
    protected: true,
    isVisible: true,
    isVisibleSitemap: true,
    children: [
      {
        title: "menu.administration.label",
        items: [
          {
            label: "menu.administration.entry.label",
            path: "/admin-entry",
            title: "menu.administration.entry.title",
            isVisible: true,
            isVisibleSitemap: true,
          },
          {
            label: "menu.logout.label",
            path: "/logout",
            title: "menu.logout.title",
            isVisible: true,
            isVisibleSitemap: true,
          },
        ],
      },
    ],
  },
];

export default menuItems;
