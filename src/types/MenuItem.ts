// src/types/MenuItem.ts

export interface MenuChildItem {
  label: string;
  path?: string;
  title?: string;
  isVisible?: boolean;
  isVisibleSitemap?: boolean;
  children?: MenuChildItem[];
}

export interface MenuSection {
  title?: string;
  items: MenuChildItem[];
}

export interface MenuItem {
  label: string;
  path?: string;
  title?: string;
  protected?: boolean;
  isVisible?: boolean;
  isVisibleSitemap?: boolean;
  children?: MenuSection[];
}