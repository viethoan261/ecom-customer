import { Col, Divider, Grid, Rating, Text } from '@mantine/core';
import { IRating } from '../../types/models/Rating';

interface Props {
  rating: IRating | null;
}

export const ReviewCard = ({ rating }: Props) => {
  return (
    <>
      <Grid>
        <Col span={12} md={4}>
          <Rating value={rating?.score} />
        </Col>
        <Col span={12} md={8}>
          <Text weight={'bold'} size={'sm'}>
            {rating?.author}
          </Text>
          <Text size={'sm'}>{rating?.review}</Text>
        </Col>
      </Grid>
      <Divider my={20} />
    </>
  );
};
