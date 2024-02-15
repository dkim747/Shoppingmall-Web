import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const Postcode = ({setters}) => {
    
    console.log("이건 address",setters)
    const handleOnComplete = (data) => {
        console.log("데이터데이터",data);
        setters.setAddress(data.address);
        setters.setZipcode(data.zonecode);
    };
  
    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: '50%',
        left: '50%',
        transform:'translate(-50%,-50%)',
        width: "400px",
        height: "400px",
        padding: "7px",
        border: "2px solid #666"
      };

    return (
    <>
        <DaumPostcode
        style={postCodeStyle}
        onComplete={handleOnComplete}/>  
    </>
  )
};

export default Postcode;