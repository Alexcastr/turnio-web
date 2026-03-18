export interface TimeSlot {
  time: string;
  status: 'available' | 'occupied';
}

export interface AvailabilityResponse {
  slots: TimeSlot[];
}
