import React, { ChangeEvent, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { emailAuthRequest, findIdRequest } from 'src/apis/auth';
import { EmailAuthRequestDto, FindIdRequestDto } from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';
import InputBox from 'src/components/Inputbox'
import { AUTH_SIGN_IN_ABSOLUTE_PATH } from 'src/constant';

export default function FindId() {

    //                    state                    //
    const [cookies, setCookie] = useCookies();

    const [userId, setUserId] = useState<string>('');
    const [email, setEmail] =useState<string>('');
    const [message, setMessage] = useState<string>('');

    const [isEmailError, setEmailError] = useState<boolean>(false);

    const [emailMessage, setEmailMessage] = useState<string>('');

    const [isEmailCheck, setEmailCheck] = useState<boolean>(false);
    
    const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);

    const isFindIdActive = isEmailCheck;

    //                    function                    //
    const navigator = useNavigate();

    // const emailAuthResponse = (result: ResponseDto | null) => {

    //     const emailMessage = 
    //         !result ? '서버에 문제가 있습니다.' : 
    //         result.code === 'VF' ? '이메일 형식이 아닙니다.' :
    //         result.code === 'MF' ? '인증번호 전송에 실패했습니다.' :
    //         result.code === 'NE' ? '존재하지 않는 이메일 입니다.':
    //         result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
    //     const emailCheck = !(result && result.code === 'SU');
    //     const emailError = !emailCheck;

    //     setEmailMessage(emailMessage);
    //     setEmailCheck(emailCheck);
    //     setEmailError(emailError);

    // };

    const findIdResponse = (result: ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '입력 형식이 맞지 않습니다.' :
            result.code === 'NE' ? '존재하지 않는 이메일 입니다.':
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

        const emailCheck = !(result && result.code === 'SU');
        const emailError = !emailCheck;

        const isSuccess = result && result.code === 'SU';

        setEmailMessage(emailMessage);
        setEmailCheck(emailCheck);
        setEmailError(emailError);

        if (!isSuccess) {
            alert(message);
            return;
        }

    };

    //                    event handler                    //

    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // setEmail(event.target.value);
        // const { value } = event.target;
        const { value } = event.target;
        setEmail(value);

        const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;

        const isEmailPattern = emailPattern.test(value);
        if (!isEmailPattern) {
            setEmailMessage('이메일 형식이 아닙니다.');
            setEmailError(true);
            setEmailCheck(false);
            return;
        }

        setEmail(value);
        setEmailButtonStatus(false);
        setEmailCheck(false);
        setEmailMessage('');

    };

    // const onEmailButtonClickHandler = () => {
    //     if (emailButtonStatus) return;
    //     const requestBody: FindIdRequestDto = { userEmail: email };
    //     emailAuthRequest(requestBody).then(emailAuthResponse);
    // };

    const onFindIdButtonClickHandler = () => {

        if (!email) {
            setMessage('이메일과 인증번호를 모두 입력하세요.');
            return;
        }

        const requestBody: FindIdRequestDto = {
            userEmail: email
        }
        findIdRequest(requestBody).then(findIdResponse);
        // alert({});
        // navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);

    };


    return (
        <div id="authentication-wrapper">
            <div className='authentication-sign-up'>
            <div className="title-text">아이디 찾기</div>
                <div className='authentication-contents'>

                    <InputBox label="이메일" type="text" value={email} placeholder="이메일을 입력해주세요" onChangeHandler={onEmailChangeHandler} buttonTitle="아이디 전송" buttonStatus={emailButtonStatus} onButtonClickHandler={onFindIdButtonClickHandler} message={emailMessage} error={isEmailError} />

                </div>
                {isEmailCheck &&
                <div className='success-find-id'>
                    { userId }
                </div>
                }

            </div>
        </div>
    )
}
