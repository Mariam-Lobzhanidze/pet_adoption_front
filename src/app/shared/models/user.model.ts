export interface User {
  fullName?: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
  profilePicture?: File;
  userType: 'individual' | 'shelter';
}

export interface Shelter extends User {
  shelterName: string;
  address: string;
  legalId: string;
  logo?: File;
  website?: string;
}
