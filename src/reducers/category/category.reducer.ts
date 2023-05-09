import { Reducer } from 'redux';
import { CategoryAction, CategoryActionType, CategoryState } from './category.type';

const initialState: CategoryState = {
  isFetching: false,
  categories: [],
};

const categoryReducer: Reducer<CategoryState, CategoryAction> = (state = initialState, action) => {
  switch (action.type) {
    case CategoryActionType.GET_ALL_CATEGORIES_PENDING:
      return { ...state, isFetching: true };
    case CategoryActionType.GET_ALL_CATEGORIES_SUCCESS:
      return { ...state, isFetching: false, categories: action.payload };
    case CategoryActionType.GET_ALL_CATEGORIES_FAIL:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default categoryReducer;
