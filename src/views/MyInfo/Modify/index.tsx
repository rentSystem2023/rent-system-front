import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ResponseDto from 'src/apis/response.dto';
import { emailAuthCheckRequest, emailAuthRequest, myInfoModifyRequest } from 'src/apis/user';
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, MyInfoModifyRequestDto } from 'src/apis/user/dto/request';
import InputBox from 'src/components/Inputbox';
import { USER_INFO_ABSOLUTE_PATH } from 'src/constant';

//                    component                    //
export default function MyInfoModify() {

    //                    state                    //
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');

    const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
    const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

    const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
    const [isEqualPassword, setEqualPassword] = useState<boolean>(false);
    const [isEmailCheck, setEmailCheck] = useState<boolean>(false);
    const [isAuthNumberCheck, setAuthNumberCheck] = useState<boolean>(false);

    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [isAuthNumberError, setAuthNumberError] = useState<boolean>(false);

    const isMyInfoModifyActive = isEmailCheck && isAuthNumberCheck && isPasswordPattern && isEqualPassword;

    const myInfoModifyButtonClass = `${isMyInfoModifyActive ? 'primary' : 'disable'}-button full-width`;

    //                    function                    //
    const emailAuthResponse = (result: ResponseDto | null) => {

        const emailMessage = 
            !result ? '서버에 문제가 있습니다.' : 
            result.code === 'VF' ? '이메일 형식이 아닙니다.' :
            result.code === 'DE' ? '중복된 이메일입니다.' :
            result.code === 'MF' ? '인증번호 전송에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : 
            result.code === 'SU' ? '인증번호가 전송되었습니다.' : '';
        const emailCheck = result !== null && result.code === 'SU';
        const emailError = !emailCheck;

        setEmailMessage(emailMessage);
        setEmailCheck(emailCheck);
        setEmailError(emailError);

    };

    const emailAuthCheckResponse = (result: ResponseDto | null) => {

        const authNumberMessage = 
            !result ? '서버에 문제가 있습니다.' : 
            result.code === 'VF' ? '인증번호를 입력해주세요.' : 
            result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' :
            result.code === 'SU' ? '인증번호가 확인되었습니다.' : '';
        const authNumberCheck = result !== null && result.code === 'SU';
        const authNumberError = !authNumberCheck;

        setAuthNumberMessage(authNumberMessage);
        setAuthNumberCheck(authNumberCheck);
        setAuthNumberError(authNumberError);

    };

    const myInfoModifyResponse = (result: ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '입력 형식이 맞지 않습니다.' : 
            result.code === 'DI' ? '이미 사용중인 아이디입니다.' :
            result.code === 'DE' ? '중복된 이메일입니다.' :
            result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

        const isSuccess = result && result.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

    };

    //                    event handler                    //
    const navigator = useNavigate();

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

    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
        setEmailButtonStatus(value !== '');
        setEmailCheck(false);
        setAuthNumberCheck(false);
        setEmailMessage('');
    };

    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAuthNumber(value);
        setAuthNumberButtonStatus(value !== '');
        setAuthNumberCheck(false);
        setAuthNumberMessage('');
    };

    const onEmailButtonClickHandler = () => {
        if(!emailButtonStatus) return;

        const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
        const isEmailPattern = emailPattern.test(email);
        if (!isEmailPattern) {
            setEmailMessage('이메일 형식이 아닙니다.');
            setEmailError(true);
            setEmailCheck(false);
            return;
        }

        const requestBody: EmailAuthRequestDto = { userEmail: email };
        emailAuthRequest(requestBody).then(emailAuthResponse);
    };

    const onAuthNumberButtonClickHandler = () => {
        if(!authNumberButtonStatus) return;
        if(!authNumber) return;

        const requestBody: EmailAuthCheckRequestDto = {
            userEmail: email,
            authNumber
        };
        emailAuthCheckRequest(requestBody).then(emailAuthCheckResponse);
    };

    const onModifyButtonClickHandler = () => {

        if(!isMyInfoModifyActive) return;
        if(!password || !passwordCheck || !email || !authNumber) {
            alert('모든 내용을 입력해주세요.');
            return;
        }

        const requestBody: MyInfoModifyRequestDto = {
            userPassword: password,
            userEmail: email,
            authNumber,
        }
        
        myInfoModifyRequest(requestBody).then(myInfoModifyResponse);

        navigator(USER_INFO_ABSOLUTE_PATH);
    }

    const onDeleteButtonClickHandler = () => {
        alert("삭제하시겠습니까?");

    }


  return (
    <div id='information-wrapper'>
            <div className='information-main'>
                <div className='information-title h1'>내 정보</div>
                <div className='information-contents'>
                    <div className='information-container'>
                        <div className='information-nickname'>닉네임</div>
                        <div className='information-id'>아이디</div>

                        <InputBox label="비밀번호" type="password" value={password} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />

                        <InputBox label="비밀번호 확인" type="password" value={passwordCheck} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordCheckChangeHandler} message={passwordCheckMessage} error />

                        <InputBox label="이메일" type="text" value={email} placeholder="이메일을 입력해주세요" onChangeHandler={onEmailChangeHandler} buttonTitle="이메일 인증" buttonStatus={emailButtonStatus} onButtonClickHandler={onEmailButtonClickHandler} message={emailMessage} error={isEmailError} />

                        {isEmailCheck && 
                        <InputBox label="인증번호" type="text" value={authNumber} placeholder="인증번호 4자리를 입력해주세요" onChangeHandler={onAuthNumberChangeHandler} buttonTitle="인증 확인" buttonStatus={authNumberButtonStatus} onButtonClickHandler={onAuthNumberButtonClickHandler} message={authNumberMessage} error={isAuthNumberError} />}

                        <div className='information-joindate'>가입날짜</div>
                    </div>
                    <div className='information-modify-button'>
                        <div className={ myInfoModifyButtonClass } onClick={ onModifyButtonClickHandler }>수정하기</div>
                        <div className='information-delete-button' onClick={ onDeleteButtonClickHandler } >탈퇴하기</div>
                    </div>
                </div>
            </div>
        </div>
  )
}
