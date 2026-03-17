export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface AvailabilityResponse {
  slots: TimeSlot[];
}
