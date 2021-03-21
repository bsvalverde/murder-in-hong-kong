import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Button from '../../components/UI/Button';

const SignUpComplete = () => {
  const history = useHistory();

  const goToLogin = () => {
    history.push('/login');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      p={4}
      justifyContent="space-around"
      minWidth="40%"
      bgcolor="secondary.main"
    >
      <Typography align="center" color="textPrimary" variant="body1">
        <FormattedMessage id="signUpComplete" />
      </Typography>
      <Box m="auto" mt={3} minWidth="40%">
        <Button
          loading={false}
          variant="contained"
          color="primary"
          fullWidth
          onClick={goToLogin}
        >
          <FormattedMessage id="login" />
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpComplete;
