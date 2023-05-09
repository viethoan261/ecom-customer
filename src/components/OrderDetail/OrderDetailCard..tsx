import { Card, Col, Divider, Grid, Group, Text, Image, AspectRatio, Stack, Button, Modal } from '@mantine/core';
import { Order, OrderStatus } from '../../types/models/Order';
import { formatCurrency, parserOrderStatus } from '../../utils/helpers';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { OrderAction } from '../../reducers/order/order.action';
import { useDisclosure } from '@mantine/hooks';
import { ReviewModal } from '../ReviewModal/ReviewModal';

interface Props {
  order: Order | null;
}

export const OrderDetailCard = ({ order }: Props) => {

  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);

  const handleCancelOrder = () => {
    if (!order?.orderID) {
      return;
    }
    dispatch(
      OrderAction.CancelOrder(order?.orderID, {
        onSuccess: () => dispatch(OrderAction.GetOrder()),
      })
    );
  };

  const renderButton = (status: OrderStatus | undefined) => {
    switch (status) {
      case undefined:
      case OrderStatus.CANCELLED:
        return null;
      case OrderStatus.DELIVERING:
        return null;
      case OrderStatus.DELIVERED:
        if ( order?.reviews.length === 0) {
          return <Button onClick={open}>Đánh giá</Button>;
        } else return null;
      case OrderStatus.PENDING:
        return <Button onClick={handleCancelOrder}>Huỷ đơn</Button>;
    }
  };

  return (
    <>
      <Card withBorder py={'xs'} mt={15}>
        <Card.Section>
          <Group position={'right'}>
            <Text mt={'md'} mr={'md'}>
              {parserOrderStatus(order?.status)}
            </Text>
          </Group>
        </Card.Section>
        <Divider my={10} />
        {order?.products.map((product, id) => (
          <Grid>
            <Col span={4} lg={1}>
              <AspectRatio ratio={1 / 1} w={'100%'}>
                <Image width={'100%'} src={product.imagePath} withPlaceholder />
              </AspectRatio>
            </Col>
            <Col span={6} lg={9}>
              <Stack spacing={0}>
                <Text>{product.name}</Text>
                <Text size={'xs'} c={'gray'}>
                  {product.size} / {product.color}
                </Text>
                <Text>x {product.quantity}</Text>
              </Stack>
            </Col>
            <Col span={1} lg={2}>
              <Stack h={'100%'} justify={'flex-end'}>
                <Text align="right">{formatCurrency(product.price)}</Text>
              </Stack>
            </Col>
          </Grid>
        ))}
        <Divider my={10} />
        <Group position="right">
          <Text size={'lg'} align="right">
            {`Thành tiền: ${formatCurrency(order?.price)}`}
          </Text>
        </Group>
        <Group position="right" mt={10}>
          {renderButton(order?.status)}
        </Group>
      </Card>

      <Modal centered opened={opened} onClose={close} title="Đánh giá sản phẩm">
        <ReviewModal products={order?.products} orderID={order?.orderID} closeModal={close} />
      </Modal>
    </>
  );
};
