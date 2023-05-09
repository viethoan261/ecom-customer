import { NavigateFunction } from 'react-router-dom';
import { UpdateProfileActionSuccess, UserActionType, UserThunkAction } from './user.types';
import { AppDispatch } from '../../redux/store';
import { API_URLS } from '../../config/constants/api';
import { useCallApi } from '../../utils/api';
import ROUTER from '../../config/router';
import { notiType, renderNotification } from '../../utils/helpers';
import { Callback } from '../../types/helpers/callback';
import { IconArrowWaveLeftDown } from '@tabler/icons-react';
import { UpdateProfilePayload } from '../../types/helpers/payload';

const Login =
  (payload: any, navigate: NavigateFunction): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: UserActionType.LOGIN_PENDING,
    });

    const api = API_URLS.USER.login();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      const data = response.data;
      dispatch({
        type: UserActionType.LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem('token', data.Token);
      navigate(ROUTER.HOME.INDEX);
      renderNotification('Thông báo', 'Đăng nhập thành công', notiType.SUCCESS);
    } else {
      dispatch({
        type: UserActionType.LOGIN_FAIL,
      });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const SignUp =
  (payload: any, navigate: NavigateFunction): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: UserActionType.SIGNUP_PENDING,
    });

    const api = API_URLS.USER.signup();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      const data = response.data;
      dispatch({
        type: UserActionType.SIGNUP_SUCCESS,
      });

      navigate(ROUTER.AUTH.LOGIN);
      renderNotification(
        'Thông báo',
        'Đăng kí tài khoản thành công. Vui lòng kiểm tra email của bạn để kích hoạt tài khoản',
        notiType.SUCCESS
      );
    } else {
      dispatch({
        type: UserActionType.SIGNUP_FAIL,
      });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const ActiveUser =
  (payload: any, navigate: NavigateFunction): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: UserActionType.ACTIVE_USER_PENDING,
    });

    const api = API_URLS.USER.activeUser(payload.email);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      dispatch({
        type: UserActionType.ACTIVE_USER_SUCCESS,
      });
      navigate(ROUTER.AUTH.LOGIN);
    } else {
      dispatch({
        type: UserActionType.ACTIVE_USER_FAIL,
      });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const ForgotPassword =
  (payload: any, navigate: NavigateFunction): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: UserActionType.FORGOT_PASSWORD_PENDING,
    });

    const api = API_URLS.USER.forgotPassword(payload.email);

    const { response, error } = await useCallApi({ ...api });

    if (!error) {
      dispatch({
        type: UserActionType.FORGOT_PASSWORD_SUCCESS,
      });
      renderNotification('Thông báo', 'Kiểm tra Email của bạn để khôi phục mật khẩu', notiType.SUCCESS);
    } else {
      dispatch({
        type: UserActionType.FORGOT_PASSWORD_FAIL,
      });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const ResetPassword =
  (payload: any, navigate: NavigateFunction): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: UserActionType.RESET_PASSWORD_PENDING });

    const api = API_URLS.USER.resetPassword(payload.token, payload.pass, payload.confirmPass);

    const { response, error } = await useCallApi({ ...api });

    if (!error) {
      dispatch({
        type: UserActionType.RESET_PASSWORD_SUCCESS,
      });
      renderNotification('Thông báo', 'Khôi phục mật khẩu thành công', notiType.SUCCESS);
      navigate(ROUTER.AUTH.LOGIN);
    } else {
      dispatch({
        type: UserActionType.RESET_PASSWORD_FAIL,
      });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const GetProfile =
  (cb?: Callback): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: UserActionType.GET_PROFILE_PENDING });

    const api = API_URLS.USER.getProfile();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: UserActionType.GET_PROFILE_SUCCESS,
        payload: data,
      });
      cb?.onSuccess?.(data);
    } else {
      dispatch({
        type: UserActionType.GET_PROFILE_FAIL,
      });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const UpdateProfile =
  (payload: UpdateProfilePayload, cb?: Callback): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: UserActionType.UPDATE_PROFILE_PENDING });

    const api = API_URLS.USER.updateProfile();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      const { data } = response.data;
      dispatch({
        type: UserActionType.UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
      cb?.onSuccess?.(data);
      renderNotification('Thông báo', 'Cập nhật tài khoản thành công', notiType.SUCCESS);
    } else {
      dispatch({
        type: UserActionType.UPDATE_PROFILE_FAIL,
      });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const UserAction = {
  Login,
  SignUp,
  ActiveUser,
  ForgotPassword,
  ResetPassword,
  GetProfile,
  UpdateProfile,
};
