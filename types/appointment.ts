export interface CreateAppointmentDto {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: string;
  staffId?: string;
  startAt: string;
  notes?: string;
}

export interface AppointmentResponse {
  id: string;
  status: string;
  startAt: string;
  endAt: string;
  service: {
    name: string;
    durationMinutes: number;
  };
  client: {
    name: string;
    phone: string;
  };
}
