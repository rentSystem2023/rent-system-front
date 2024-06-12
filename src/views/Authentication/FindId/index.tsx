import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { findIdRequest } from 'src/apis/auth';
import { FindIdRequestDto } from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import InputBox from 'src/components/Inputbox'
import { AUTH_FIND_ID_ABSOLUTE_PATH, AUTH_FIND_PASSWORD_ABSOLUTE_PATH, AUTH_SIGN_IN_ABSOLUTE_PATH } from 'src/constant';




export default function FindId() {

    //                    state                    //

    const [userEmail, setUserEmail] =useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [isEmailCheck, setEmailCheck] = useState<boolean>(false);

    const isFindIdActive = isEmailCheck;
    const findIdButtonClass = isFindIdActive ? 'primary-button' : 'disable-button';

    //                    function                    //
    const navigator = useNavigate();

    const findIdResponse = (result: ResponseDto | null) => {

        const message =
            !result ? '?서버에 문제가 있습니다.' :
            result.code === 'VF' ? '입력 형식이 맞지 않습니다.' :
            result.code === 'NE' ? '존재하지 않는 이메일 입니다.':
            result.code === 'DBE' ? '데이터베이스에 문제가 있습니다.' : ''

        const emailCheck = !(result && (result.code === 'DE' || result.code === 'SU'));
        const emailError = !emailCheck;

        if (!result || (result.code !== 'DE' && result.code !== 'SU')) {
            alert(message);
            return;
        }

        const { userId } = result as GetMyInfoResponseDto;
        setUserEmail(userEmail);
        setUserId(userId);
        console.log(userId);
        
    };

    //                    event handler                    //

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

        setEmailCheck(false);
        setEmailMessage('');
        // setUserEmail(userEmail);
        setUserId(userId);

        

    };

    const onFindIdButtonClickHandler = () => {

        if (!userEmail) {
            setMessage('이메일을 입력하세요.');
            return;
        }
        
        const getFindIdRequest: FindIdRequestDto = {
            userEmail: userEmail
        }

        findIdRequest(getFindIdRequest).then(findIdResponse);
        

    };

    const onSignInButtonClickHandler = () => {
        navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
    };

    const onFindPwButtonClickHandler = () => {
        navigator(AUTH_FIND_PASSWORD_ABSOLUTE_PATH);
    };

    const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onFindIdButtonClickHandler();
    };



    return (
        <div id="authentication-wrapper">
            <div className='authentication-sign-up'>
            <div className="title-text">아이디 찾기</div>
                <div className='authentication-contents'>

                    <InputBox label="이메일" type="text" value={userEmail} placeholder="이메일을 입력해주세요" onChangeHandler={onEmailChangeHandler} message={emailMessage} error={isEmailError} onkeydownhandler={onPasswordKeydownHandler} />
                    <div>
                        <div className={findIdButtonClass} onClick={onFindIdButtonClickHandler}>아이디 전송</div>
                    </div>

                </div>
            </div>
            {!isEmailCheck &&
                <div>
                    <div className='return-id'>아이디는 {userId}</div>
                </div>
            }
            <div className='moving-button'>
                <div className='moving-sign-up' onClick={ onFindPwButtonClickHandler }>비밀번호 찾기</div>
                <div className='moving-sign-up' onClick={ onSignInButtonClickHandler }>로그인 하기</div>
            </div>
        </div>
    )
}