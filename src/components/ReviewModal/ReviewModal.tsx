import { isNotEmpty, useForm } from '@mantine/form';
import { ProductInCart } from '../../types/models/Cart';
import { isEqual } from 'lodash';
import { Rating, Textarea, Grid, Col, AspectRatio, Image, Text, Stack, Group, Button } from '@mantine/core';
import { AddReviewPayload } from '../../types/helpers/payload';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { RatingAction } from '../../reducers/rating/rating.action';
import { OrderAction } from '../../reducers/order/order.action';

interface Props {
  products: ProductInCart[] | undefined;
  orderID: number | undefined;
  closeModal: () => void;
}

export const ReviewModal = ({ products, orderID, closeModal }: Props) => {
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: products?.reduce((acc, product) => {
      return {
        ...acc,
        [product.productDetailID]: {
          score: 5,
          review: '',
        },
      };
    }, {}),
    validate: {},
  });

  const handleSubmitReview = (values: Record<string, AddReviewPayload>) => {
    const rating = Object.entries(values).map(([productDetailID, value]) => {
      return {
        productDetailID: parseInt(productDetailID),
        author: '',
        score: value.score,
        review: value.review,
      };
    });

    const payload = {
      orderID: orderID,
      rating: rating,
    };

    dispatch(
      RatingAction.PostRating(payload, {
        onSuccess: () => {
          closeModal();
          dispatch(OrderAction.GetOrder());
        },
      })
    );
  };

  return (
    <form style={{ marginBottom: '30px' }} onSubmit={form.onSubmit((values) => handleSubmitReview(values))}>
      {products?.map((product) => (
        <div key={product.productDetailID} style={{ marginBottom: '20px' }}>
          <Grid mb={15}>
            <Col span={2}>
              <AspectRatio ratio={1 / 1}>
                <Image width={'100%'} src={product.imagePath} withPlaceholder />
              </AspectRatio>
            </Col>
            <Col span={9}>
              <Stack spacing={0}>
                <Text>{product.name}</Text>
                <Text size={'xs'} c={'gray'}>
                  {product.size} / {product.color}
                </Text>
              </Stack>
            </Col>
          </Grid>
          <Rating {...form.getInputProps(`${product.productDetailID}.score`)} />
          <Textarea
            {...form.getInputProps(`${product.productDetailID}.review`)}
            label="Bình luận"
            placeholder="Để lại bình luận của bạn"
          />
        </div>
      ))}
      <Group position="right" mt={10}>
        <Button type={'submit'}>Hoàn thành</Button>
      </Group>
    </form>
  );
};
