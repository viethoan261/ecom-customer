import { Reducer } from 'redux';
import { UserAction, UserActionType, UserState } from './user.types';

const initialState: UserState = {
  isFetching: false,
  user: null,
};

const userReducer: Reducer<UserState, UserAction> = (state = initialState, action) => {
  switch (action.type) {
    //Pending
    case UserActionType.LOGIN_PENDING:
    case UserActionType.FORGOT_PASSWORD_PENDING:
    case UserActionType.RESET_PASSWORD_PENDING:
    case UserActionType.SIGNUP_PENDING:
    case UserActionType.ACTIVE_USER_PENDING:
    case UserActionType.UPDATE_PROFILE_PENDING:
    case UserActionType.GET_PROFILE_PENDING:
      return { ...state, isFetching: true };

    //Fail
    case UserActionType.LOGIN_FAIL:
    case UserActionType.FORGOT_PASSWORD_FAIL:
    case UserActionType.RESET_PASSWORD_FAIL:
    case UserActionType.SIGNUP_FAIL:
    case UserActionType.ACTIVE_USER_FAIL:
    case UserActionType.UPDATE_PROFILE_FAIL:
    case UserActionType.GET_PROFILE_FAIL:
      return { ...state, isFetching: false };

    //Success
    case UserActionType.LOGIN_SUCCESS: {
      return { ...state, isFetching: false, user: action.payload };
    }
    case UserActionType.GET_PROFILE_SUCCESS:
    case UserActionType.UPDATE_PROFILE_SUCCESS:
      return { ...state, isFetching: false, user: action.payload };

    case UserActionType.RESET_PASSWORD_SUCCESS:
    case UserActionType.FORGOT_PASSWORD_SUCCESS:
    case UserActionType.SIGNUP_SUCCESS:
    case UserActionType.ACTIVE_USER_SUCCESS:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default userReducer;
