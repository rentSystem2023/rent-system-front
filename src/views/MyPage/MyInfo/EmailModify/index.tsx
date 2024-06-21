import { ChangeEvent, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { emailAuthRequest, putMyInfoEmailRequest } from 'src/apis/user';
import { EmailAuthRequestDto, PutMyInfoEmailRequestDto } from 'src/apis/user/dto/request';
import InputBox from 'src/components/Inputbox';
import { MAIN_ABSOLUTE_PATH, USER_INFO_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores/car.reservation.store';

    //                    component                    //
export default function MyInfoEmailModify() {
    
    //                      state                      //
    const { loginUserRole } = useUserStore();

    const [cookies] = useCookies();
    
    const [email, setEmail] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [isEmailCheck, setEmailCheck] = useState<boolean>(false);
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
    const [isAuthNumberError, setAuthNumberError] = useState<boolean>(false);
    const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
    const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

    //                    function                     //
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

        if(authNumberCheck) {
            alert('이메일이 변경되었습니다.');
            navigator(USER_INFO_ABSOLUTE_PATH);
        }

        setAuthNumberMessage(authNumberMessage);
        setAuthNumberError(authNumberError);
    };

    //                event handler                    //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
        setEmailButtonStatus(value !== '');
        setEmailCheck(false);
        setEmailMessage('');
    };

    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAuthNumber(value);
        setAuthNumberButtonStatus(value !== '');
        setAuthNumberMessage('');
    };

    //                    function                     //
    const navigator = useNavigate();

    const onEmailButtonClickHandler = () => {
        if(!cookies.accessToken ||  !emailButtonStatus) return;

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
        if(!cookies.accessToken ||  !authNumberButtonStatus) return;
        
        if(!authNumber) return;

        const requestBody: PutMyInfoEmailRequestDto = {
            userEmail: email,
            authNumber: authNumber
        };

        putMyInfoEmailRequest(requestBody, cookies.accessToken).then(emailAuthCheckResponse);
    };

    //                    effect                       //
    useEffect (() => {
        if (!cookies.accessToken || loginUserRole !== 'ROLE_USER') {
            navigator(MAIN_ABSOLUTE_PATH);
        }
    }, []);

    //                    Render                       //
    return (
        <div id="information-wrapper">
            <div className='information-main'>
            <div className='my-info-title'>이메일 변경</div>
            <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>
            <div className='information-container'>
                <div className='information-contents'>
                <InputBox 
                    label="변경할 이메일" 
                    type="text" value={email} 
                    placeholder="이메일을 입력해주세요" 
                    onChangeHandler={onEmailChangeHandler} 
                    buttonTitle="이메일 인증" 
                    buttonStatus={emailButtonStatus} 
                    onButtonClickHandler={onEmailButtonClickHandler} 
                    message={emailMessage} error={isEmailError} 
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
                        message={authNumberMessage} error={isAuthNumberError} 
                    />
                }
                </div>
            </div>
        </div>
    </div>
    );
}