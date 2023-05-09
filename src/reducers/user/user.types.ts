import { ThunkAction } from 'redux-thunk';
import { User } from '../../types/models/Customer';
import { RootState } from '../../redux/reducer';

export interface UserState {
  isFetching: boolean;
  user: User | null;
}

export enum UserActionType {
  LOGIN_PENDING = 'LOGIN_PENDING',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',

  SIGNUP_PENDING = 'SIGNUP_PENDING',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_FAIL = 'SIGNUP_FAIL',

  ACTIVE_USER_PENDING = 'ACTIVE_USER_PENDING',
  ACTIVE_USER_SUCCESS = 'ACTIVE_USER_SUCCESS',
  ACTIVE_USER_FAIL = 'ACTIVE_USER_FAIL',

  FORGOT_PASSWORD_PENDING = 'FORGOT_PASSWORD_PENDING',
  FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL',

  RESET_PASSWORD_PENDING = 'RESET_PASSWORD_PENDING',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL',

  GET_PROFILE_PENDING = 'GET_PROFILE_PENDING',
  GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS',
  GET_PROFILE_FAIL = 'GET_PROFILE_FAIL',

  UPDATE_PROFILE_PENDING = 'UPDATE_PROFILE_PENDING',
  UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAIL = 'UPDATET_PROFILE_FAIL',
}
//Login
export interface LoginActionPending {
  type: UserActionType.LOGIN_PENDING;
}

export interface LoginActionSuccess {
  type: UserActionType.LOGIN_SUCCESS;
  payload: any;
}

export interface LoginActionFail {
  type: UserActionType.LOGIN_FAIL;
}

//SignUp
export interface SignUpActionPending {
  type: UserActionType.SIGNUP_PENDING;
}

export interface SignUpActionSuccess {
  type: UserActionType.SIGNUP_SUCCESS;
  payload: any;
}

export interface SignUpActionFail {
  type: UserActionType.SIGNUP_FAIL;
}

//Active
export interface ActiveUserActionPending {
  type: UserActionType.ACTIVE_USER_PENDING;
}

export interface ActiveUserActionSuccess {
  type: UserActionType.ACTIVE_USER_SUCCESS;
  payload: any;
}

export interface ActiveUserActionFail {
  type: UserActionType.ACTIVE_USER_FAIL;
}

//ForgotPassword
export interface ForgotPasswordActionPending {
  type: UserActionType.FORGOT_PASSWORD_PENDING;
}

export interface ForgotPasswordActionSuccess {
  type: UserActionType.FORGOT_PASSWORD_SUCCESS;
  payload: any;
}

export interface ForgotPasswordActionFail {
  type: UserActionType.FORGOT_PASSWORD_FAIL;
}

//ResetPassword
export interface ResetPasswordActionPending {
  type: UserActionType.RESET_PASSWORD_PENDING;
}

export interface ResetPasswordActionSuccess {
  type: UserActionType.RESET_PASSWORD_SUCCESS;
  payload: any;
}

export interface ResetPasswordActionFail {
  type: UserActionType.RESET_PASSWORD_FAIL;
}

export interface GetProfileActionPending {
  type: UserActionType.GET_PROFILE_PENDING;
}

export interface GetProfileActionSuccess {
  type: UserActionType.GET_PROFILE_SUCCESS;
  payload: User;
}

export interface GetProfileActionFail {
  type: UserActionType.GET_PROFILE_FAIL;
}

export interface UpdateProfileActionPending {
  type: UserActionType.UPDATE_PROFILE_PENDING;
}

export interface UpdateProfileActionSuccess {
  type: UserActionType.UPDATE_PROFILE_SUCCESS;
  payload: User;
}

export interface UpdateProfileActionFail {
  type: UserActionType.UPDATE_PROFILE_FAIL;
}

export type UserAction =
  | LoginActionPending
  | LoginActionSuccess
  | LoginActionFail
  | ForgotPasswordActionPending
  | ForgotPasswordActionSuccess
  | ForgotPasswordActionFail
  | ResetPasswordActionPending
  | ResetPasswordActionSuccess
  | ResetPasswordActionFail
  | SignUpActionPending
  | SignUpActionSuccess
  | SignUpActionFail
  | ActiveUserActionPending
  | ActiveUserActionFail
  | ActiveUserActionSuccess
  | GetProfileActionFail
  | GetProfileActionPending
  | GetProfileActionSuccess
  | UpdateProfileActionFail
  | UpdateProfileActionPending
  | UpdateProfileActionSuccess;

export type UserThunkAction = ThunkAction<void, RootState, any, UserAction>;
