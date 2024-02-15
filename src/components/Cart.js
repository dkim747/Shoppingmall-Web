import React, { useEffect, useState } from 'react'
import { useAxiosWithAuth } from '../config/AxiosInterceptor';
import CartListItem from './CartListItem';

const Cart = () => {

  const api = useAxiosWithAuth();

  const [cartList, setCartList] = useState();
  
  useEffect(() => {
    const getCart = async() => {
      try {
        const response = await api.get("/cart/get-cart");
        console.log(response);
        setCartList(response.data.item.cart);        
      } catch(e) {

      }
    };
    getCart();
  }, []);

  return (
    <>
      <table>
        <tbody>
          {cartList && cartList.map(cart => (<CartListItem key={cart.id} cart={cart}/>))}
        </tbody>
      </table>
    </>
  )
};

export default Cart;