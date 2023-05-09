import { BaseModel } from './BaseModal';

export interface User extends BaseModel {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
}
