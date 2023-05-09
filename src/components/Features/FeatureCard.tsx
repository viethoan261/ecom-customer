import { Card, Text } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

interface Props {
  title: string;
  icon: any;
  backgroundColor: string;
  textColor: string;
}

const FeatureCard: React.FC<Props> = ({ title, icon }) => {
  return (
    <Card shadow="xs" padding="xl" withBorder radius="lg" h={'100%'}>
      <Text align="center">{icon}</Text>
      <Text size="xl" weight={700} align="center">
        {title}
      </Text>
    </Card>
  );
};

export default FeatureCard;
