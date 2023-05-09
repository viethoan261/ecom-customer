import { Reducer, combineReducers } from 'redux';
import userReducer from '../reducers/user/user.reducer';
import categoryReducer from '../reducers/category/category.reducer';
import productReducer from '../reducers/product/product.reducer';
import cartReducer from '../reducers/cart/cart.reducer';
import orderReducer from '../reducers/order/order.reducer';
import ratingReducer from '../reducers/rating/rating.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  rating: ratingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const reducer: Reducer<RootState, any> = (state: RootState | undefined, action: any) => rootReducer(state, action);

export default reducer;
