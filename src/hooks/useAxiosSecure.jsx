import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {API} from "../../config.js";
// import useAuth from "../hooks/useAuth.jsx";

const axiosSecure = axios.create({
  baseURL: API, 
});

const useAxiosSecure = () => {
//   const { logOut } = useAuth(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        //   await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;