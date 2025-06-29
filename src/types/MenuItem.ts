export type MenuItem = {
  label: string;
  path?: string;
  title?: string;
  protected?: boolean;
  children?: {
    title?: string;
    items: {
      label: string;
      path: string;
      title?: string;
    }[];
  }[];
};