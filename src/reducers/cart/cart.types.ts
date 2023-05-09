import { ThunkAction } from 'redux-thunk';
import { Cart } from '../../types/models/Cart';
import { RootState } from '../../redux/reducer';

export interface CartState {
  isFetching: boolean;
  cart: Cart | null;
}

export enum CartActionType {
  ADD_CART_PENDING = 'ADD_CART_PENDING',
  ADD_CART_SUCCESS = 'ADD_CART_SUCCESS',
  ADD_CART_FAIL = 'ADD_CART_FAIL',

  GET_CART_PENDING = 'GET_CART_PENDING',
  GET_CART_SUCCESS = 'GET_CART_SUCCESS',
  GET_CART_FAIL = 'GET_CART_FAIL',

  DELETE_CART_PENDING = 'DELETE_CART_PENDING',
  DELETE_CART_SUCCESS = 'DELETE_CART_SUCCESS',
  DELETE_CART_FAIL = 'DELETE_CART_FAIL',

  UPDATE_CART_PENDING = 'UPDATE_CART_PENDING',
  UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS',
  UPDATE_CART_FAIL = 'UPDATE_CART_FAIL',
}

export interface AddCartActionPending {
  type: CartActionType.ADD_CART_PENDING;
}
export interface AddCartActionSuccess {
  type: CartActionType.ADD_CART_SUCCESS;
}
export interface AddCartActionFail {
  type: CartActionType.ADD_CART_FAIL;
}

export interface GetCartActionPending {
  type: CartActionType.GET_CART_PENDING;
}
export interface GetCartActionSuccess {
  type: CartActionType.GET_CART_SUCCESS;
  payload: Cart;
}
export interface GetCartActionFail {
  type: CartActionType.GET_CART_FAIL;
}

export interface DeleteCartActionPending {
  type: CartActionType.DELETE_CART_PENDING;
}
export interface DeleteCartActionSuccess {
  type: CartActionType.DELETE_CART_SUCCESS;
}
export interface DeleteCartActionFail {
  type: CartActionType.DELETE_CART_FAIL;
}

export interface UpdateCartActionPending {
  type: CartActionType.UPDATE_CART_PENDING;
}
export interface UpdateCartActionSuccess {
  type: CartActionType.UPDATE_CART_SUCCESS;
}
export interface UpdateCartActionFail {
  type: CartActionType.UPDATE_CART_FAIL;
}

export type CartAction =
  | AddCartActionFail
  | AddCartActionPending
  | AddCartActionSuccess
  | GetCartActionFail
  | GetCartActionPending
  | GetCartActionSuccess
  | DeleteCartActionFail
  | DeleteCartActionPending
  | DeleteCartActionSuccess
  | UpdateCartActionPending
  | UpdateCartActionFail
  | UpdateCartActionSuccess;

export type CartThunkAction = ThunkAction<void, RootState, any, CartAction>;
