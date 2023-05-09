import { NavigateFunction } from 'react-router-dom';
import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/helpers';
import { CategoryActionType, CategoryThunkAction } from './category.type';
import { Category } from '../../types/models/Category';

const GetAllCategory = (): CategoryThunkAction => async (dispatch: AppDispatch) => {
  dispatch({
    type: CategoryActionType.GET_ALL_CATEGORIES_PENDING,
  });

  const api = API_URLS.CATEGORY.getAllCategory();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    const { data } = response;
    dispatch({
      type: CategoryActionType.GET_ALL_CATEGORIES_SUCCESS,
      payload: data.filter((category: Category) => category.status !== 'INACTIVE'),
    });
  } else {
    dispatch({
      type: CategoryActionType.GET_ALL_CATEGORIES_FAIL,
    });
    renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
  }
};

export const CategoryAction = {
  GetAllCategory,
};
