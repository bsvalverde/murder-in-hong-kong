import React, { useEffect, useState } from 'react';
import api from '../api';
import AuthContainer from '../auth/containers/AuthContainer';
import FullPageSpinner from '../components/UI/FullPageSpinner';
import UserContext from '../contexts/UserContext';
import User from '../types/user';

const AppContainer = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data: user } = await api.get('/users/me');
        setUser(user);
      } catch (e) {
        // noop
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const onLogin = (user: User) => {
    setUser(user);
  };

  const onLogout = async () => {
    try {
      await api.post('/logout');
      setUser(null);
    } catch (e) {
      // noop
    }
  };

  if (loading) {
    return <FullPageSpinner />;
  }

  if (!user) {
    return <AuthContainer onLogin={onLogin} />;
  }

  return (
    <UserContext.Provider value={user}>
      <p>oi</p>
    </UserContext.Provider>
  );
};

export default AppContainer;
