import { Col, Grid, Text } from '@mantine/core';
import { IconSearch, IconPackage, IconCash, IconHeart } from '@tabler/icons-react';

import FeatureCard from './FeatureCard';

const Features = ({ title, subTitle }: { title: string; subTitle: string }) => {
  const features = [
    {
      id: 1,
      title: 'Tìm kiếm mọi thứ bạn cần một cách dễ dàng',
      icon: <IconSearch size="70" color="#84C8FF" />,
    },
    {
      id: 2,
      title: 'Quy trình đóng gói, vận chuyển chỉn chu',
      icon: <IconPackage size="70" color="#FFCC84" />,
    },
    {
      id: 3,
      title: 'Giá cả hợp lý và tiết kiệm',
      icon: <IconCash size="70" color="#C4FEB4" />,
    },
    {
      id: 4,
      title: 'Chăm sóc khách hàng tận tình',
      icon: <IconHeart size="70" color="#FF8484" />,
    },
  ];

  return (
    <div style={{ margin: '50px 0' }}>
      <Text align="center" weight={700} sx={{ fontSize: '30px' }}>
        {title}
      </Text>
      <Text size="xl" align="center">
        {subTitle}
      </Text>
      <Grid sx={{ marginTop: '20px' }}>
        {features.map((feature) => {
          return (
            <Col key={feature.id} xs={12} sm={6} md={6} lg={6} xl={3}>
              <FeatureCard title={feature.title} icon={feature.icon} textColor="white" backgroundColor="black" />
            </Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default Features;
