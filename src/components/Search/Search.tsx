import { Button, Card, Center, Flex, Group, Select, Stack, Text, TextInput, createStyles } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDebouncedState, useDebouncedValue } from '@mantine/hooks';
import { SearchPopup } from './SearchPopup';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ProductAction } from '../../reducers/product/product.actions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';

const useStyles = createStyles((theme) => ({
  keyword: {
    hiddenMobile: {
      [theme.fn.smallerThan('sm')]: {
        overflowX: 'scroll',
      },
    },

    hiddenDesktop: {
      [theme.fn.largerThan('sm')]: {
        width: 300,
      },
    },
  },
}));

const Search = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [value, setValue] = useState('');

  const SearchProduct = (value: string) => {
    dispatch(
      ProductAction.SearchProduct({
        productName: value,
        categoryId: 0,
      })
    );
  };
  useEffect(() => SearchProduct(value), [value]);

  const products = useSelector((state: RootState) => state.products.products);

  const recommendList: string[] = ['Chạy bộ', 'Quần đi biển', 'Polo', 'Quần Kaki', 'Áo Sơ Mi'];

  return (
    <Center my={50}>
      <Stack>
        <Center>
          <Text weight={'bolder'} size={34}>
            Bạn tìm gì hôm nay?
          </Text>
        </Center>
        <Stack sx={{ position: 'relative' }}>
          <TextInput
            placeholder="Nhập từ khoá "
            radius="lg"
            size="md"
            w={'100%'}
            icon={<IconSearch />}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
          {value !== '' ? <SearchPopup productList={products} searchValue={value} /> : null}
        </Stack>
        <Center>
          <Text weight={500} size={'sm'}>
            Từ khoá nổi bật
          </Text>
        </Center>
        <Group w={'100%'} align={'center'} className={classes.keyword}>
          {recommendList.map((item, index) => (
            <Card
              withBorder
              py={5}
              radius={'lg'}
              sx={{ cursor: 'pointer' }}
              key={index}
              miw={'fit-content'}
              onClick={() => setValue(item)}
            >
              <Text size={'xs'}>{item}</Text>
            </Card>
          ))}
        </Group>
      </Stack>
    </Center>
  );
};

export default Search;
