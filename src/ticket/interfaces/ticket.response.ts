import { ZoneEntry } from '@app/zone/interfaces/zone.response';

export interface TicketEntry {
  id: string;
  licensePlate: string;
  issuedAt: string;
  expiresAt: string;
  zone: ZoneEntry;
}

export interface TicketResponse {
  data: TicketEntry[];
  count: number;
}
