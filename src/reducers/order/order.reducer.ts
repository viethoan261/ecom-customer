import { Reducer } from 'redux';
import { OrderAction, OrderActionType, OrderState } from './order.types';

const initialState: OrderState = {
  isFetching: false,
  orders: [],
};

const orderReducer: Reducer<OrderState, OrderAction> = (state = initialState, action) => {
  switch (action.type) {
    case OrderActionType.ORDER_PENDING:
    case OrderActionType.GET_ORDER_PENDING:
    case OrderActionType.CANCEL_ORDER_PENDING:
      return { ...state, isFetching: true };

    case OrderActionType.ORDER_SUCCESS:
    case OrderActionType.ORDER_FAIL:
    case OrderActionType.GET_ORDER_FAIL:
    case OrderActionType.CANCEL_ORDER_FAIL:
    case OrderActionType.CANCEL_ORDER_SUCCESS:
      return { ...state, isFetching: false };

    case OrderActionType.GET_ORDER_SUCCESS:
      return { ...state, isFetching: false, orders: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
