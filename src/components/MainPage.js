import { useAxiosWithoutAuth } from '../config/AxiosInterceptor';
import React, { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';

const MainPage = () => {

  const [productList, setProductList] = useState([]);
  const api = useAxiosWithoutAuth();
  
  useEffect(() => {
    const getProductList = async() => {
      try {
        const response = await api.get('/products/get-products');
        console.log(response);
        setProductList(() => response.data.item.productList);
      } catch(e) {
        console.log(e); 
      }
    };
    getProductList();
  }, []) 
  
    return (
    <>
      <table>
        <tbody>
          {productList && productList.map(product => (
            <ProductListItem key={product.id} product={product}/>
          ))}
        </tbody>        
      </table>            
    </>    
  );
};

export default MainPage;