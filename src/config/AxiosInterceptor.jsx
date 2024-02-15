import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';

const useAxiosWithAuth = () => {
  const navigate = useNavigate();
  const {setIsLogin} = useContext(LoginContext);
  
  const axiosWithAuth = axios.create({
    baseURL: "http://localhost:9005",
  });

  axiosWithAuth.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("Authorization1");
      if (token) {
        config.headers["AccessToken"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosWithAuth.interceptors.response.use(    
    (response) => response,
    async (error) => {      
      const originalRequest = error.config;
      console.log(originalRequest);
      //만료된 엑세스 토큰의 에러처리
      if (error.response.data.message === "Expired" && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("Authorization2");
        try {
          console.log("리프레시토큰 요청 보내는중");
          const response = await axios.post(
            "http://localhost:9005/token/renew-access",
            null,
            {              
              headers: { RefreshToken: refreshToken },
            }
          );
          console.log("아래는 데이터");
          console.log(response);
          localStorage.setItem("Authorization1", response.data.item.newAccessToken);
          //헤더를 새로받은 토큰으로 갈아끼는 작업 로컬스토리지에 저장만 해서는 안됌
          error.config.headers["AccessToken"] = response.data.item.newAccessToken;
          //리프레시토큰이 살아있어서 엑세스토큰 받았으니 재요청
          return axiosWithAuth(originalRequest);
        } catch (refreshError) {
          console.log("아래는 에러");
          console.log(refreshError);
          //리프레시 토큰마저 만료됐을 때
          if (refreshError.response.data.item.refresh === "Expired") {
            localStorage.clear();
            setIsLogin(false);
            navigate("/login");
          }
        }
        //그외 엑세스 토큰들의 에러처리(로컬스토리지에서 임의로 변경, 클레임 없는 토큰 등등)
      } else if (error.response.data.message === "Wrong") {
        localStorage.clear();
        setIsLogin(false);
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  
  return axiosWithAuth;
};

const useAxiosWithoutAuth = () => {
  const axiosWithoutAuth = axios.create({
    baseURL: "http://localhost:9005",
  });

  return axiosWithoutAuth;
};

export { useAxiosWithAuth, useAxiosWithoutAuth };