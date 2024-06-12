import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import "./style.css";

import InputBox from "src/components/Inputbox";
import { SignInRequestDto } from "src/apis/auth/dto/request";
import { SignInRequest } from "src/apis/auth";
import ResponseDto from "src/apis/response.dto";
import { SignInResponseDto } from "src/apis/auth/dto/response";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { AUTH_SIGN_IN_PATH, MAIN_PATH, AUTH_SIGN_UP_ABSOLUTE_PATH, AUTH_FIND_ID_ABSOLUTE_PATH, AUTH_FIND_PASSWORD_ABSOLUTE_PATH, SNS_SIGN_IN_REQUEST_URL, MAIN_ABSOLUTE_PATH } from "src/constant";

//                    component                    //
export function Sns () {

    //                    state                    //
    const { accessToken, expires } = useParams();
    const [cookies, setCookie] = useCookies();

    //                    function                    //
    const navigator = useNavigate();

    //                    effect                    //
    useEffect(() => {
        if (!accessToken || !expires) return;
        const expiration = new Date(Date.now() + (Number(expires) * 1000));
        setCookie('accessToken', accessToken, { path: '/', expires: expiration });

        navigator(MAIN_ABSOLUTE_PATH);
    }, []);

    //                    render                    //
    return <></>;
}


//                    interface                    //
interface SnsContainerProps {
    title: string;
}

//                    component                    //
function SnsContainer({ title }: SnsContainerProps) {

    //                    event handler                    //
    const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
        window.location.href = SNS_SIGN_IN_REQUEST_URL(type);
    };

    //                    render                    //
    return (
        <div className="authentication-sns-container">
            <div className="sns-container-title label">{title}</div>
            <div className="sns-button-container">
                <div className="sns-button kakao-button" onClick={() => onSnsButtonClickHandler('kakao')}></div>
                <div className="sns-button naver-button" onClick={() => onSnsButtonClickHandler('naver')}></div>
            </div>
        </div>
    );
}


//                    component                    //
export default function SignIn() {

    //                    state                    //
    const [cookies, setCookie] = useCookies();

    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [message, setMessage] = useState<string>('');

    //                    function                    //
    const navigator = useNavigate();

    const signInResponse = (result: SignInResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' : 
            result.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
            result.code === 'TF' ? '서버에 문제가 있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        setMessage(message);

        const isSuccess = result && result.code === 'SU';
        if (!isSuccess) return;

        const { accessToken, expires } = result as SignInResponseDto;
        const expiration = new Date(Date.now() + (expires * 1000));
        setCookie('accessToken', accessToken, { path: '/', expires: expiration });

        navigator(MAIN_ABSOLUTE_PATH);
    };

    //                    event handler                    //
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
        setMessage('');
    };

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setMessage('');
    };

    const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onSignInButtonClickHandler();
    };

    const onSignInButtonClickHandler = () => {
        
        if (!id || !password) {
            setMessage('아이디와 비밀번호를 모두 입력하세요.');
            return;
        }

        const requestBody: SignInRequestDto = {
            userId: id,
            userPassword: password
        }
        SignInRequest(requestBody).then(signInResponse);
        
    };

    const onSignUpButtonClickHandler = () => {
        navigator(AUTH_SIGN_UP_ABSOLUTE_PATH);
    }
    

    //                    render                    //
    return (

        <div id="authentication-wrapper">
            <div className="title-text">로그인</div>
            <div className="authentication-sign-in">
                <div className="authentication-contents">
                    <div className="authentication-input-container">
                        <InputBox 
                            label="아이디"
                            type="text" 
                            value={id}
                            placeholder="아이디를 입력해주세요" 
                            onChangeHandler={onIdChangeHandler} 
                        />
                        <InputBox 
                            label="비밀번호" 
                            type="password" 
                            value={password} 
                            placeholder="비밀번호를 입력해주세요" 
                            onChangeHandler={onPasswordChangeHandler} 
                            onkeydownhandler={onPasswordKeydownHandler} 
                            message={message} error 
                        />
                    </div>
                    <div className="authentication-button-container">
                        <div className="primary-button login" onClick={onSignInButtonClickHandler}>로그인</div>
                    </div>
                    <div className="other-authentication-button-container">
                        <div className="moving-find-id-password">
                            <div className="moving-find-id" onClick={() => {navigator(AUTH_FIND_ID_ABSOLUTE_PATH)}}>아이디</div>
                            <div>{'/'}</div>
                            <div className="moving-find-password" onClick={() => {navigator(AUTH_FIND_PASSWORD_ABSOLUTE_PATH)}}>비밀번호 찾기</div>
                        </div>
                        <div className="moving-sign-up" onClick={ onSignUpButtonClickHandler }>회원가입</div>
                    </div>
                    <div className="short-divider"></div>
                    <SnsContainer title="SNS 로그인" />
                </div>
            </div>
        </div>
    );
}