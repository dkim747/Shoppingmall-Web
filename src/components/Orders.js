import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Postcode from './Postcode';
import { useAxiosWithAuth } from '../config/AxiosInterceptor'


const Orders = () => {
  const api = useAxiosWithAuth();
  const location = useLocation();
  const product = location.state.product;
  
  console.log("이건 받은 product", product);

  // const userInfoContext = useUserInfo();
  // console.log("이건 유저인포 콘텍스트. 유즈유저인포 사용한", userInfoContext);
  const userInfoLocal = JSON.parse(localStorage.getItem("userInfo"));
  const [userInfo, setUserInfo] = useState(userInfoLocal);
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [sameAsOrderer, setSameAsOrderer] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhoneNum, setReceiverPhoneNum] = useState("");
  const [saveAsMyAddress, setSaveAsMyAddress] = useState(false);
  const [popup, setPopup] = useState(false);

  const handleChangeUserName = (e) => {    
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      userName: e.target.value
    }));
  };

  const handleChangeUserPhoneNum = (e) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      userPhoneNum: e.target.value
    }));
  };

  const handleClickCheckBox = () => {    
    setSameAsOrderer(!sameAsOrderer);
    if(!sameAsOrderer) {
      setReceiverName(userInfo.userName);
      setReceiverPhoneNum(userInfo.userPhoneNum);
    } else {
      setReceiverName("");
      setReceiverPhoneNum("");
    }
  };

  const handleChangeReceiverName = (e) => {
    setReceiverName(e.target.value);
  };

  const handleChangeReceiverPhoneNum = (e) => {
    setReceiverPhoneNum(e.target.value);
  };

  const handleSearchAddress = () => {
    setPopup(!popup);
  };

  const handleClickAddress = () => {
    setSaveAsMyAddress(!saveAsMyAddress);
  };

  console.log("이건 내 주소 저장 값" + saveAsMyAddress);

  const handleChangeAddressDetail = (e) => {
    setAddressDetail(e.target.value);
  };
  
  const onSubmitOrderForm = async(e) => {
    e.preventDefault();
    console.log("데이터 전송되나?")
    const order = {
      products: product,     
      receiverName: receiverName,
      receiverPhoneNum: receiverPhoneNum,
      address: {
        zipcode: zipcode,
        address: address,
        addressDetail: addressDetail
      },
      saveAsMyAddress : saveAsMyAddress      
    };
    
    try {
      const response = await api.post("/orders/getorder", order);
      console.log("saveorder 리스폰스",response);
    } catch (e) {
      
    };
  };

  return (
    <>
        <form onSubmit={onSubmitOrderForm}>
          <div> 상품
            <div>{product.productName}</div>
            <div><img src={product.image}/></div>
            <div>{product.productPrice}원</div>
          </div>          
          <div> 주문자 정보
            <div>
              <label>주문자 이름</label>
              <input value={userInfo.userName} onChange={handleChangeUserName}/>
            </div>
            <div>
              <label>전화번호</label>
              <input value={userInfo.userPhoneNum} onChange={handleChangeUserPhoneNum}/>
            </div>            
          </div>
          <div> 받는사람 정보
            <input type='checkbox' checked={sameAsOrderer} onChange={handleClickCheckBox}/>주문자와 동일
            <div>
              <label>받는사람 이름</label>
              <input value={receiverName} onChange={handleChangeReceiverName}/>
            </div>
            <div>
              <label>전화번호</label>
              <input value={receiverPhoneNum} onChange={handleChangeReceiverPhoneNum}/>
            </div>
            <div>
              <label>주소</label>
              <input type='checkbox' checked={saveAsMyAddress} onChange={handleClickAddress}/> 내 주소로 사용하기            
              <div>
                우편번호<input value={zipcode} readOnly/>
                <button onClick={handleSearchAddress}>주소 검색</button>
                {popup && <Postcode setters={{setAddress, setZipcode}}/>}
                주소<input value={address} readOnly/>
                <input value={addressDetail} onChange={handleChangeAddressDetail}/>
              </div>
            </div>
          </div>
          <button type='submit'>주문하기</button>
        </form>
    </> 
  );
};

export default Orders;