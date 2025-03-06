export interface Legend {
  id: number;
  title: string;
  description: string;
  category: string;
  province: string;
  canton: string;
  district: string;
  imageUrl: string;
  createdAt: string;
}

export interface LegendFormData {
  title: string;
  description: string;
  category: string;
  province: string;
  canton: string;
  district: string;
  image?: File;
  imageUrl?: string;
}

export interface FilterParams {
  title?: string;
  category?: string;
  province?: string;
  canton?: string;
  district?: string;
  fromDate?: string;
  toDate?: string;
}