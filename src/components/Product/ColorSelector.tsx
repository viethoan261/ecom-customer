import { Box, Card, createStyles } from '@mantine/core';

interface Props {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ColorSelector = ({ color, isSelected, onClick }: Props) => {
  const useStyles = createStyles((theme) => ({
    box: {
      borderRadius: theme.radius.lg,
      cursor: 'pointer',
      boxShadow: '1px',
    },
  }));
  const { classes } = useStyles();

  return (
    <Box sx={{ border: isSelected ? `2px solid black` : '', padding: '2px' }} className={classes.box}>
      <Box
        bg={color}
        className={classes.box}
        w={35}
        h={25}
        onClick={() => onClick()}
        sx={{ border: '1px solid black' }}
      />
    </Box>
  );
};
