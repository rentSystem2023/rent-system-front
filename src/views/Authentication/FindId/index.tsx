import { ChangeEvent, KeyboardEvent, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { findIdRequest } from 'src/apis/auth';
import { FindIdRequestDto } from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import InputBox from 'src/components/Inputbox'
import { AUTH_FIND_PASSWORD_ABSOLUTE_PATH, AUTH_SIGN_IN_ABSOLUTE_PATH } from 'src/constant';

//                    component                    //
export default function FindId() {

    //                    state                    //
    const [userId, setUserId] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [isEmailCheck, setIsEmailCheck] = useState<boolean>(false);
    const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);

    //                    function                    //
    const navigator = useNavigate();

    const findIdResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '존재하지 않는 이메일 입니다.' :
            result.code === 'VF' ? '입력 형식이 맞지 않습니다.' :
            result.code === 'DBE' ? '데이터베이스에 문제가 있습니다.' : ''

        const emailCheck = !(result && (result.code === 'SU'));
        const emailError = !emailCheck;

        if (!result || (result.code !== 'SU')) {
            alert(message);
            return;
        };

        const { userId } = result as GetMyInfoResponseDto;
        setUserEmail(userEmail);
        setUserId(userId);
        setEmailError(emailError);
        setIsEmailCheck(true);
    };

    //                    event handler                    //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserEmail(value);
        setEmailButtonStatus(value !== '');
        setIsEmailCheck(false);
        setEmailMessage('');
    };

    const onFindIdButtonClickHandler = () => {

        if (!emailButtonStatus) return;

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isEmailPattern = emailPattern.test(userEmail);

        if (!isEmailPattern) {
            setEmailMessage('이메일 형식이 아닙니다.');
            setEmailError(true);
            return;
        };

        const getFindIdRequest: FindIdRequestDto = { userEmail: userEmail };

        findIdRequest(getFindIdRequest).then(findIdResponse);
    };

    const onSignInButtonClickHandler = () => navigator (AUTH_SIGN_IN_ABSOLUTE_PATH);

    const onFindPwButtonClickHandler = () => navigator (AUTH_FIND_PASSWORD_ABSOLUTE_PATH);

    const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onFindIdButtonClickHandler();
    };

    //                    render                    //
    return (
        <div id="authentication-wrapper">
            <div className="title-text">아이디 찾기</div>
            <div className='authentication-sign-up'>
                <div className='authentication-contents'>
                    <InputBox
                        label="이메일" 
                        type="text" 
                        value={userEmail} 
                        placeholder="이메일을 입력해주세요" 
                        onChangeHandler={onEmailChangeHandler} 
                        buttonTitle='아이디 전송' 
                        buttonStatus={emailButtonStatus} 
                        onButtonClickHandler={onFindIdButtonClickHandler} 
                        message={emailMessage} 
                        error={isEmailError} 
                        onkeydownhandler={onPasswordKeydownHandler} 
                    />
                </div>
                <div className='moving-find-id-password'>
                    <div className='moving-find' onClick={onFindPwButtonClickHandler}>비밀번호 찾기</div>
                    <div>{'/'}</div>
                    <div className='moving-find' onClick={onSignInButtonClickHandler}>로그인</div>
                </div>
                {isEmailCheck && (
                    <div>
                        <div className='return-id'>회원님의 아이디는&ensp;<div style={{color: 'rgba(58, 87, 232, 1)'}}>{userId}</div>&ensp;입니다.</div>
                    </div>
                )}
            </div>
        </div>
    );
}