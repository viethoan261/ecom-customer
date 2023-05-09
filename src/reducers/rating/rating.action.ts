import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/helpers';
import { RatingActionType, RatingThunkAction } from './rating.types';

const PostRating =
  (payload: any, cb?: Callback): RatingThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: RatingActionType.POST_RATING_PENDING,
    });

    const api = API_URLS.PRODUCT.ratingProduct();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: RatingActionType.POST_RATING_SUCCESS,
      });
      cb?.onSuccess?.();
      renderNotification('Thông báo', 'Đánh giá sản phẩm thành công', notiType.SUCCESS);
    } else {
      dispatch({
        type: RatingActionType.POST_RATING_FAIL,
      });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const RatingAction = {
  PostRating,
};
