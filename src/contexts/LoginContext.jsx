import { createContext, useMemo, useState, useContext } from "react";

const token = localStorage.getItem("Authorization1");

console.log(token);

const userInfos = JSON.parse(localStorage.getItem("userInfo"));

export const LoginContext = createContext();

export const LoginProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(token !== null ? true : false);    

    const [userInfo, setUserInfo] = useState(userInfos);

    const value = useMemo(() => ({isLogin, setIsLogin, userInfo, setUserInfo}), [isLogin, setIsLogin, userInfo, setUserInfo]);

    return <LoginContext.Provider value = {value}>{children}</LoginContext.Provider>
};

export const useIsLogin = () => {
    const context = useContext(LoginContext);
    if(!context) {
        throw new Error('Cannot find LoginProvider');
    }
    return context.isLogin;
};

export const useUserInfo = () => {
    const context = useContext(LoginContext);

    console.log()

    return context.userInfo;
};