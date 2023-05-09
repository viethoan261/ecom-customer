import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../redux/reducer';
import { IRating } from '../../types/models/Rating';

export interface RatingState {
  isFetching: boolean;
  ratings: IRating[];
}

export enum RatingActionType {
  POST_RATING_PENDING = 'POST_RATING_PENDING',
  POST_RATING_SUCCESS = 'POST_RATING_SUCCESS',
  POST_RATING_FAIL = 'POST_RATING_FAIL',
}

export interface PostRatingActionPending {
  type: RatingActionType.POST_RATING_PENDING;
}
export interface PostRatingActionSuccess {
  type: RatingActionType.POST_RATING_SUCCESS;
}
export interface PostRatingActionFail {
  type: RatingActionType.POST_RATING_FAIL;
}

export type RatingAction = PostRatingActionFail | PostRatingActionPending | PostRatingActionSuccess;

export type RatingThunkAction = ThunkAction<void, RootState, any, RatingAction>;
