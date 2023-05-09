import { ThunkAction } from 'redux-thunk';
import { Category } from '../../types/models/Category';
import { RootState } from '../../redux/reducer';

export interface CategoryState {
  isFetching: boolean;
  categories: Category[] | null;
}

export enum CategoryActionType {
  GET_ALL_CATEGORIES_PENDING = 'GET_ALL_CATEGORIES_PENDING',
  GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS',
  GET_ALL_CATEGORIES_FAIL = 'GET_ALL_CATEGORIES_FAIL',
}

export interface GetAllCategoriesActionPending {
  type: CategoryActionType.GET_ALL_CATEGORIES_PENDING;
}

export interface GetAllCategoriesActionSuccess {
  type: CategoryActionType.GET_ALL_CATEGORIES_SUCCESS;
  payload: Category[];
}

export interface GetAllCategoriesActionFail {
  type: CategoryActionType.GET_ALL_CATEGORIES_FAIL;
}

export type CategoryAction = GetAllCategoriesActionPending | GetAllCategoriesActionSuccess | GetAllCategoriesActionFail;

export type CategoryThunkAction = ThunkAction<void, RootState, any, CategoryAction>;
