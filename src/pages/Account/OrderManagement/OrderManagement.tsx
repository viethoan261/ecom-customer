import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { OrderDetailCard } from '../../../components/OrderDetail/OrderDetailCard.';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { OrderAction } from '../../../reducers/order/order.action';
import { RootState } from '../../../redux/reducer';
import { OrderStatus } from '../../../types/models/Order';
import { Center, Tabs, Text } from '@mantine/core';
import { parserOrderStatus } from '../../../utils/helpers';

const OrderManagement = () => {
  const dispatch = useAppDispatch();

  const [selectedTab, setSelectedTab] = useState<string | null>('ALL');
  const getOrder = () => dispatch(OrderAction.GetOrder());

  useEffect(() => {
    getOrder();
  }, []);

  const { orders, isFetching } = useSelector((state: RootState) => state.order);

  const filteredOrders = (() => {
    switch (selectedTab) {
      case 'ALL':
        return orders;
      case OrderStatus.PENDING:
        return orders.filter((order) => order.status === OrderStatus.PENDING);
      case OrderStatus.DELIVERED:
        return orders.filter((order) => order.status === OrderStatus.DELIVERED);
      case OrderStatus.CANCELLED:
        return orders.filter((order) => order.status === OrderStatus.CANCELLED);
      case OrderStatus.DELIVERING:
        return orders.filter((order) => order.status === OrderStatus.DELIVERING);
      default:
        return [];
    }
  })();

  return (
    <Tabs mt={10} value={selectedTab} onTabChange={setSelectedTab}>
      <Tabs.List>
        <Tabs.Tab value={'ALL'}>{'TẤT CẢ'}</Tabs.Tab>
        <Tabs.Tab value={OrderStatus.PENDING}>{parserOrderStatus(OrderStatus.PENDING)}</Tabs.Tab>
        <Tabs.Tab value={OrderStatus.DELIVERING}>{parserOrderStatus(OrderStatus.DELIVERING)}</Tabs.Tab>
        <Tabs.Tab value={OrderStatus.DELIVERED}>{parserOrderStatus(OrderStatus.DELIVERED)}</Tabs.Tab>
        <Tabs.Tab value={OrderStatus.CANCELLED}>{parserOrderStatus(OrderStatus.CANCELLED)}</Tabs.Tab>
      </Tabs.List>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order, index) => <OrderDetailCard order={order} key={index} />)
      ) : (
        <Center mt={20}>
          <Text weight={'bold'}>Không có đơn hàng nào</Text>
        </Center>
      )}
    </Tabs>
  );
};

export default OrderManagement;
