import React, { useEffect, useState } from 'react';

import ProductCard from '../../components/Product/ProductCard';
import {
  Button,
  Center,
  Col,
  Divider,
  Flex,
  Grid,
  Group,
  Input,
  Select,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { CategoryAction } from '../../reducers/category/category.action';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { ProductAction } from '../../reducers/product/product.actions';
import { useLocation } from 'react-router-dom';
import { useDebouncedState } from '@mantine/hooks';
import { Category } from '../../types/models/Category';

const useStyles = createStyles((theme) => ({
  search: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
    [theme.fn.largerThan('sm')]: {
      width: 300,
    },
  },

  cateSelect: {
    [theme.fn.smallerThan('sm')]: {
      overflow: 'scroll',
    },
  },
}));

const ProductsList = () => {
  const { classes } = useStyles();

  const state = useLocation().state;

  const [selectedCate, setSelectedCate] = useState(0);
  const [search, setSearch] = useDebouncedState('', 300);

  const dispatch = useAppDispatch();

  const getAllProducts = () => {
    dispatch(
      ProductAction.SearchProduct({
        productName: search,
        categoryId: selectedCate,
      })
    );
  };

  useEffect(() => {
    getAllProducts();
  }, [search, selectedCate]);

  const { categories, isFetching } = useSelector((state: RootState) => state.categories);
  const { products } = useSelector((state: RootState) => state.products);
  const parentsCategories = categories?.filter((category) => category.categoryParentID === 0);

  const handleSelectCategory = (categoryId: number) => {
    // dispatch(
    //   ProductAction.SearchProduct({
    //     productName: search,
    //     categoryId: categoryId,
    //   })
    // );
    setSelectedCate(categoryId);
  };

  const isSelectedCate = (categoryId: number) => {
    if (categoryId == selectedCate) return true;
    return false;
  };

  return (
    <>
      <Text size={28} weight={'bolder'} my={20}>
        Danh mục sản phẩm
      </Text>
      <Group mb={15} align="center" position="apart">
        <Flex className={classes.cateSelect} gap={'sm'}>
          <Button
            radius={'lg'}
            variant={isSelectedCate(0) ? '' : 'light'}
            miw={100}
            onClick={() => handleSelectCategory(0)}
            sx={isSelectedCate(0) ? { background: 'black', color: 'white' } : undefined}
          >
            Tất cả
          </Button>
          {parentsCategories?.map((category, index) => (
            <Button
              key={index}
              radius={'lg'}
              variant={isSelectedCate(category.id) ? '' : 'light'}
              miw={100}
              onClick={() => handleSelectCategory(category.id)}
              sx={isSelectedCate(category.id) ? { background: 'black', color: 'white' } : undefined}
            >
              {category.name}
            </Button>
          ))}
        </Flex>
        <TextInput
          icon={<IconSearch />}
          radius={'lg'}
          className={classes.search}
          placeholder={'Nhập từ khoá'}
          defaultValue={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Group>

      {products ? (
        products?.length > 0 ? (
          <Grid mt={20}>
            {products.map((product, index) => (
              <Col key={index} span={6} xs={6} md={3} lg={2.4} mb={20}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Grid>
        ) : (
          <Center mt={50}>
            <Text weight={'bold'} size={'lg'}>
              Không có sản phẩm nào
            </Text>
          </Center>
        )
      ) : null}
    </>
  );
};

export default ProductsList;
