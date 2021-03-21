import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import User from '../../types/user';
import LoginContainer from '../containers/LoginContainer';
import SignUpContainer from '../containers/SignUpContainer';

interface Props {
  onLogin: (user: User) => void;
}

const AuthRoutesContainer = ({ onLogin }: Props) => {
  return (
    <Switch>
      <Route path="/login">
        <LoginContainer onLogin={onLogin} />
      </Route>
      <Route path="/signup">
        <SignUpContainer />
      </Route>
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

export default AuthRoutesContainer;
