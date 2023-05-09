import { Center, Col, Grid, Group, Menu, Select, Text, TextInput, createStyles } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconFilter, IconSearch } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/Product/ProductCard';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ProductAction } from '../../reducers/product/product.actions';
import { RootState } from '../../redux/reducer';
import { Product } from '../../types/models/Product';

const useStyle = createStyles((theme) => ({
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

const Category = () => {
  const { classes } = useStyle();

  const categoryId = useParams().categoryId || '';

  const { categories } = useSelector((state: RootState) => state.categories);

  const childrenCate = categories?.filter((cate) => cate.categoryParentID == parseInt(categoryId));
  childrenCate?.unshift({
    id: parseInt(categoryId),
    name: 'Tất cả',
  });

  const [search, setSearch] = useDebouncedState('', 300);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    childrenCate ? childrenCate[0]?.id.toString() : ''
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      ProductAction.SearchProduct({
        productName: search,
        categoryId: selectedCategory ? parseInt(selectedCategory) : parseInt(categoryId),
      })
    );
  }, [search, selectedCategory]);

  const { products, isFetching } = useSelector((state: RootState) => state.products);

  return (
    <>
      <Group>
        <TextInput
          icon={<IconSearch />}
          radius={'md'}
          w={300}
          placeholder={'Nhập từ khoá'}
          defaultValue={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        {childrenCate ? (
          <>
            <Select
              data={childrenCate?.map((category) => ({
                value: category.id.toString(),
                label: category.name,
              }))}
              radius={'md'}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Chọn danh mục"
              className={classes.hiddenMobile}
            />
            <Menu>
              <Menu.Target>
                <IconFilter className={classes.hiddenDesktop} />
              </Menu.Target>
              <Menu.Dropdown>
                {childrenCate.map((cate, index) => (
                  <Menu.Item onClick={() => setSelectedCategory(cate.id.toString())}>{cate.name}</Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </>
        ) : null}
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

export default Category;
