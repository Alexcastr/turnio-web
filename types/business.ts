export interface Service {
  id: string;
  name: string;
  description?: string | null;
  durationMinutes: number;
  price: number;
  currency: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Schedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface StaffWorker {
  id: string;
  name: string;
  displayName: string | null;
  image: string | null;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  category: string;
  phone: string;
  timezone: string;
  logoUrl?: string | null;
  services: Service[];
  schedules: Schedule[];
  staff: StaffWorker[];
}

export interface BusinessListItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  logoUrl?: string | null;
  phone: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BusinessListResponse {
  items: BusinessListItem[];
  meta: PaginationMeta;
}
