import { useNavigate } from 'react-router-dom';
import React from 'react'

const ProductListItem = ({product}) => {
  
  const productNo = product.id;
  const navigate = useNavigate();

  const handleClickImage = () => {
    navigate(`/product?productId=${productNo}`)
  };

  return (
    <tr>        
        <td><img src={product.image} alt='' onClick={handleClickImage}/></td>
        <td>{product.productName}</td>
        <td>{product.productPrice}원</td>
    </tr>
  )
}

export default ProductListItem