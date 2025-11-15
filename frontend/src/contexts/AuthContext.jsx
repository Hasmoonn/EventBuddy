import axios from "axios"
import { useCallback } from "react";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


axios.defaults.withCredentials = true;

export const AuthContext = createContext();


const AuthContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  const getAuthState = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-auth');

      if (data.success) {
        setIsAuthenticated(true);

        if (data.user) {
          setUser(data.user);
        }
      } else {
          setIsAuthenticated(false);
          setUser(null);
          toast.error(data.message)
      }

    } catch (error) {
        toast.error("Authentication check failed: Login first ");
        setIsAuthenticated(false);
        setUser(null);
    } finally{
        setLoading(false);
    }
  }, [backendUrl]) 

  useEffect(() => {
    getAuthState();
  },[getAuthState]);


  const adminLogin = async (email, password) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/admin', { email, password });

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        return { success: true, message: 'Admin login successful' };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return { success: false, message: error.message };
    }
  };

  const value = {
    getAuthState,
    adminLogin,
    navigate,
    user, setUser,
    isAuthenticated, setIsAuthenticated,
    backendUrl,
    loading, setLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;