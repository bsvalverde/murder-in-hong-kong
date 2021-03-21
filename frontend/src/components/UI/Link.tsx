import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Link = (props: LinkProps) => {
  const classes = useStyles();

  const { children, ...rest } = props;

  return (
    <RouterLink className={classes.link} {...rest}>
      {children}
    </RouterLink>
  );
};

export default Link;
