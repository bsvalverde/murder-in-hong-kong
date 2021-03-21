import React from 'react';
import User from '../../types/user';
import AuthLayout from '../components/AuthLayout';
import AuthRoutesContainer from './AuthRoutesContainer';

interface Props {
  onLogin: (user: User) => void;
}

const AuthContainer = ({ onLogin }: Props) => {
  return (
    <AuthLayout>
      <AuthRoutesContainer onLogin={onLogin} />
    </AuthLayout>
  );
};

export default AuthContainer;
