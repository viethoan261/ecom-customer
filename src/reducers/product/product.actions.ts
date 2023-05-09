import { NavigateFunction } from 'react-router-dom';
import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/helpers';
import { ProductActionType, ProductThunkAction } from './product.types';
import { Product } from '../../types/models/Product';
import { Callback } from '../../types/helpers/callback';
import { CategoryStatus } from '../../types/models/Category';

export interface SearchProductPayload {
  productName: string;
  categoryId: number;
}

const SearchProduct =
  (payload: SearchProductPayload, cb?: Callback): ProductThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: ProductActionType.SEARCH_PRODUCT_PENDING,
    });

    const api = API_URLS.PRODUCT.searchProduct();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: ProductActionType.SEARCH_PRODUCT_SUCCESS,
        payload: data.filter(
          (data: Product) => data.status !== 'INACTIVE' && data.categoryStatus !== CategoryStatus.INACTIVE
        ),
      });
      cb?.onSuccess?.(
        data.filter((data: Product) => data.status !== 'INACTIVE' && data.categoryStatus !== CategoryStatus.INACTIVE)
      );
    } else {
      dispatch({
        type: ProductActionType.SEARCH_PRODUCT_FAIL,
      });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const GetProductById =
  (payload: number): ProductThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: ProductActionType.GET_PRODUCT_BY_ID_PENDING,
    });

    const api = API_URLS.PRODUCT.getProductById(payload);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: ProductActionType.GET_PRODUCT_BY_ID_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: ProductActionType.GET_PRODUCT_BY_ID_FAIL,
      });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const ProductAction = {
  SearchProduct,
  GetProductById,
};
