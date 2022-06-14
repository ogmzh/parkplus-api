export interface ClientResponse {
  count: number;
  data: ClientData[];
}

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ClientData {
  id: string;
  name: string;
}

export interface SingleClientData extends ClientData {
  employees: Employee[];
  // TODO employees, zones, machines
}
