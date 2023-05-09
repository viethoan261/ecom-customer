import { Card, Col, Grid, Text, TextInput, Button, MediaQuery, BackgroundImage, Box, Center } from '@mantine/core';
import { useForm, isEmail, isNotEmpty } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../../config/router';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { UserAction } from '../../reducers/user/user.action';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Bạn cần nhập email hợp lệ') && isNotEmpty('Bạn chưa nhập tên email'),
    },
  });

  const handleSubmit = (values: any) => {
    dispatch(UserAction.ForgotPassword({ email: values.email }, navigate));
  };

  return (
    <Center>
      <Card withBorder padding="xl" radius="lg" shadow="xl" w={360}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Col span={12}>
              <Text align="center" weight={700} size="xl">
                Quên Mật Khẩu
              </Text>
            </Col>
            <Col span={12}>
              <Text align="center" weight={400} size="sm">
                Nhập email của bạn để khôi phục lại mật khẩu
              </Text>
            </Col>

            <Col span={12}>
              <TextInput radius="lg" placeholder="Email" {...form.getInputProps('email')}></TextInput>
            </Col>

            <Col sx={{ marginTop: '10px' }} span={12}>
              <Button type="submit" fullWidth color="dark" radius="lg">
                Lấy lại mật khẩu
              </Button>
            </Col>
          </Grid>
        </form>
      </Card>
    </Center>
  );
};

export default ForgotPassword;
