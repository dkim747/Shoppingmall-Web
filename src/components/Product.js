import React, { useCallback, useEffect, useState } from 'react'
import { useAxiosWithAuth, useAxiosWithoutAuth } from '../config/AxiosInterceptor'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginContext, useIsLogin } from '../contexts/LoginContext';
import { useConfirm } from '../contexts/ConfirmContext';

const Product = () => {
    
    const location = useLocation();
    const queryString = location.search;

    console.log("이건 쿼리스트링", queryString);

    const api = useAxiosWithoutAuth();
    const api2 = useAxiosWithAuth();
    const isLogin = useIsLogin(LoginContext);
    const {openConfirm, closeConfirm} = useConfirm();
    const navigate = useNavigate();

    console.log("현재 로그인 상태", isLogin);

    const [product, setProduct] = useState("");
    
    useEffect(() => {
        const searchParams = new URLSearchParams(queryString);
        console.log(searchParams);
        const productNo = searchParams.get("productId");
        console.log(productNo);

        const getProductRequest = async() => {
            try{
                const response = await api.get(`/products/get-product?productId=${productNo}`);                
                console.log("asdasdasd", response);
                setProduct(response.data.item.product);
            } catch(e) {
                
            }    
        };
        getProductRequest();
    
    }, []);

    const addCart = useCallback(async() => {
        if(!isLogin) {
            openConfirm("로그인 할래?", () => {
                navigate("/login");
            });
            return;        
        };

        try {
            console.log("장바구니에 물건 담는중");
            const response = await api2.post("/cart/add-cart", product);
            
        } catch(e) {
            
        }
    }, [isLogin, product]);

    const purchase = () => {
        if(!isLogin) {
            openConfirm("로그인 필요해", () => {
                navigate("/login");
            });
            return;
        };
        navigate("/order", {state: {product}});
    };


    // const purchase = async() => {
    //     try{
    //         const response = await api2.post('/orders/order', product);
    //         console.log(response);
    //     } catch(e) {

    //     }
    // };

    // const getPurchaseForm = () => {
    //     if(!isLogin) {
    //         openConfirm("로그인 하시겠습니까?", () => {
    //             navigate("/login");
    //         });
    //         return;        
    //     };

    //     try {
    //         navigate("/order")
    //     } catch(e) {

    //     }
    // };

  return (
    <>
        <div>{product.productName}</div>
        <div><img src={product.image}/></div>
        <div>{product.content}</div>
        <div><button type='submit' onClick={addCart}>장바구니에 담기</button></div>
        <div><button type='submit' onClick={purchase}>구매하기</button></div>
        {/* <div><button><Link to="/order" state={{product : product}}>구매하기</Link></button></div> */}
    </>
  )
};

export default Product;