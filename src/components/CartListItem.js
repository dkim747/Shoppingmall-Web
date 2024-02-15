import React from 'react';

const CartListItem = ({cart}) => {      

    return (
    <tr>        
        <td>여기는 장바구니</td>
        <td><img src={cart.products.image} alt=''/></td>
        <td>{cart.products.productName}</td>
        <td>{cart.products.productPrice}원</td>
    </tr>
  )
};

export default CartListItem;