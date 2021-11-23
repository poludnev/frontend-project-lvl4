import { useContext } from 'react';

import SocketContext from '../contexts/apiContext.jsx';
import UserContext from '../contexts/userContext.jsx';

export const useApi = () => useContext(SocketContext);
export const useAuth = () => useContext(UserContext);

export default { useApi, useAuth };
