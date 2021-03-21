import React, { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import api from '../../api';
import RHFSignUpForm from '../components/RHFSignUpForm';
import SignUpComplete from '../components/SignUpComplete';
import { trim } from '../utils/validationUtils';

const SignUpContainer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [finished, setFinished] = useState(false);

  const methods = useForm({ mode: 'onBlur' });
  const { handleSubmit, getValues } = methods;

  const onSubmit = handleSubmit(async ({ username, password }) => {
    setLoading(true);
    setError('');

    try {
      await api.post('/users', {
        username,
        password,
      });
      setLoading(false);
      setFinished(true);
    } catch (e) {
      const { status } = e?.response || {};
      switch (status) {
        case 409:
          setError('usernameUnavailable');
          break;
        default:
          setError('genericError');
      }
      setLoading(false);
    }
  });

  const match = useCallback(
    (value: string) =>
      value === getValues('password') ? true : 'passwordsDontMatch',
    [getValues],
  );

  const requiredFieldRule = useMemo(
    () => ({
      value: true,
      message: 'requiredField',
    }),
    [],
  );

  const passwordRules = useMemo(
    () => ({
      required: requiredFieldRule,
      minLength: {
        value: 6,
        message: 'passwordMinimumCharacters',
      },
    }),
    [requiredFieldRule],
  );

  const rules = useMemo(
    () => ({
      username: {
        validate: { trim },
        required: requiredFieldRule,
        minLength: {
          value: 6,
          message: 'passwordMinimumCharacters',
        },
      },
      password: passwordRules,
      passwordConfirmation: {
        ...passwordRules,
        validate: {
          match,
        },
      },
      userType: {
        required: requiredFieldRule,
      },
    }),
    [requiredFieldRule, passwordRules, match],
  );

  return finished ? (
    <SignUpComplete />
  ) : (
    <FormProvider {...methods}>
      <RHFSignUpForm
        error={error}
        loading={loading}
        rules={rules}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};

export default SignUpContainer;
