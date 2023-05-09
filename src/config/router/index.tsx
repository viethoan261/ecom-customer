const ROUTER = {
  HOME: {
    INDEX: '/',
  },
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOTPASSWORD: '/forgot-password',
    RESETPASSWORD: '/reset-password',
    ACTIVE_USER: '/active-user',
  },
  PROFILE: {
    ORDER: '/order',
    INFO: '/profile/info',
    ORDERS: '/profile/orders',
    VOUCHER_WALLET: '/profile/voucher-wallet',
  },
  CART: {
    INDEX: '/cart',
  },
  PRODUCT: {
    INDEX: '/product',
    ALL_PRODUCTS: '/all-products',
    ALL_PRODUCTS_BY_CATE: '/all-products/:categoryId',
    PRODUCT_DETAILS: '/product/:id',
  },
  CATEGORY: {
    INDEX: '/category',
  },
};

export default ROUTER;
