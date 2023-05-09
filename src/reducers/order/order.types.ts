import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../redux/reducer';
import { Order } from '../../types/models/Order';

export interface OrderState {
  isFetching: boolean;
  orders: Order[];
}

export enum OrderActionType {
  ORDER_PENDING = 'ORDER_PENDING',
  ORDER_SUCCESS = 'ORDER_SUCCESS',
  ORDER_FAIL = 'ORDER_FAIL',

  GET_ORDER_PENDING = 'GET_ORDER_PENDING',
  GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS',
  GET_ORDER_FAIL = 'GET_ORDER_FAIL',

  CANCEL_ORDER_PENDING = 'CANCEL_ORDER_PENDING',
  CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS',
  CANCEL_ORDER_FAIL = 'CANCEL_ORDER_FAIL',
}

export interface OrderActionPending {
  type: OrderActionType.ORDER_PENDING;
}
export interface OrderActionSuccess {
  type: OrderActionType.ORDER_SUCCESS;
}
export interface OrderActionFail {
  type: OrderActionType.ORDER_FAIL;
}

export interface GetOrderActionPending {
  type: OrderActionType.GET_ORDER_PENDING;
}
export interface GetOrderActionSuccess {
  type: OrderActionType.GET_ORDER_SUCCESS;
  payload: Order[];
}
export interface GetOrderActionFail {
  type: OrderActionType.GET_ORDER_FAIL;
}

export interface CancelOrderActionPending {
  type: OrderActionType.CANCEL_ORDER_PENDING;
}
export interface CancelOrderActionSuccess {
  type: OrderActionType.CANCEL_ORDER_SUCCESS;
  payload: Order[];
}
export interface CancelOrderActionFail {
  type: OrderActionType.CANCEL_ORDER_FAIL;
}
export type OrderAction =
  | OrderActionPending
  | OrderActionFail
  | OrderActionSuccess
  | GetOrderActionFail
  | GetOrderActionPending
  | GetOrderActionSuccess
  | CancelOrderActionFail
  | CancelOrderActionPending
  | CancelOrderActionSuccess;

export type OrderThunkAction = ThunkAction<void, RootState, any, OrderAction>;
