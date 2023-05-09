import { Schemas } from './schemas';
import { SearchProductPayload } from '../../reducers/product/product.actions';

export const HEADERS = {
  header: () => ({
    accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  }),
  authHeader: () => ({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `${localStorage.getItem('token')}`,
  }),
};

export const API_URLS = {
  USER: {
    signup: () => ({
      endPoint: `${Schemas.UserSchema}/Signup`,
      method: 'POST',
      headers: HEADERS.header(),
    }),

    login: () => ({
      endPoint: `${Schemas.UserSchema}/Login`,
      method: 'POST',
      headers: HEADERS.header(),
    }),

    activeUser: (email: string) => ({
      endPoint: `${Schemas.UserSchema}/Active/?email=${email}`,
      method: 'POST',
      headers: HEADERS.header(),
    }),

    forgotPassword: (email: string) => ({
      endPoint: `${Schemas.UserSchema}/ForgotPassword?email=${email}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),

    resetPassword: (token: string, pass: string, confirmPass: string) => ({
      endPoint: `${Schemas.UserSchema}/ResetPassword?token=${token}&pass=${pass}&confirmPass=${confirmPass}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),

    getProfile: () => ({
      endPoint: `${Schemas.UserSchema}/Profile`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),

    updateProfile: () => ({
      endPoint: `${Schemas.UserSchema}/Profile`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
  },

  PRODUCT: {
    searchProduct: () => ({
      endPoint: `${Schemas.ProductSchema}/search`,
      method: 'POST',
      headers: HEADERS.header(),
    }),

    getProductById: (id: number) => ({
      endPoint: `${Schemas.ProductSchema}/${id}/detail`,
      method: 'GET',
      headers: HEADERS.header(),
    }),

    ratingProduct: () => ({
      endPoint: `${Schemas.ProductSchema}/rating`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
  },

  CATEGORY: {
    getAllCategory: () => ({
      endPoint: `${Schemas.CategorySchema}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
  },

  CART: {
    addCart: () => ({
      endPoint: `${Schemas.CartSchema}`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),

    getCart: () => ({
      endPoint: `${Schemas.CartSchema}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),

    deleteCart: (productId: number) => ({
      endPoint: `${Schemas.CartSchema}/${productId}`,
      method: 'DELETE',
      headers: HEADERS.authHeader(),
    }),

    updateCart: (productId: number) => ({
      endPoint: `${Schemas.CartSchema}/${productId}`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
  },

  ORDER: {
    order: () => ({
      endPoint: `${Schemas.OrderSchema}`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),

    getOrder: () => ({
      endPoint: `${Schemas.OrderSchema}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),

    cancelOrder: (id: number) => ({
      endPoint: `${Schemas.OrderSchema}/${id}/status?status=CANCELLED`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
  },
};
