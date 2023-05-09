import { Reducer } from 'redux';
import { ProductAction, ProductActionType, ProductState } from './product.types';

const initialState: ProductState = {
  isFetching: false,
  products: [],
  productById: null,
};

const productReducer: Reducer<ProductState, ProductAction> = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionType.GET_PRODUCT_BY_ID_PENDING:
    case ProductActionType.SEARCH_PRODUCT_PENDING:
      return { ...state, isFetching: true };

    case ProductActionType.GET_PRODUCT_BY_ID_FAIL:
    case ProductActionType.SEARCH_PRODUCT_FAIL:
      return { ...state, isFetching: false };

    case ProductActionType.SEARCH_PRODUCT_SUCCESS:
      return { ...state, isFetching: false, products: action.payload };
    case ProductActionType.GET_PRODUCT_BY_ID_SUCCESS:
      return { ...state, isFetching: false, productById: action.payload };
    default:
      return state;
  }
};

export default productReducer;
