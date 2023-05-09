import { Card, Col, Grid, Group, createStyles } from '@mantine/core';
import { Sizes } from '../../types/models/Product';
import _ from 'lodash';
import { useState } from 'react';
import { notiType, renderNotification } from '../../utils/helpers';

interface Props {
  availableSizes: string[];
  sizeSelected: string | undefined;
  setSizeSelected: (size: any) => void;
}
const defaultSize: Sizes[] = [Sizes.XS, Sizes.S, Sizes.M, Sizes.L, Sizes.XL, Sizes.XXL];

export const SizesRender = ({ availableSizes, sizeSelected, setSizeSelected }: Props) => {
  const handleOnClick = (size: string) => {
    if (isStocking().includes(size)) {
      setSizeSelected(size);
    } else {
      renderNotification('Thông báo', 'Sản phẩm này hiện đang hết hàng', notiType.ERROR);
    }
  };

  const isSelected = (size: any) => {
    return size == sizeSelected;
  };
  const isStocking = () => {
    return _.intersection(availableSizes, defaultSize);
  };

  return (
    <Group>
      {defaultSize.map((size, index) => (
        <Card
          key={index}
          withBorder
          bg={isSelected(size) ? 'black' : '#D9D9D9'}
          c={isSelected(size) ? 'white' : ''}
          radius={'lg'}
          py={'xs'}
          px={'lg'}
          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
          className={isStocking().includes(size) ? '' : 'outOfStock'}
          onClick={() => handleOnClick(size)}
        >
          {size}
        </Card>
      ))}
    </Group>
  );
};
