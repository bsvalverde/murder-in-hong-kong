import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

interface Props {
  onSubmit: () => void;
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  form: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

export default function Form({
  onSubmit,
  children,
}: Props): React.ReactElement {
  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={onSubmit} autoComplete="off">
      {children}
    </form>
  );
}
