import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import Button from '../../components/UI/Button';
import Form from '../../components/UI/Form';
import Link from '../../components/UI/Link';
import RHFPasswordField from './RHFPasswordField';

interface Props {
  error: string;
  loading: boolean;
  rules: {
    [key in keyof FormInput]: any;
  };
  onSubmit: () => void;
}

interface FormInput {
  username: string;
  password: string;
}

const LoginForm = ({ error, loading, rules, onSubmit }: Props) => {
  const intl = useIntl();

  const methods = useFormContext<FormInput>();
  const { control, errors } = methods;

  const getInputError = useCallback(
    (fieldName: string) => {
      const error = errors[fieldName as keyof FormInput];
      return error?.message ? intl.formatMessage({ id: error.message }) : '';
    },
    [errors, intl],
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      p={4}
      justifyContent="space-around"
      minWidth="40%"
      bgcolor="secondary.main"
    >
      <Form onSubmit={onSubmit}>
        <Controller
          name="username"
          control={control}
          rules={rules['username']}
          defaultValue=""
          render={({ value, onChange }) => (
            <TextField
              value={value}
              label={intl.formatMessage({ id: 'usernameField' })}
              placeholder={intl.formatMessage({ id: 'usernamePlaceholder' })}
              margin="normal"
              error={Boolean(errors['username'])}
              helperText={getInputError('username')}
              onChange={onChange}
            />
          )}
        />
        <RHFPasswordField name="password" rules={rules['password']} />
        {error && (
          <Typography color="error" variant="caption" paragraph>
            <FormattedMessage id={error} />
          </Typography>
        )}
        <Box m="auto" mt={2} mb={4} minWidth="40%">
          <Button
            color="primary"
            variant="contained"
            type="submit"
            loading={loading}
            fullWidth
          >
            <FormattedMessage id="login" />
          </Button>
        </Box>
        <Typography align="center" variant="caption" color="textSecondary">
          <FormattedMessage
            id="signupDisclaimer"
            values={{
              br: <br />,
              link: (...chunks: React.ReactNode[]) => (
                <Link to="/signup">{chunks}</Link>
              ),
            }}
          />
        </Typography>
      </Form>
    </Box>
  );
};

export default LoginForm;
