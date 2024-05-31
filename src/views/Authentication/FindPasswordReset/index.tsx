import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router';
import { findPwResetRequest } from 'src/apis/auth';
import { FindPasswordResetRequestDto } from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';
import InputBox from 'src/components/Inputbox'
import { AUTH_SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import useAuthStore from 'src/stores/auth.store';

//                    component                    //
export default function FindPasswordReset() {

    //                    state                    //
    const { password, setPassword } = useAuthStore();

    const [isEqualPassword, setEqualPassword] = useState<boolean>(false);
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
    const [idButtonStatus, setIdButtonStatus] = useState<boolean>(false);
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    
    const isFindPwActive = isPasswordPattern && isEqualPassword;
    const findPwResetButtonClass = `${isFindPwActive ? 'primary' : 'disable'}-button full-width`;

    //                    function                    //

    const navigator = useNavigate();

    const findPwResetResponse = (result: ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '입력 형식이 맞지 않습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

        const isSuccess = result && result.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

    };

    //                    event handler                    //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);

        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
        const isPasswordPattern = passwordPattern.test(value);
        setPasswordPattern(isPasswordPattern);

        const passwordMessage = 
            isPasswordPattern ? '' : 
            value ? '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.' : '';
        setPasswordMessage(passwordMessage);
        
        const isEqualPassword = passwordCheck === value;
        setEqualPassword(isEqualPassword);

        const passwordCheckMessage = 
            isEqualPassword ? '' : 
            passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
        setPasswordCheckMessage(passwordCheckMessage);
    };

    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPasswordCheck(value);

        const isEqualPassword = password === value;
        setEqualPassword(isEqualPassword);

        const passwordCheckMessage = 
            isEqualPassword ? '' : 
            value ? '비밀번호가 일치하지 않습니다.' : '';
        setPasswordCheckMessage(passwordCheckMessage);
    };

    const onFindPwResetButtonClickHandler = () => {

        if(!isFindPwActive) return;
        if(!password || !passwordCheck) {
            alert('모든 내용을 입력해주세요.');
            return;
        }

        const requestBody: FindPasswordResetRequestDto = {
            userPassword: password
        };
        
        // findPwResetRequest(requestBody).then(findPwResetResponse);

        navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);

    }



  return (
    <div id="authentication-wrapper">
        <div className='authentication-sign-up'>
            <div className="title-text">비밀번호 재설정</div>
            <div className='authentication-contents'>

                <InputBox label="비밀번호" type="password" value={password} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />
                
                <InputBox label="비밀번호 확인" type="password" value={passwordCheck} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordCheckChangeHandler} message={passwordCheckMessage} error />

            <div className="authentication-button-container">
                <div className={findPwResetButtonClass} onClick={ onFindPwResetButtonClickHandler }>확인</div>
            </div>

        </div>

      </div>
      
  </div>
  )
}
