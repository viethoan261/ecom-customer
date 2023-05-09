import {
  Card,
  Col,
  Grid,
  Text,
  TextInput,
  Button,
  MediaQuery,
  BackgroundImage,
  Box,
  Center,
  Group,
} from '@mantine/core';
import React from 'react';
import { useForm, isEmail, isNotEmpty } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../../config/router';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { UserAction } from '../../reducers/user/user.action';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: isNotEmpty('Bạn chưa nhập tên email'),
      password: isNotEmpty('Bạn chưa nhập mật khẩu'),
    },
  });

  const handleSubmit = (values: any) => {
    dispatch(
      UserAction.Login(
        {
          username: values.username,
          password: values.password,
        },
        navigate
      )
    );
  };

  return (
    <Center>
      <Card withBorder padding="xl" radius="lg" shadow="xl" w={360}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Col span={12}>
              <Text align="center" weight={700} size="xl">
                Đăng Nhập
              </Text>
            </Col>

            <Col span={12}>
              <TextInput
                radius="lg"
                placeholder="Tên đăng nhập"
                label="Tên đăng nhập"
                {...form.getInputProps('username')}
              ></TextInput>
            </Col>
            <Col span={12}>
              <TextInput
                radius="lg"
                placeholder="Mật khẩu"
                label="Mật khẩu"
                {...form.getInputProps('password')}
                type="password"
              ></TextInput>
            </Col>
            <Col sx={{ marginTop: '10px' }} span={12}>
              <Button type="submit" fullWidth color="dark" radius="lg">
                Đăng nhập
              </Button>
            </Col>
            <Col span={12}>
              <Group position={'apart'}>
                <Text onClick={() => navigate(ROUTER.AUTH.SIGNUP)} sx={{ cursor: 'pointer' }}>
                  Đăng ký
                </Text>
                <Text onClick={() => navigate(ROUTER.AUTH.FORGOTPASSWORD)} sx={{ cursor: 'pointer' }}>
                  Quên mật khẩu
                </Text>
              </Group>
            </Col>
          </Grid>
        </form>
      </Card>
    </Center>
  );
};

export default Login;
