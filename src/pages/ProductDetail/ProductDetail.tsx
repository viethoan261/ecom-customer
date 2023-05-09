import React from 'react';
import { Product, Sizes } from '../../types/models/Product';
import {
  Col,
  Grid,
  Image,
  Group,
  Text,
  Badge,
  Divider,
  Stack,
  NumberInput,
  NumberInputHandlers,
  Button,
  ActionIcon,
  Center,
  Container,
  Paper,
  createStyles,
} from '@mantine/core';
import { faker } from '@faker-js/faker';
import { formatCurrency, getColorsOfProduct, notiType, renderNotification, requireLogin } from '../../utils/helpers';

import { ReviewCard } from '../../components/ReviewModal/ReviewCard';
import { useEffect, useRef, useState } from 'react';
import { IconShoppingCart } from '@tabler/icons-react';
import { ColorSelector } from '../../components/Product/ColorSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URLS } from '../../config/constants/api';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ProductAction } from '../../reducers/product/product.actions';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { SizesRender } from './SizesRender';
import { addCartPayload } from '../../types/helpers/payload';
import { CartAction } from '../../reducers/cart/cart.action';
import _ from 'lodash';

const useStyles = createStyles((theme) => ({
  image: {
    [theme.fn.smallerThan('sm')]: {},
    [theme.fn.largerThan('sm')]: {
      width: '672',
      height: '990',
    },
  },
  width: {
    [theme.fn.smallerThan('sm')]: { width: '100%' },
    [theme.fn.largerThan('sm')]: {
      width: '90%',
    },
  },
}));
const ProductDetail = () => {
  const { classes } = useStyles();

  const [value, setValue] = useState<any>(1);
  const handlers = useRef<NumberInputHandlers>(null);

  const productId = useParams().id;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ProductAction.GetProductById(parseInt(productId || '')));
  }, []);

  const product = useSelector((state: RootState) => state.products.productById);

  const colors = getColorsOfProduct(product?.properties);

  const [colorSelect, setColorSelect] = useState(colors[0]);

  const isColorSelected = (color: string) => {
    if (!colors) return false;
    const bool = colorSelect === color ? true : false;
    return bool;
  };
  const getColorImagePath = (color: string) => {
    const item = product?.properties.find((item) => item.color === color);
    return item ? item.imagePath : null;
  };

  const getSizesByColor = (color: string) => {
    const sizes = new Set();
    product?.properties.forEach((item) => {
      if (item.color === color && item.quantity > 0) {
        sizes.add(item.size);
      }
    });
    return [...sizes];
  };
  const [sizeSelected, setSizeSelected] = useState<string | ''>();

  const getQuantityByColorAndSize = (color: string | null, size: string | undefined) => {
    const itemsWithColorSize = _.filter(product?.properties, { color: color, size: size });
    const totalQuantity = _.sumBy(itemsWithColorSize, 'quantity');
    return totalQuantity;
  };

  const handleSelectColor = (color: string) => {
    setColorSelect(color);
    setSizeSelected(getSizesByColor(color)[0] as string);
  };

  const hanleAddToCart = () => {
    if (product?.id) {
      if (sizeSelected) {
        const payload: addCartPayload = {
          productId: product.id,
          quantity: value,
          size: sizeSelected,
          color: colorSelect,
        };

        if (!colorSelect) {
          renderNotification('Thông báo', 'Vui lòng chọn màu cho sản phẩm', notiType.ERROR);
          return;
        }
        if (value < 1) {
          renderNotification('Thông báo', 'Vui lòng chọn số lượng', notiType.ERROR);
          return;
        }
        requireLogin(
          {
            onSuccess: () => {
              dispatch(
                CartAction.AddCart(payload, {
                  onSuccess: () => dispatch(CartAction.GetCart()),
                })
              );
            },
          },
          navigate
        );
      } else {
        renderNotification('Thông báo', 'Vui lòng chọn kích thước cho sản phẩm', notiType.ERROR);
      }
    }
  };

  if (product)
    return (
      <>
        <Center className={classes.width}>
          <Grid w={'100%'}>
            <Col
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              xs={12}
              sm={12}
              md={6}
              lg={7}
              xl={7}
            >
              <Image
                className={classes.image}
                radius="lg"
                fit="contain"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                src={getColorImagePath(colorSelect) || getColorImagePath(colors[0])}
                withPlaceholder
              ></Image>
            </Col>
            <Col xs={12} sm={12} md={6} lg={5} xl={5}>
              <Stack>
                <Text weight={600} size={32}>
                  {product?.name}
                </Text>
                <Text size={'lg'}>{formatCurrency(product?.price)}</Text>
                <Text size={'lg'}>Màu sắc:</Text>
                <Group>
                  {colors?.map((color, index) => (
                    <ColorSelector
                      key={index}
                      color={color}
                      isSelected={isColorSelected(color)}
                      onClick={() => handleSelectColor(color)}
                    />
                  ))}
                </Group>
                <Text size={'lg'}>Kích thước:</Text>
                <Group>
                  <SizesRender
                    availableSizes={getSizesByColor(colorSelect || colors[0]) as string[]}
                    sizeSelected={sizeSelected}
                    setSizeSelected={setSizeSelected}
                  />
                </Group>

                <Grid align="center">
                  <Col xs={4} md={4}>
                    <Group spacing={3}>
                      <ActionIcon
                        size={32}
                        radius="lg"
                        variant="filled"
                        color="dark"
                        onClick={() => handlers?.current?.decrement()}
                      >
                        –
                      </ActionIcon>
                      <NumberInput
                        // size="lg"
                        hideControls
                        value={value}
                        onChange={(val) => setValue(val)}
                        handlersRef={handlers}
                        max={getQuantityByColorAndSize(colorSelect, sizeSelected)}
                        min={1}
                        step={1}
                        styles={{
                          input: { width: 40, textAlign: 'center' },
                        }}
                        radius="lg"
                      />
                      <ActionIcon
                        size={32}
                        radius="lg"
                        variant="filled"
                        color="dark"
                        onClick={() => handlers?.current?.increment()}
                      >
                        +
                      </ActionIcon>
                    </Group>
                  </Col>
                  <Col xs={8} md={8}>
                    <Button w={'100%'} leftIcon={<IconShoppingCart />} radius={'md'} onClick={hanleAddToCart}>
                      <Text size={'sm'}>Thêm vào giỏ hàng</Text>
                    </Button>
                  </Col>
                </Grid>
                <Divider orientation={'horizontal'} my={'md'} />
                <Text weight={'bold'} size={'md'}>
                  Đặc điểm nổi bật
                </Text>
                <Text size={'md'}>- {product.description}</Text>
              </Stack>
            </Col>
          </Grid>
        </Center>

        <Divider mt={80} />
        {product.reviews.length > 0 ? (
          <Center w={'90%'}>
            <Grid w={'100%'}>
              <Col span={12}>
                <Text weight={'bolder'} size={26} mt={20}>
                  {product.reviews.length} Đánh giá
                </Text>
              </Col>
              {product.reviews.map((review, index) => (
                <Col key={index} xs={12} md={6}>
                  <ReviewCard rating={review} />
                </Col>
              ))}
            </Grid>
          </Center>
        ) : (
          <Center mt={'md'}>
            <Text weight={'bold'} size={'lg'}>
              Sản phẩm chưa có đánh giá nào
            </Text>
          </Center>
        )}
      </>
    );
  else return null;
};

export default ProductDetail;
