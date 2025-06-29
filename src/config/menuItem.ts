import type { MenuItem } from "../types/MenuItem";

const menuItems: MenuItem[] = [
  {
    label: "menu.home.label",
    path: "/",
    title: "menu.home.title",
  },
  {
    label: "menu.administration.label",
    protected: true,
    children: [
      {
        title: "menu.administration.label",

        items: [
          { label: "menu.administration.entry.label", path: "/admin-entry", title: "menu.administration.entry.title" },
          { label: "menu.logout.label", path: "/logout", title: "menu.logout.title" },
        ],
      },
    ],
  }
];

export default menuItems;
