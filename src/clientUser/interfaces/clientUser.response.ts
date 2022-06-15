interface Employer {
  id: string;
  name: string;
}

export interface ClientUserEntry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  employer?: Employer;
}
