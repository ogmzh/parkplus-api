export interface ZoneEntry {
  id: string;
  name: string;
  price: number;
  maxParkDuration: number;
  parkTimeStart: string;
  parkTimeEnd: string;
}

export interface ZoneResponse {
  data: ZoneEntry[];
  count: number;
}
