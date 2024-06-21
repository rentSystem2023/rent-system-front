import { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ResponseDto from 'src/apis/response.dto';
import InputBox from 'src/components/Inputbox';
import { MAIN_ABSOLUTE_PATH, USER_INFO_ABSOLUTE_PATH } from 'src/constant';
import { PutMyInfoPwRequestDto } from 'src/apis/user/dto/request';
import { putMyInfoPwRequest } from 'src/apis/user';
import { useUserStore } from 'src/stores';

    //                    component                    //
export default function MyInfoPwModify() {

    //                      state                      //
    const { loginUserRole } = useUserStore();

    const [cookies] = useCookies();

    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [isEqualPassword, setEqualPassword] = useState<boolean>(false);
    const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    
    const isPwUpdateActive = isPasswordPattern && isEqualPassword;
    const pwUpdateButtonClass = `${isPwUpdateActive ? 'primary' : 'disable'}-button full-width`;

    //                    function                     //
    const navigator = useNavigate();

    const putMyInfoPwModifyResponse = (result: ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '입력 형식이 맞지 않습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

        const isSuccess = result && result.code === 'SU';

        if (!isSuccess) {
            alert(message);
            return;
        };
    };

    //                event handler                    //
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

    const onPwUpdateButtonClickHandler = () => {

        if(!cookies.accessToken || !isPwUpdateActive) return;

        if(!password || !passwordCheck) {
            alert('모든 내용을 입력해주세요.');
            return;
        };

        const requestBody: PutMyInfoPwRequestDto = { userPassword: password };
        
        putMyInfoPwRequest(requestBody, cookies.accessToken).then(putMyInfoPwModifyResponse);

        alert('비밀번호가 변경되었습니다.');
        navigator(USER_INFO_ABSOLUTE_PATH);
    };

    //                    effect                       //
    useEffect (() => {
        if (!cookies.accessToken || loginUserRole !== 'ROLE_USER') {
            navigator(MAIN_ABSOLUTE_PATH);
        }
    }, []);

    //                    render                    //
    return (
        <div id="information-wrapper">
            <div className='information-main'>
                <div className='my-info-title'>비밀번호 변경</div>
                <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>
                <div className='information-container'>
                    <div className='information-contents'>
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
                    <div className="authentication-button-container">
                        <div className={pwUpdateButtonClass} onClick={ onPwUpdateButtonClickHandler }>확인</div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}