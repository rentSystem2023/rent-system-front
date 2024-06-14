import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import './style.css'
import { useNavigate, useParams } from 'react-router';
import { findPasswordRequest } from 'src/apis/auth';
import { FindPasswordRequestDto } from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import InputBox from 'src/components/Inputbox'
import { AUTH_FIND_PASSWORD_ABSOLUTE_PATH, AUTH_FIND_PW_RESET_ABSOLUTE_PATH, AUTH_FIND_PW_RESET_PATH } from 'src/constant';
import { useSearchParams } from "react-router-dom";
import { FindIdResponseDto } from 'src/apis/auth/dto/response';


//                    component                    //
export default function FindPassword() {

  //                    state                    //
  // const [userIdParam, setUserIdParam] = useSearchParams();

const [userId, setUserId] = useState<string>('');
const [userEmail, setUserEmail] =useState<string>('');

const [message, setMessage] = useState<string>('');

const [isEmailError, setEmailError] = useState<boolean>(false);

const [emailMessage, setEmailMessage] = useState<string>('');

const [isEmailCheck, setEmailCheck] = useState<boolean>(false);

// const [passwordButtonStatus, setPasswordButtonStatus] = useState<boolean>(false);


  //                    function                    //
  const navigator = useNavigate();

  const findPasswordResponse = (result: ResponseDto | null) => {

    const message =
      !result ? '?서버에 문제가 있습니다.' :
      result.code === 'AF' ? '아이디 또는 이메일이 일치하지 않습니다.' :
      result.code === 'VF' ? '입력 형식이 맞지 않습니다.' :
      result.code === 'NE' ? '존재하지 않는 이메일 입니다.':
      result.code === 'DBE' ? '데이터베이스에 문제가 있습니다.' : ''

    const emailCheck = !(result && (result.code === 'DE' || result.code === 'SU'));
    const emailError = !emailCheck;

    if (!result || result.code !== 'SU') {
      alert(message);
      return navigator(AUTH_FIND_PASSWORD_ABSOLUTE_PATH);
    }

    const { userId } = result as FindIdResponseDto;
    setUserId(userId);
};

//                    event handler                    //
const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  setUserId(event.target.value);
  setMessage('');
}

const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  setUserEmail(value);

  const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;

  const isEmailPattern = emailPattern.test(value);
  if (!isEmailPattern) {
      setEmailMessage('이메일 형식이 아닙니다.');
      setEmailError(true);
      setEmailCheck(false);
  }

  // setPasswordButtonStatus(false);
  setEmailCheck(false);
  setEmailMessage('');
};

const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key !== 'Enter') return;
  onFindPwButtonClickHandler();
};

const onFindPwButtonClickHandler = () => {
  if (!userId || !userEmail) {
    setMessage('아이디와 이메일을 모두 입력하세요.');
    return;
  }

  const requestBody: FindPasswordRequestDto = {
    userId: userId,
    userEmail: userEmail
  }

  findPasswordRequest(requestBody).then(findPasswordResponse);
  
  navigator(AUTH_FIND_PW_RESET_ABSOLUTE_PATH(userId));
}


    //                    render                    //
  return (
    <div id="authentication-wrapper">
      <div className="title-text">비밀번호 찾기</div>
        <div className='qna-board-text'>
          <div className="find-password-image"></div>
          아이디와 이메일 인증 시,<br/>비밀번호 재설정 페이지로 넘어갑니다.
        </div>
        <div className='authentication-sign-up findps'>
          <div className='authentication-contents'>
            <InputBox
              label="아이디" 
              type="text" 
              value={userId} 
              placeholder="아이디를 입력해주세요" 
              onChangeHandler={onIdChangeHandler} 
            />
            <InputBox 
              label="이메일" 
              type="text" 
              value={userEmail} 
              placeholder="이메일을 입력해주세요" 
              onChangeHandler={onEmailChangeHandler} 
              onButtonClickHandler={onFindPwButtonClickHandler} 
              message={emailMessage} error={isEmailError} 
              onkeydownhandler={onPasswordKeydownHandler} 
            />
          </div>
          <div className="primary-button" onClick={onFindPwButtonClickHandler} >인증</div>
      </div>
  </div>
  )
}
