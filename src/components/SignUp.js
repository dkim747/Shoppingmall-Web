import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAxiosWithoutAuth } from '../config/AxiosInterceptor';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    
    const [userEmail, setUserEmail] = useState('');
    const [userPw, setUserPw] = useState('');
    const [showUserPw, setShowUserPw] = useState("");
    const [userName, setUserName] = useState("");
    const [userPhoneNum, setUserPhoneNum] = useState('');

    const [emailCheckMsg, setEmailCheckMsg] = useState('');
    const [pwCheckMsg, setPwCheckMsg] = useState("");

    const [isUserEmailCheck, setIsUserEmailCheck] = useState(false);
    const [isUserPwCheck, setIsUserPwCheck] = useState(false);

    const api = useAxiosWithoutAuth();

    const navigate = useNavigate();
    
    //아이디 관련 시작
    const handleChangeUserEmail = useCallback((e) => {        
        setUserEmail(e.target.value);
        if(isUserEmailCheck) {
            setIsUserEmailCheck(false);
        }
    }, [userEmail, isUserEmailCheck]);

    const handleFocusUserEmail = () => {
        setEmailCheckMsg("");
    };

    // const userEmailValidation = (id) => {
    //     return /^[A-Za-z0-9-_]{5,10}$/.test(id);
    // };

    const handleBlurUserEmail = async() => {
        if(userEmail === "") {
            setEmailCheckMsg("필수정보입니다.");
            return;
        }

        // if(!userEmailValidation(userEmail)) {
        //     setEmailCheckMsg("아이디는 영문 대소문자, 숫자, 특수문자 -, _의 5~10자리 조합입니다.");
        //     return;       
        // }

        try {
            const response =  await api.get(`/user/checkEmail?userEmail=${userEmail}`);
            console.log(response)
            const result = response.data.item.id;
            if (result === "ok") {
                setEmailCheckMsg("사용가능한 이메일입니다.");
                setIsUserEmailCheck(true);
            } else {
                setEmailCheckMsg("이미 가입된 이메일입니다.");
            }
        } catch(e) {

        }
    };
    //아이디 관련 끝

    //비밀번호 관련 시작
    const handleChangeUserPw = useCallback((e) => {
        setUserPw(e.target.value);
        if(isUserPwCheck) {
            setIsUserPwCheck(false);
        }
    }, [setUserPw, isUserPwCheck]);

    const userPwValidation = (pw) => {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(pw);
    };

    const handleBlurUserPw = () => {
        if(userPw === "") {
            setPwCheckMsg("필수정보입니다.");
            return;
        }
        if(!userPwValidation(userPw)) {
            setPwCheckMsg("비밀번호는 영문 대소문자, 숫자, 특수기호를 포함한 8~16자리 조합입니다.");
            return;
        }
        setPwCheckMsg("사용가능한 비밀번호입니다.");
        setIsUserPwCheck(true);        
    };

    const handleFocusUserPW = () => {
        setPwCheckMsg("");
    };

    const toggleUserPw = () => {
        setShowUserPw(showUserPw => !showUserPw);
    };
    //비밀번호 관련 끝

    const handleChangeUserName = useCallback((e) => {
        setUserName(e.target.value);
    }, []);


    const changeUserPhoneNum = useCallback((e) => {
        setUserPhoneNum(e.target.value);
    }, []);


    const onSubmitSignUpForm = useCallback((e) => {
        e.preventDefault();

        if(!isUserEmailCheck) {
            alert("아이디 중복체크를 진행하세요.");
            return;
        }

        if(!isUserPwCheck) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        const signUp = async() => {
            
            const user = {
                userEmail: userEmail,
                userPw: userPw,
                userName: userName,
                userPhoneNum: userPhoneNum
            };
            
            try {
                const response = await axios.post('http://localhost:9005/user/sign-up', user);
                console.log(response);
                if(response.data.item.msg === "save ok") {
                    alert("저장성공");
                    navigate("/login");
                } else {
                    alert("저장실패");
                }
            } catch(e) {
                console.log(e);
            }
        };
        signUp();        
    }, [userPw, userEmail, userPhoneNum, isUserEmailCheck, isUserPwCheck]);
    
  return (
    <>
        <form id="signUpForm" onSubmit={onSubmitSignUpForm}>
            {/* <div>
                <label>아이디</label>
                <input id="userId" name='userId' value={userId} type="text" onChange={handleChangeUserId} onBlur={handleBlurUserId} onFocus={handleFocusUserId} autoComplete='off'/>
                <p id='idCheckResult' style={{color: idCheckMsg.includes("사용가능") ? "green" : "red"}}>{idCheckMsg}</p>
            </div> */}
            <div>
                <label>이메일</label>
                <input id="userEmail" name='userEmail' value={userEmail} type="email" onChange={handleChangeUserEmail} onBlur={handleBlurUserEmail} onFocus={handleFocusUserEmail} autoComplete='off'/>
                <p id='idCheckResult' style={{color: emailCheckMsg.includes("사용가능") ? "green" : "red"}}>{emailCheckMsg}</p>
            </div>

            <div>
                <label>비밀번호</label>
                <input id='userPw' name='userPw' value={userPw} type={showUserPw ? "text" : "password"} onChange={handleChangeUserPw} onBlur={handleBlurUserPw} onFocus={handleFocusUserPW} autoComplete='new-password'/>
                <button type='button' onClick={toggleUserPw}>비번보기</button>
                <p id='pwCheckResult' style={{color: pwCheckMsg.includes("사용가능") ? "green" : "red"}}>{pwCheckMsg}</p>            
            </div>
            <div>
                <label>이름</label>
                <input id='userName' name='userName' value={userName} onChange={handleChangeUserName}/>            
            </div>
            <div>
                <label>전화번호</label>
                <input id='userPhoneNum' name='userPhoneNum' value={userPhoneNum} onChange={changeUserPhoneNum}/>            
            </div>
            <button type='submit'>회원가입</button>
        </form>        
    </>
  );
};

export default SignUp;