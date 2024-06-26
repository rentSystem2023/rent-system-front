import { ChangeEvent, useState } from "react";
import "./style.css";
import InputBox from "src/components/Inputbox";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto, NickNameCheckRequestDto, SignUpRequestDto } from "src/apis/auth/dto/request";
import { IdCheckRequest, NickNameCheckRequest, emailAuthCheckRequest, emailAuthRequest, signUpRequest } from "src/apis/auth";
import ResponseDto from "src/apis/response.dto";
import { useNavigate } from "react-router";
import { AUTH_SIGN_IN_ABSOLUTE_PATH } from "src/constant";
import useAuthStore from "src/stores/auth.store";
import { useSearchParams } from "react-router-dom";

//                    component                    //
export default function SignUp() {

    //                      state                      //
    const { setJoinPath, setSnsId } = useAuthStore();

    const [searchParam ] = useSearchParams();
    
    const [id, setId] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nickName, setNickName] = useState<string>('');
    const [idMessage, setIdMessage] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');
    const [isIdCheck, setIdCheck] = useState<boolean>(false);
    const [isIdError, setIdError] = useState<boolean>(false);
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [isEmailCheck, setEmailCheck] = useState<boolean>(false);
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [nickNameMessage, setNickNameMessage] = useState<string>('');
    const [isNickNameError, setNickNameError] = useState<boolean>(false);
    const [idButtonStatus, setIdButtonStatus] = useState<boolean>(false);
    const [isEqualPassword, setEqualPassword] = useState<boolean>(false);
    const [isNickNameCheck, setNickNameCheck] = useState<boolean>(false);
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
    const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
    const [isAuthNumberCheck, setAuthNumberCheck] = useState<boolean>(false);
    const [isAuthNumberError, setAuthNumberError] = useState<boolean>(false);
    const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    const [nickNameButtonStatus, setNickNameButtonStatus] = useState<boolean>(false);
    const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

    //                    function                    //
    const navigator = useNavigate();

    const idCheckResponse = (result: ResponseDto | null) => {
        const idMessage = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '아이디는 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
            result.code === 'DI' ?  '이미 사용중인 아이디입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' :
            result.code === 'SU' ? '사용 가능한 아이디입니다.' : '';
        const idError = !(result && result.code === 'SU');
        const idCheck = !idError;

        setIdMessage(idMessage);
        setIdError(idError);
        setIdCheck(idCheck);
    };

    const nickNameCheckResponse = (result: ResponseDto | null) => {
        const nickNameMessage = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '아이디는 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
            result.code === 'DN' ?  '이미 사용중인 닉네임입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' :
            result.code === 'SU' ? '사용 가능한 닉네임입니다.' : '';
        const nickNameError = !(result && result.code === 'SU');
        const nickNameCheck = !nickNameError;

        setNickNameMessage(nickNameMessage);
        setNickNameError(nickNameError);
        setNickNameCheck(nickNameCheck);
    };

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

    const signUpResponse = (result: ResponseDto | null) => {
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

    //                    event handler                //
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setId(value);
        setIdButtonStatus(value !== '');
        setIdCheck(false);
        setIdMessage('');
    };

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

    const onNickNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNickName(value);
        setNickNameButtonStatus(value !== '');
        setNickNameCheck(false);
        setNickNameMessage('');
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

    const onIdButtonClickHandler = () => {
        if(!idButtonStatus || !id || !id.trim()) return;

        const requestBody: IdCheckRequestDto = { userId: id };
        IdCheckRequest(requestBody).then(idCheckResponse);
    };

    const onNickNameButtonClickHandler = () => {
        if(!nickNameButtonStatus || !nickName || !nickName.trim()) return;

        const requestBody: NickNameCheckRequestDto = { nickName: nickName };
        NickNameCheckRequest(requestBody).then(nickNameCheckResponse);
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
        };

        const requestBody: EmailAuthRequestDto = { userEmail: email };
        emailAuthRequest(requestBody).then(emailAuthResponse);
    };

    const onAuthNumberButtonClickHandler = () => {
        if(!authNumberButtonStatus || !authNumber) return;

        const requestBody: EmailAuthCheckRequestDto = {
            userEmail: email,
            authNumber
        };

        emailAuthCheckRequest(requestBody).then(emailAuthCheckResponse);
    };
    
    const onSignUpButtonClickHandler = () => {
        if(!isSignUpActive) return;

        if(!id || !password || !passwordCheck || !nickName ||  !email || !authNumber) {
            alert('모든 내용을 입력해주세요.');
            return;
        };

        const requestBody: SignUpRequestDto = {
            userId: id,
            userPassword: password,
            nickName: nickName,
            userEmail: email,
            authNumber,
        };
        
        signUpRequest(requestBody).then(signUpResponse);

        const joinPath = searchParam.get('joinPath');

        if (joinPath) setJoinPath(joinPath);
        
        const snsId = searchParam.get('snsId');
        if (snsId) setSnsId(snsId);

        navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
    };

    //                    render                       //
    const isSignUpActive = isIdCheck && isNickNameCheck && isEmailCheck && isAuthNumberCheck && isPasswordPattern && isEqualPassword;
    const signUpButtonClass = `${isSignUpActive ? 'primary' : 'disable'}-button full-width`;
    
    return (
        <div id="authentication-wrapper">
            <div className="title-text">회원가입</div>
            <div className="authentication-sign-up">
                <div className="authentication-contents">
                    <div className="authentication-input-container">
                        <InputBox 
                            label="아이디" 
                            type="text" 
                            value={id} 
                            placeholder="아이디를 입력해주세요" 
                            onChangeHandler={onIdChangeHandler} 
                            buttonTitle="중복 확인" 
                            buttonStatus={idButtonStatus} 
                            onButtonClickHandler={onIdButtonClickHandler} 
                            message={idMessage} 
                            error={isIdError} 
                        />
                        <InputBox 
                            label="비밀번호" 
                            type="password" 
                            value={password} 
                            placeholder="비밀번호를 입력해주세요" 
                            onChangeHandler={onPasswordChangeHandler} 
                            message={passwordMessage} error 
                        />
                        <InputBox 
                            label="비밀번호 확인" 
                            type="password" 
                            value={passwordCheck} 
                            placeholder="비밀번호를 입력해주세요"
                            onChangeHandler={onPasswordCheckChangeHandler} 
                            message={passwordCheckMessage} error 
                        />
                        <InputBox 
                            label="닉네임"
                            type="text" 
                            value={nickName} 
                            placeholder="닉네임을 입력해주세요" 
                            onChangeHandler={ onNickNameChangeHandler } 
                            buttonTitle="중복 확인" 
                            buttonStatus={nickNameButtonStatus} 
                            onButtonClickHandler={onNickNameButtonClickHandler} 
                            message={nickNameMessage} 
                            error={isNickNameError} 
                        />
                        <InputBox 
                            label="이메일" 
                            type="text" 
                            value={email} 
                            placeholder="이메일을 입력해주세요" 
                            onChangeHandler={onEmailChangeHandler} 
                            buttonTitle="이메일 인증" 
                            buttonStatus={emailButtonStatus} 
                            onButtonClickHandler={onEmailButtonClickHandler} 
                            message={emailMessage} 
                            error={isEmailError} 
                        />
                        {isEmailCheck && 
                            <InputBox 
                            label="인증번호" 
                            type="text" 
                            value={authNumber} 
                            placeholder="인증번호 4자리를 입력해주세요" 
                            onChangeHandler={onAuthNumberChangeHandler} 
                            buttonTitle="인증 확인" 
                            buttonStatus={authNumberButtonStatus} 
                            onButtonClickHandler={onAuthNumberButtonClickHandler}
                            message={authNumberMessage} 
                            error={isAuthNumberError} 
                            />
                        }
                    </div>
                    <div className="authentication-button-container">
                        <div className={signUpButtonClass} onClick={ onSignUpButtonClickHandler }>가입하기</div>
                    </div>
                </div>
            </div>
        </div>
    );
}