import { Reducer } from 'redux';
import { RatingAction, RatingActionType, RatingState } from './rating.types';
import { stat } from 'fs';

const initialState: RatingState = {
  isFetching: false,
  ratings: [],
};

const ratingReducer: Reducer<RatingState, RatingAction> = (state = initialState, action) => {
  switch (action.type) {
    case RatingActionType.POST_RATING_PENDING:
      return { ...state, isFetching: true };
    case RatingActionType.POST_RATING_SUCCESS:
    case RatingActionType.POST_RATING_FAIL:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default ratingReducer;
