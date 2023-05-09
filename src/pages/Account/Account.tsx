import { Col, Grid, Tabs, createStyles, Text } from '@mantine/core';
import _ from 'lodash';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getRouterByTabValue } from '../../utils/helpers';

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

interface OptionProps {
  label: string;
  value: string;
}

const tabArray: OptionProps[] = [
  {
    label: 'Thông tin cá nhân',
    value: 'info',
  },
  {
    label: 'Danh sách đơn hàng',
    value: 'orders',
  },
];

const Account = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const startIndex = path.indexOf('/', path.indexOf('/') + 1) + 1;
  const tabValue = path.substring(startIndex);

  return (
    <Grid>
      <Col xs={0} md={2} className={classes.hiddenMobile}>
        <Tabs value={tabValue} orientation="vertical" onTabChange={(value) => navigate(getRouterByTabValue(value))}>
          <Tabs.List w={'100%'}>
            {tabArray.map((tab, index) => (
              <Tabs.Tab key={index} value={tab.value} color="black">
                <Text size={'md'} weight={'bold'}>
                  {tab.label}
                </Text>
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </Col>
      <Col xs={12} md={10}>
        <Outlet />
      </Col>
    </Grid>
  );
};

export default Account;
