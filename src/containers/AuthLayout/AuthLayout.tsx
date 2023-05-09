import { LoadingOverlay } from '@mantine/core';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { BackgroundImage, Box, Grid, MediaQuery, Stack } from '@mantine/core';
import bg from '../../assets/images/bg.png';

const AuthLayout = () => {
  return (
    <Suspense fallback={<LoadingOverlay visible />}>
      <Grid style={{ width: '100vw' }} align="center" justify="center">
        <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
          <Grid.Col p={0} md={7}>
            <BackgroundImage src={bg}>
              <Box
                sx={{
                  minHeight: '100vh',
                  maxHeight: '100vh',
                }}
              ></Box>
            </BackgroundImage>
          </Grid.Col>
        </MediaQuery>
        <Grid.Col xs={12} md={5}>
          <Stack spacing="xs">{<Outlet />}</Stack>
        </Grid.Col>
      </Grid>
    </Suspense>
  );
};

export default AuthLayout;
