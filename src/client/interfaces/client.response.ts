export interface ClientResponse {
  count: number;
  data: ClientData[];
}

export interface ClientData {
  id: string;
  name: string;
  // employees, zones, machines
}
