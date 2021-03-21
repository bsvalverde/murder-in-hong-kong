import Box from '@material-ui/core/Box';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <Box
      display="flex"
      height="100%"
      justifyContent="center"
      alignItems="center"
      bgcolor="primary.main"
    >
      {children}
    </Box>
  );
};

export default AuthLayout;
