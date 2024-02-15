import React, { useCallback, useState } from 'react';
import { useAxiosWithAuth } from '../config/AxiosInterceptor';

const MakeProducts = () => {

    const [link, setLink] = useState("");
    const api = useAxiosWithAuth();

    const handleChangeLink = useCallback((e) => {
        setLink(e.target.value);
    }, []);

    const makeProducts = async() => {
      try{
        const response = await api.post("/products/makeProducts", {link});
        console.log("상품등록 됐니?", response);
      } catch(e) {

      }

    };

  return (
    <>
        <input name="link" value={link} onChange={handleChangeLink}/>
        <button type='submit' onClick={makeProducts}>등록</button>
    </>
  )
};

export default MakeProducts;