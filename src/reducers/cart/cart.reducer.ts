import { Reducer } from 'redux';
import { CartAction, CartActionType, CartState } from './cart.types';

const initialState: CartState = {
  isFetching: false,
  cart: null,
};

const cartReducer: Reducer<CartState, CartAction> = (state = initialState, action) => {
  switch (action.type) {
    case CartActionType.ADD_CART_PENDING:
    case CartActionType.DELETE_CART_PENDING:
    case CartActionType.GET_CART_PENDING:
    case CartActionType.UPDATE_CART_PENDING:
      return { ...state, isFetching: true };

    case CartActionType.DELETE_CART_FAIL:
    case CartActionType.GET_CART_FAIL:
    case CartActionType.ADD_CART_FAIL:
    case CartActionType.UPDATE_CART_FAIL:
      return { ...state, isFetching: false };

    case CartActionType.ADD_CART_SUCCESS:
    case CartActionType.DELETE_CART_SUCCESS:
    case CartActionType.UPDATE_CART_SUCCESS:
      return { ...state, isFetching: false };

    case CartActionType.GET_CART_SUCCESS:
      return { ...state, isFetching: false, cart: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
