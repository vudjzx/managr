import {useState, useEffect, createContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import {defaultAuthContext, IAuth, IAuthContext, ILoginRes} from '../interfaces/IAuth';

const AuthContext = createContext<IAuthContext>(defaultAuthContext);

const AuthProvider: React.FC = ({children}) => {
  const [auth, setAuth] = useState<IAuth>(defaultAuthContext.auth);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');

    const authUser = async () => {
      setLoading(true);
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const {data}: ILoginRes = await axiosClient.get('/users/profile', config);
        setAuth(data);
      } catch (err) {
        console.log(err);
        // localStorage.removeItem('token');
      }
      setLoading(false);
    };
    void authUser();
  }, []);

  return <AuthContext.Provider value={{auth, setAuth, loading}}>{children}</AuthContext.Provider>;
};

export {AuthContext};
export default AuthProvider;
