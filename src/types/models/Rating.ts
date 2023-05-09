import { BaseModel } from './BaseModal';

export interface IRating extends BaseModel {
  author?: string;
  score: number;
  review: string;
  productDetailID: number;
}
