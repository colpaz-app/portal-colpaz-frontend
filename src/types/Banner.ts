export interface Banner {
  id: number;
  title?: string;
  description?: string;
  imageUrl: string;
  link?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  modifiedAt: string;
  translations?: {
    bannerId: number;
    languageId: number;
    title?: string;
    description?: string;
    createdBy?: string;
  }[];
}