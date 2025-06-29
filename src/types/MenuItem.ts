export interface MenuItem {
  label: string;
  path?: string;
  title?: string;
  protected?: boolean;
  isVisible?: boolean;
  isVisibleSitemap?: boolean;
  children?: {
    title?: string;
    items: {
      label: string;
      path: string;
      title?: string;
      isVisible?: boolean;
      isVisibleSitemap?: boolean;
    }[];
  }[];
}