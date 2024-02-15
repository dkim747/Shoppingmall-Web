import React, { useContext, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../css/Layout.css';
import { LoginContext, useIsLogin } from '../contexts/LoginContext';
import { useAxiosWithAuth } from '../config/AxiosInterceptor'
import { useConfirm } from '../contexts/ConfirmContext';

const Layout = () => {
    
    const isLogin = useIsLogin();
    const navigate = useNavigate();
    const {setIsLogin} = useContext(LoginContext);
    const api = useAxiosWithAuth();
    const {openConfirm} = useConfirm();
    
    console.log("이즈로그인");
    console.log(isLogin);

    const handleLogout = async() => {
        console.log("로그아웃 클릭됨");
        try{
            const response = await api.post("/user/logout", null);
            console.log(response);
            console.log(response.data.item);
            if(response && response.data.item.logout === "ok") {
                console.log("응답을 잘 받아옴");
                localStorage.removeItem("Authorization1");
                localStorage.removeItem("Authorization2");
                setIsLogin(false);
                localStorage.removeItem("userInfo");
            }     
        } catch(e) {
            console.log("캐치블록 실행됌");
            console.log(e);
        }               
    };

    const handleCartClick = () => {
        if(!isLogin) {
            openConfirm("로그인 할꺼얌?", () => {
                navigate("/login");
            });             
        } else {
            navigate("/cart");
        }
    };

  return (
    <>
        <header>
            <nav>
                {
                    isLogin ? 
                    <ul>
                        <h1>danny's shop</h1>
                        <li onClick={handleCartClick}>장바구니</li>
                        <li onClick={handleLogout}>로그아웃</li>              
                    </ul>
                    :
                    <ul>
                        <h1>danny's shop</h1>
                        <li onClick={handleCartClick}>장바구니</li>
                        <li><Link to="login">로그인</Link></li>
                        <li><Link to="signUp">회원가입</Link></li>              
                    </ul>
                }                           
            </nav>
            <nav>
                <ul>
                    <li>특가상품</li>
                    <li>나이키</li>
                    <li>아디다스</li>                
                </ul>
            </nav>
        </header>
        <main>
            <Outlet></Outlet>
        </main>
        <footer>
            <div>
                <p>사업자명 : ㅇㅇㅇㅇㅇ</p>
                <p>전화번호 : 000-0000-0000</p>
            </div>
        </footer>
    </>
  );
};

export default Layout;