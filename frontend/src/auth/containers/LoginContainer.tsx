import React, { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import api from '../../api';
import User from '../../types/user';
import RHFLoginForm from '../components/RHFLoginForm';
import { trim } from '../utils/validationUtils';

interface Props {
  onLogin: (user: User) => void;
}

const LoginContainer = ({ onLogin }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const methods = useForm({ mode: 'onBlur' });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    setLoading(true);
    setError('');
    try {
      const { data: user } = await api.post('/login', formData);
      setLoading(false);
      onLogin(user);
    } catch (e) {
      const { status } = e?.response || {};
      switch (status) {
        case 401:
          setError('invalidCredentials');
          break;
        default:
          setError('genericError');
      }
      setLoading(false);
    }
  });

  const requiredFieldRule = useMemo(
    () => ({
      value: true,
      message: 'requiredField',
    }),
    [],
  );

  const rules = useMemo(
    () => ({
      username: {
        validate: { trim },
        required: requiredFieldRule,
      },
      password: {
        required: requiredFieldRule,
      },
    }),
    [requiredFieldRule],
  );

  return (
    <FormProvider {...methods}>
      <RHFLoginForm
        error={error}
        loading={loading}
        rules={rules}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};

export default LoginContainer;
