import { Avatar, Box, Group, Menu, Text, UnstyledButton, createStyles, rem, useMantineTheme } from '@mantine/core';
import { Navigate, useNavigate } from 'react-router-dom';
import ROUTER from '../../../config/router';
import { IconUser, IconArticle, IconPackage, IconLogout, IconLogin } from '@tabler/icons-react';
import { checkLogin, notiType, renderNotification } from '../../../utils/helpers';
import { ReactComponentElement, ReactElement } from 'react';

const useStyles = createStyles((theme) => ({
  userIcon: {
    cursor: 'pointer',
  },
}));

interface MenuItemProps {
  title: string;
  icon: ReactElement;
  link: string;
}

const User = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const isLogin = checkLogin();
  const handleClickUserIcon = () => {
    if (!isLogin) {
      navigate(ROUTER.AUTH.LOGIN);
      return;
    }
    navigate(ROUTER.PROFILE.INFO);
  };

  const MenuItems: MenuItemProps[] = [
    {
      title: 'Thông tin cá nhân',
      icon: <IconUser />,
      link: ROUTER.PROFILE.INFO,
    },
    {
      title: 'Danh sách đơn hàng',
      icon: <IconPackage />,
      link: ROUTER.PROFILE.ORDERS,
    },
    {
      title: 'Đăng xuất',
      icon: <IconLogout />,
      link: ROUTER.HOME.INDEX,
    },
  ];
  const handleClickMenuItem = (item: MenuItemProps) => {
    if (item.title === 'Đăng xuất') {
      localStorage.clear();

      navigate(item.link);
      renderNotification('Thông báo', 'Đăng xuất thành công', notiType.SUCCESS);
    }
    navigate(item.link);
    window.location.reload();
  };

  return (
    <Menu trigger="click">
      <Menu.Target>
        <IconUser className={classes.userIcon} />
      </Menu.Target>
      {isLogin ? (
        <Menu.Dropdown>
          {MenuItems.map((item, index) => (
            <Menu.Item key={index} icon={item.icon} onClick={() => handleClickMenuItem(item)}>
              {item.title}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      ) : (
        <Menu.Dropdown>
          <Menu.Item icon={<IconLogin />} onClick={() => navigate(ROUTER.AUTH.LOGIN)}>
            Đăng nhập
          </Menu.Item>
        </Menu.Dropdown>
      )}
    </Menu>
  );
};

export default User;
