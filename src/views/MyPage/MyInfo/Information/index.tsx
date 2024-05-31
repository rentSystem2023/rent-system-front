import React, { useEffect, useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { MAIN_ABSOLUTE_PATH, USER_INFO_ABSOLUTE_PATH, USER_UPDATE_ABSOLUTE_PATH } from 'src/constant';
import { useNavigate } from 'react-router-dom';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import { getMyInfoRequest } from 'src/apis/user';
import { useUserStore } from 'src/stores';

//                    component                    //
export default function MyInfo() {

    //                    state                    //
    const [cookies] = useCookies();
    const [nickName, setNickName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [joinDate, setJoinDate] = useState<string>('');
    const [userRole, setUserRole] = useState<String>('');

    //                    function                    //
    const navigator = useNavigate();

    const getMyInfoResponse = (result: GetMyInfoResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(MAIN_ABSOLUTE_PATH);
                return;
            }
            navigator(USER_INFO_ABSOLUTE_PATH);
            return;
        }

        if (!cookies.accessToken) return;
        getMyInfoRequest(cookies.accessToken).then(getMyInfoResponse);

        const { nickName, userId, userEmail, joinDate, userRole } = result as GetMyInfoResponseDto;
        setNickName(nickName);
        setUserId(userId);
        setUserEmail(userEmail);
        setJoinDate(joinDate);
        setUserRole(userRole);

    };


    //                    event handler                    //
    // const onPwModifyButtonClickHandler = () => {
    //     navigator(USER_UPDATE_ABSOLUTE_PATH);
    // }

    // const onEmailModifyButtonClickHandler = () => {
    //     navigator(USER_UPDATE_ABSOLUTE_PATH);
    // }

    const onModifyButtonClickHandler = () => {
        navigator(USER_UPDATE_ABSOLUTE_PATH);
    }


    
    //                  effect                      //
    useEffect (() => {
        if (!cookies.accessToken) return;
        getMyInfoRequest(cookies.accessToken).then(getMyInfoResponse);
    }, []);


    return (
        <div id='information-wrapper'>          
            <div className='information-main'>  
                <div className='information-contents'>
                    <div className='information-container'>
                        <div className='information-box'>
                            <div className='information-title'>닉네임</div>
                            <div className='information-value'>{nickName}</div>    
                        </div>
                        <div className='information-box'>
                            <div className='information-title'>아이디</div>
                            <div className='information-value'>{userId}</div>    
                        </div>
                        <div className='information-box'>
                            <div className='information-title'>비밀번호</div>
                            <div className='information-value'></div> 
                            {/* <div className='information-modify-button' onClick={ onPwModifyButtonClickHandler }>변경</div> */}
                        </div>
                        <div className='information-box'>
                            <div className='information-title'>이메일</div>
                            <div className='information-value'>{userEmail}</div>
                            {/* <div className='information-modify-button' onClick={ onEmailModifyButtonClickHandler }>변경</div> */}
                        </div>
                        <div className='information-box'>
                            <div className='information-title'>가입날짜</div>
                            <div className='information-value'>{joinDate}</div>    
                        </div>                 
                    </div>
                        <div className='information-modify-button' onClick={ onModifyButtonClickHandler }>수정하기</div>
                </div>
            </div>
        </div>
    )
}