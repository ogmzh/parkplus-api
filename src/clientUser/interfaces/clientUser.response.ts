interface Employer {
  id: string;
  name: string;
}

export interface ClientUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  employer: Employer;
}
