import { SaturationStylesNames } from '@mantine/core/lib/ColorPicker/Saturation/Saturation';
import { Product } from '../../types/models/Product';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../redux/reducer';

export interface ProductState {
  isFetching: boolean;
  products: Product[] | null;
  productById: Product | null;
}

export enum ProductActionType {
  SEARCH_PRODUCT_PENDING = 'SEARCH_PRODUCT_PENDING',
  SEARCH_PRODUCT_SUCCESS = 'SEARCH_PRODUCT_SUCCESS',
  SEARCH_PRODUCT_FAIL = 'SEARCH_PRODUCT_FAIL',

  GET_PRODUCT_BY_ID_PENDING = 'GET_PRODUCT_BY_ID_PENDING',
  GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS',
  GET_PRODUCT_BY_ID_FAIL = 'GET_PRODUCT_BY_ID_FAIL',
}

export interface SearchProductActionPending {
  type: ProductActionType.SEARCH_PRODUCT_PENDING;
}

export interface SearchProductActionSuccess {
  type: ProductActionType.SEARCH_PRODUCT_SUCCESS;
  payload: Product[];
}

export interface SearchProductActionFail {
  type: ProductActionType.SEARCH_PRODUCT_FAIL;
}

export interface GetProductByIdPending {
  type: ProductActionType.GET_PRODUCT_BY_ID_PENDING;
}

export interface GetProductByIdSuccess {
  type: ProductActionType.GET_PRODUCT_BY_ID_SUCCESS;
  payload: Product;
}

export interface GetProductByIdFail {
  type: ProductActionType.GET_PRODUCT_BY_ID_FAIL;
}

export type ProductAction =
  | SearchProductActionFail
  | SearchProductActionPending
  | SearchProductActionSuccess
  | GetProductByIdFail
  | GetProductByIdPending
  | GetProductByIdSuccess;

export type ProductThunkAction = ThunkAction<void, RootState, any, ProductAction>;
