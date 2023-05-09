import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { addCartPayload, updateCartPayload } from '../../types/helpers/payload';
import { useCallApi } from '../../utils/api';
import { CartActionType, CartThunkAction } from './cart.types';
import { notiType, renderNotification } from '../../utils/helpers';

const AddCart =
  (payload: addCartPayload, cb?: Callback): CartThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: CartActionType.ADD_CART_PENDING,
    });

    const api = API_URLS.CART.addCart();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: CartActionType.ADD_CART_SUCCESS,
      });
      renderNotification('Thông báo', 'Thêm vào giỏ hàng thành công', notiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({
        type: CartActionType.ADD_CART_FAIL,
      });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const GetCart = (): CartThunkAction => async (dispatch: AppDispatch) => {
  dispatch({
    type: CartActionType.GET_CART_PENDING,
  });

  const api = API_URLS.CART.getCart();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    const { data } = response;
    dispatch({
      type: CartActionType.GET_CART_SUCCESS,
      payload: data,
    });
  } else {
    dispatch({
      type: CartActionType.GET_CART_FAIL,
    });
    renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
  }
};

const DeleteCart =
  (payload: number, cb?: Callback): CartThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: CartActionType.DELETE_CART_PENDING,
    });

    const api = API_URLS.CART.deleteCart(payload);

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: CartActionType.DELETE_CART_SUCCESS,
      });
      renderNotification('Thông báo', 'Xoá khỏi giỏ hàng thành công', notiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({
        type: CartActionType.DELETE_CART_FAIL,
      });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const UpdateCart =
  (payload: updateCartPayload, cartDetailID: number, cb?: Callback): CartThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: CartActionType.UPDATE_CART_PENDING,
    });

    const api = API_URLS.CART.updateCart(cartDetailID);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: CartActionType.UPDATE_CART_SUCCESS,
      });
      cb?.onSuccess?.();
    } else {
      dispatch({ type: CartActionType.UPDATE_CART_FAIL });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const CartAction = {
  GetCart,
  AddCart,
  DeleteCart,
  UpdateCart,
};
