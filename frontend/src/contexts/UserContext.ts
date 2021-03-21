import { createContext } from 'react';
import User from '../types/user';

export default createContext<User>({
  id: '',
  username: '',
});
