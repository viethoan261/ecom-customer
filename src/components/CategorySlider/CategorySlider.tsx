import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme, rem } from '@mantine/core';
import ROUTER from '../../config/router';
import { useNavigate } from 'react-router-dom';
import bg1 from '../../assets/images/polo.webp';
import bg2 from '../../assets/images/short.webp';
import bg3 from '../../assets/images/quanlot.webp';
import bg4 from '../../assets/images/phukien.avif';

import { RootState } from '../../redux/reducer';
import { useSelector } from 'react-redux';
import _ from 'lodash';
const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

interface CardProps {
  image: string;
  category: string;
  link: string;
}

function Card({ image, category, link }: CardProps) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <Paper shadow="md" p="xl" radius="md" sx={{ backgroundImage: `url(${image})` }} className={classes.card}>
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {category}
        </Title>
      </div>
      <Button variant="white" color="dark" onClick={() => navigate(link)}>
        Xem ngay
      </Button>
    </Paper>
  );
}

const CategorySlider = () => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const { categories, isFetching } = useSelector((state: RootState) => state.categories);
  const parentsCategories = categories?.filter((category) => category.categoryParentID === 0);

  const data = _.map(parentsCategories, ({ id, name }) => ({
    id: id,
    category: name,
    image: id == 1 ? bg1 : id == 2 ? bg2 : id == 3 ? bg3 : bg4,
    link: `${ROUTER.PRODUCT.ALL_PRODUCTS}/${id}`,
  }));

  const slides = data.map((item, index) => (
    <Carousel.Slide key={index}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="50%"
      slideGap="xl"
      loop
      align="start"
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
      withIndicators
    >
      {slides}
    </Carousel>
  );
};

export default CategorySlider;
