import { useMantineTheme } from '@mantine/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../config/router';
import AppLayout from '../containers/AppLayout';
import AuthLayout from '../containers/AuthLayout/AuthLayout';
import { useAppDispatch } from '../hooks/use-app-dispatch';
import { UserAction } from '../reducers/user/user.action';
import { RootState } from '../redux/reducer';
import { checkLogin } from '../utils/helpers';
import ActiveUser from './ActiveUser/ActiveUser';

const Login = React.lazy(() => import('./Login'));
const SignUp = React.lazy(() => import('./SignUp'));
const ForgotPassword = React.lazy(() => import('./ForgotPassword'));
const ResetPassword = React.lazy(() => import('./ResetPassword'));

const Home = React.lazy(() => import('./Home'));
const ProductDetail = React.lazy(() => import('./ProductDetail'));
const Cart = React.lazy(() => import('./Cart'));
const ProductsList = React.lazy(() => import('./ProductsList'));
const AccountLayout = React.lazy(() => import('./Account'));
const UserInfo = React.lazy(() => import('./Account/UserInfo/UserInfo'));
const OrderManagement = React.lazy(() => import('./Account/OrderManagement/OrderManagement'));
const Category = React.lazy(() => import('./Category'));

const _404NotFound = React.lazy(() => import('../components/common/_404NotFound'));

const AppRoutes: React.FC = () => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (checkLogin()) {
      dispatch(UserAction.GetProfile());
    }
  }, []);
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTER.AUTH.LOGIN} element={<Login />} />
        <Route path={ROUTER.AUTH.SIGNUP} element={<SignUp />} />

        <Route path={ROUTER.AUTH.FORGOTPASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTER.AUTH.RESETPASSWORD} element={<ResetPassword />} />
      </Route>
      <Route path={ROUTER.AUTH.ACTIVE_USER} element={<ActiveUser />} />
      <Route element={<AppLayout />}>
        <Route path={ROUTER.CART.INDEX} element={<Cart user={user} />} />
        <Route element={<AccountLayout />}>
          <Route path={ROUTER.PROFILE.INFO} element={<UserInfo user={user} />} />
          <Route path={ROUTER.PROFILE.ORDERS} element={<OrderManagement />} />
          <Route path={ROUTER.PROFILE.VOUCHER_WALLET} element={null} />
        </Route>
        <Route path={ROUTER.PRODUCT.PRODUCT_DETAILS} element={<ProductDetail />} />
        <Route path={ROUTER.PRODUCT.ALL_PRODUCTS} element={<ProductsList />} />
        <Route path={ROUTER.PRODUCT.ALL_PRODUCTS_BY_CATE} element={<Category />} />
        <Route path={ROUTER.HOME.INDEX} element={<Home />} />
        <Route path="*" element={<_404NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
