import React, { ChangeEvent, useState } from 'react'
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';
// import { emailAuthCheckRequest, emailAuthRequest, findIdRequest } from 'src/apis/auth';
// import { EmailAuthCheckRequestDto, EmailAuthRequestDto, FindIdRequestDto } from 'src/apis/auth/dto/request';
// import ResponseDto from 'src/apis/response.dto';
// import InputBox from 'src/components/Inputbox'
// import { AUTH_SIGN_IN_ABSOLUTE_PATH } from 'src/constant';

// export default function FindId() {

//     //                    state                    //
//     const [cookies, setCookie] = useCookies();

//     const [email, setEmail] =useState<string>('');
//     const [authNumber, setAuthNumber] =useState<string>('');
//     const [message, setMessage] = useState<string>('');

//     const [isEmailError, setEmailError] = useState<boolean>(false);
//     const [isAuthNumberError, setAuthNumberError] = useState<boolean>(false);

//     const [emailMessage, setEmailMessage] = useState<string>('');
//     const [authNumberMessage, setAuthNumberMessage] = useState<string>('');

//     const [isEmailCheck, setEmailCheck] = useState<boolean>(false);
//     const [isAuthNumberCheck, setAuthNumberCheck] = useState<boolean>(false);
    
//     const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
//     const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

//     //                    function                    //
//     const navigator = useNavigate();

//     const emailAuthResponse = (result: ResponseDto | null) => {

//         const emailMessage = 
//             !result ? '서버에 문제가 있습니다.' : 
//             result.code === 'VF' ? '이메일 형식이 아닙니다.' :
//             result.code === 'DE' ? '중복된 이메일입니다.' :
//             result.code === 'MF' ? '인증번호 전송에 실패했습니다.' :
//             result.code === 'DBE' ? '서버에 문제가 있습니다.' : 
//             result.code === 'SU' ? '인증번호가 전송되었습니다.' : '';
//         const emailCheck = result !== null && result.code === 'SU';
//         const emailError = !emailCheck;

//         setEmailMessage(emailMessage);
//         setEmailCheck(emailCheck);
//         setEmailError(emailError);

//     };

//     const emailAuthCheckResponse = (result: ResponseDto | null) => {

//         const authNumberMessage = 
//             !result ? '서버에 문제가 있습니다.' : 
//             result.code === 'VF' ? '인증번호를 입력해주세요.' : 
//             result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
//             result.code === 'DBE' ? '서버에 문제가 있습니다.' :
//             result.code === 'SU' ? '인증번호가 확인되었습니다.' : '';
//         const authNumberCheck = result !== null && result.code === 'SU';
//         const authNumberError = !authNumberCheck;

//         setAuthNumberMessage(authNumberMessage);
//         setAuthNumberCheck(authNumberCheck);
//         setAuthNumberError(authNumberError);

//     };

//     const findIdResponse = (result: ResponseDto | null) => {

//         const message =
//             !result ? '서버에 문제가 있습니다.' :
//             result.code === 'VF' ? '입력 형식이 맞지 않습니다.' :
//             result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
//             result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

//         const isSuccess = result && result.code === 'SU';
//         if (!isSuccess) {
//             alert(message);
//             return;
//         }

//     };

//     //                    event handler                    //

//     const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//         const { value } = event.target;
//         setEmail(value);
//         setEmailButtonStatus(value !== '');
//         setEmailCheck(false);
//         setAuthNumberCheck(false);
//         setEmailMessage('');
//     };

//     const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//         const { value } = event.target;
//         setAuthNumber(value);
//         setAuthNumberButtonStatus(value !== '');
//         setAuthNumberCheck(false);
//         setAuthNumberMessage('');
//     };

//     const onEmailButtonClickHandler = () => {
//         if(!emailButtonStatus) return;

//         const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
//         const isEmailPattern = emailPattern.test(email);
//         if (!isEmailPattern) {
//             setEmailMessage('이메일 형식이 아닙니다.');
//             setEmailError(true);
//             setEmailCheck(false);
//             return;
//         }

//         const requestBody: EmailAuthRequestDto = { userEmail: email };
//         emailAuthRequest(requestBody).then(emailAuthResponse);
//     };

//     const onAuthNumberButtonClickHandler = () => {
//         if(!authNumberButtonStatus) return;
//         if(!authNumber) return;

//         const requestBody: EmailAuthCheckRequestDto = {
//             userEmail: email,
//             authNumber
//         };
//         emailAuthCheckRequest(requestBody).then(emailAuthCheckResponse);
//     };

//     const onFindIdButtonClickHandler = () => {

//         if (!email || !authNumber) {
//             setMessage('이메일과 인증번호를 모두 입력하세요.');
//             return;
//         }

//         const requestBody: FindIdRequestDto = {
//             userEmail: email,
//             authNumber,
//         }
//         findIdRequest(requestBody).then(findIdResponse);
//         alert('이메일로 아이디가 전송되었습니다.');
//         navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);

//     };


//     return (
//         <div id="authentication-wrapper">
//             <div className='authentication-full'>
//                 <div className='authentication-title'>아이디 찾기</div>
//                 <div className='authentication-contents'>

//                     <InputBox label="이메일" type="text" value={email} placeholder="이메일을 입력해주세요" onChangeHandler={onEmailChangeHandler} buttonTitle="이메일 인증" buttonStatus={emailButtonStatus} onButtonClickHandler={onEmailButtonClickHandler} message={emailMessage} error={isEmailError} />

//                     {isEmailCheck && 
//                     <InputBox label="인증번호" type="text" value={authNumber} placeholder="인증번호 4자리를 입력해주세요" onChangeHandler={onAuthNumberChangeHandler} buttonTitle="인증 확인" buttonStatus={authNumberButtonStatus} onButtonClickHandler={onAuthNumberButtonClickHandler} message={authNumberMessage} error={isAuthNumberError} />}

//                 </div>
//                 <div className='authentication-button-container' onClick={ onFindIdButtonClickHandler }>
//                     <div className=''>아이디 찾기</div>
//                 </div>

//             </div>
//         </div>
//     )
// }
