import {
  Card,
  Flex,
  Group,
  Image,
  Select,
  Stack,
  Text,
  ActionIcon,
  NumberInputHandlers,
  rem,
  NumberInput,
  Grid,
  Col,
  AspectRatio,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useState, useRef, useEffect } from 'react';
import { ProductInCart } from '../../types/models/Cart';
import { formatCurrency, getColorsOfProduct, notiType, renderNotification } from '../../utils/helpers';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { CartAction } from '../../reducers/cart/cart.action';
import { Colors, Sizes } from '../../types/models/Product';
import _ from 'lodash';
import { updateCartPayload } from '../../types/helpers/payload';

interface Props {
  product: ProductInCart;
}

const useStyles = createStyles((theme) => ({
  title: {
    [theme.fn.smallerThan('sm')]: {
      width: 100,
    },

    [theme.fn.largerThan('sm')]: {
      width: 200,
    },
  },
}));

const CartItemCard = ({ product }: Props) => {
  const { classes } = useStyles();
  const [value, setValue] = useState<number | ''>(product?.quantity);
  const theme = useMantineTheme();

  const colors = getColorsOfProduct(product.properties);

  const [colorSelect, setColorSelect] = useState<string | null>(product.color);

  const getSizesByColor = (color: string) => {
    const sizes = new Set();
    product?.properties.forEach((item) => {
      if (item.color === color && item.quantity > 0) {
        sizes.add(item.size);
      }
    });
    return [...sizes];
  };

  const [sizeSelected, setSizeSelected] = useState<string | null>(product.size);

  const getQuantityByColorAndSize = (color: string | null, size: string | null) => {
    const itemsWithColorSize = _.filter(product.properties, { color: color, size: size });
    const totalQuantity = _.sumBy(itemsWithColorSize, 'quantity');
    return totalQuantity;
  };

  const getColorImagePath = (color: string) => {
    const item = product?.properties.find((item) => item.color === color);
    return item ? item.imagePath : null;
  };

  const dispatch = useAppDispatch();

  const handleDeleteItem = () => {
    dispatch(
      CartAction.DeleteCart(product.cartDetailID, {
        onSuccess: () => {
          dispatch(CartAction.GetCart());
        },
      })
    );
  };

  useEffect(() => {
    if (colorSelect && sizeSelected && value) {
      if (getQuantityByColorAndSize(colorSelect, sizeSelected) < value) {
        return;
      }
      const payload: updateCartPayload = {
        color: colorSelect,
        size: sizeSelected,
        productId: product.productID,
        quantity: value,
        imagePath: colorSelect ? getColorImagePath(colorSelect) : getColorImagePath(colors[0]),
      };
      dispatch(
        CartAction.UpdateCart(payload, product.cartDetailID, {
          onSuccess: () => dispatch(CartAction.GetCart()),
        })
      );
    } else {
      return;
    }
  }, [colorSelect, sizeSelected, value]);


  return (
    <Card mt={10}>
      <Grid>
        <Col span={5} md={5}>
          <AspectRatio ratio={126 / 186} maw={200}>
            <Image
              withPlaceholder
              src={colorSelect ? getColorImagePath(colorSelect) : getColorImagePath(colors[0])}
              radius={'md'}
            />
          </AspectRatio>
        </Col>
        <Col span={7} md={7}>
          <Stack justify="space-between" h={'100%'}>
            <Stack>
              <Group position="apart" align={'flex-start'}>
                <Text size={'sm'} weight={'bold'} className={classes.title}>
                  {product?.name}
                </Text>
                <IconX cursor={'pointer'} onClick={handleDeleteItem} />
              </Group>
              <Text size={'sm'}>
                {product?.color} / {product?.size}
              </Text>
            </Stack>

            <div>
              <Group mb={10}>
                <Select
                  w={85}
                  size="xs"
                  radius={'md'}
                  data={colors.map((color) => ({
                    value: color,
                    label: color,
                  }))}
                  value={colorSelect}
                  onChange={setColorSelect}
                />
                <Select
                  w={55}
                  size="xs"
                  radius={'md'}
                  data={(getSizesByColor(colorSelect || product.color) as string[]).map((size: string) => ({
                    value: size,
                    label: size,
                  }))}
                  value={sizeSelected}
                  onChange={setSizeSelected}
                />
              </Group>

              <Group position="apart">
                <NumberInput
                  size="xs"
                  w={80}
                  value={value}
                  onChange={setValue}
                  min={1}
                  max={getQuantityByColorAndSize(colorSelect, sizeSelected)}
                  step={1}
                  error={
                    value == ''
                      ? ''
                      : !getSizesByColor(colorSelect || product.color).includes(sizeSelected)
                      ? 'Sản phẩm hiện đang không có size này, vui lòng chọn size khác'
                      : value > getQuantityByColorAndSize(colorSelect, sizeSelected)
                      ? 'Sản phẩm hiện đang không đủ số lượng bạn cần'
                      : value < 1
                      ? 'Số lượng phải lớn hơn 0'
                      : null
                  }
                />
                <Text size={'sm'}>{formatCurrency(product.price)}</Text>
              </Group>
            </div>
          </Stack>
        </Col>
      </Grid>
    </Card>
  );
};

export default CartItemCard;
