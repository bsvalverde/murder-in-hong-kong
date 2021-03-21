import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { ReactElement, useCallback, useState } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

interface Props {
  name: string;
  required?: boolean;
  rules?: any;
}

const RHFPasswordField = ({
  name,
  required = false,
  rules,
}: Props): ReactElement => {
  const { errors, control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const intl = useIntl();

  const error = errors[name];

  const getPasswordError = useCallback(
    (error: FieldError) =>
      error?.message ? intl.formatMessage({ id: `${error.message}` }) : '',
    [intl],
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ value, onChange }) => (
        <TextField
          value={value}
          fullWidth
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          error={Boolean(error)}
          label={intl.formatMessage({ id: `${name}Field` })}
          placeholder={intl.formatMessage({ id: `${name}Placeholder` })}
          InputLabelProps={{
            required,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prevState) => !prevState)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={getPasswordError(error)}
          onChange={onChange}
        />
      )}
    />
  );
};

export default RHFPasswordField;
