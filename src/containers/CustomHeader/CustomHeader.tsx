import {
  Badge,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  Header,
  Indicator,
  Menu,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconShirt, IconShoppingCart } from '@tabler/icons-react';
import ROUTER from '../../config/router';
import { useNavigate } from 'react-router-dom';
import User from './User/User';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { checkLogin, getNumberProductInCart } from '../../utils/helpers';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
  },

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

  userIcon: {
    cursor: 'pointer',
  },
}));

const CustomHeader = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const navigate = useNavigate();

  const { categories, isFetching } = useSelector((state: RootState) => state.categories);
  const parentsCategories = categories?.filter((category) => category.categoryParentID === 0);

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />

          <Group onClick={() => navigate(ROUTER.HOME.INDEX)} sx={{ cursor: 'pointer' }}>
            <IconShirt size={30} />
            <Text weight={'bolder'} size={24}>
              ManShop
            </Text>
          </Group>
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <a href={ROUTER.HOME.INDEX} className={classes.link}>
              Trang chủ
            </a>
            <a href={ROUTER.PRODUCT.ALL_PRODUCTS} className={classes.link}>
              Tất cả
            </a>
            {parentsCategories?.map((category, index) => (
              <a key={index} href={`${ROUTER.PRODUCT.ALL_PRODUCTS}/${category.id}`} className={classes.link}>
                {category.name}
              </a>
            ))}
          </Group>

          <Group align="center">
            <User />
            {checkLogin() ? (
              <Indicator color="dark" size={15} label={getNumberProductInCart()} mt={5} radius={'md'}>
                <IconShoppingCart className={classes.userIcon} onClick={() => navigate(ROUTER.CART.INDEX)} />
              </Indicator>
            ) : null}
          </Group>
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        className={classes.hiddenDesktop}
        zIndex={1000000}
        title={
          <Group onClick={() => navigate(ROUTER.HOME.INDEX)} sx={{ cursor: 'pointer' }}>
            <IconShirt size={30} />
            <Text weight={'bolder'} size={24}>
              ManShop
            </Text>
          </Group>
        }
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <a href={ROUTER.HOME.INDEX} className={classes.link}>
            Trang chủ
          </a>
          <a href={ROUTER.PRODUCT.ALL_PRODUCTS} className={classes.link}>
            Tất cả
          </a>
          {parentsCategories?.map((category, index) => (
            <a key={index} href={`${ROUTER.PRODUCT.ALL_PRODUCTS}/${category.id}`} className={classes.link}>
              {category.name}
            </a>
          ))}
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default CustomHeader;
