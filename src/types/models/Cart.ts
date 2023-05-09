import { BaseModel } from './BaseModal';
import { Colors, Properties, Sizes } from './Product';

export interface Cart extends BaseModel {
  totalAmount: number;
  products: ProductInCart[];
}

export interface ProductInCart {
  productID: number;
  productDetailID: number;
  cartDetailID: number;
  name: string;
  price: number;
  color: Colors;
  size: Sizes;
  quantity: number;
  imagePath: string;
  properties: Properties[];
}
