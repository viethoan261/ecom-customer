import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import ROUTER from '../../config/router';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { UserAction } from '../../reducers/user/user.action';
import { Center, Loader, Space, Stack, Text } from '@mantine/core';

const ActiveUser = () => {
  const location = useLocation().search;
  const email = _.chain(location).split('=').last().value();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(3);

  useEffect(() => {
    if (!email) return;
    else {
      let timeLeft = remainingTime;
      const intervalId = setInterval(() => {
        timeLeft -= 1;
        setRemainingTime(timeLeft);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
        dispatch(UserAction.ActiveUser({ email: email }, navigate));
      }, remainingTime * 1000);
    }
  }, []);

  return (
    <Center>
      <Stack align="center">
        <Space />
        <Loader color="orange.9" />
        <Text>Kích hoạt tài khoản lần đầu thành công</Text>
        <Stack spacing="sm">
          <Text>
            Đang chuyển hướng đến trang đăng nhập trong{' '}
            <Text span inherit color="red" fw={700}>
              {remainingTime}
            </Text>
            &nbsp; giây
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
};

export default ActiveUser;
