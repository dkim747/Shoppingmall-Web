import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';
import { useAxiosWithAuth, useAxiosWithoutAuth } from '../config/AxiosInterceptor';

const Login = () => {
    
    const {setIsLogin, setUserInfo} = useContext(LoginContext);

    const [userEmail, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    
    const navigate = useNavigate();
    const api = useAxiosWithoutAuth();
    const api2 = useAxiosWithAuth();

    const login = async(e) => {        
        e.preventDefault();
        
        try{
            const response = await api.post("/login", {userEmail: userEmail, userPw: userPw});
            console.log("로그인 리스폰스");
            console.log(response.headers);
            localStorage.setItem("Authorization1", response.headers.accesstoken);
            localStorage.setItem("Authorization2", response.headers.refreshtoken);
            setIsLogin(true);
            getUserInfo();
            navigate(-1);
        } catch(e) {
            console.log(e);
        }        
    };

    const getUserInfo = async() => {
        try {
            const response = await api2.post("/user/info");
            console.log("getUserInfo 실행해서 받아온다", response);
            localStorage.setItem("userInfo", JSON.stringify(response.data.item.userInfo));
            // setUserInfo(response.data.item.userInfo);
        } catch(e) {

        }
        
    };




  return (
    <>
        <form onSubmit={login}>
            <label>아이디</label>
            <input id='userId' value={userEmail} onChange={(e) => setUserId(e.target.value)}/>
            <label>비밀번호</label>
            <input id='userPw' value={userPw} type="password" onChange={(e) => setUserPw(e.target.value)}/>
            <button type='submit'>로그인</button>
        </form>        
    </>
    
  );
};

export default Login;