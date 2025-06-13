import { UserRole, UserStatus } from '../../enums/user.enum';

export interface User {
  id: string;
  username?: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  shelterName?: string;
  address?: string;
  terms: boolean;
  logo?: string;
  isShelter: boolean;
  city?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  isFirstLogin?: boolean;
  status: UserStatus;
  role: UserRole;
  favorites: string[];
}
