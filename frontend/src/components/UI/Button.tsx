import UIButton, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

interface Props extends ButtonProps {
  loading: boolean;
}

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.text.primary,
    '&:disabled': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  whiteButton: {
    color: theme.palette.primary.main,
  },
}));

const Button = (props: Props) => {
  const classes = useStyles();

  const { loading, children, className, ...rest } = props;

  const isWhite = rest.variant !== 'contained';

  return (
    <UIButton
      className={clsx(
        classes.button,
        { [classes.whiteButton]: isWhite },
        className,
      )}
      {...rest}
    >
      {loading ? <CircularProgress color="inherit" size={26} /> : children}
    </UIButton>
  );
}

export default Button;
