import React, { useEffect, useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { MAIN_ABSOLUTE_PATH, USER_INFO_ABSOLUTE_PATH, USER_UPDATE_ABSOLUTE_PATH } from 'src/constant';
import { useNavigate } from 'react-router-dom';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import { getMyInfoRequest } from 'src/apis/user';

//                    component                    //
export default function MyInfo() {

    //                    state                    //
    const [cookies] = useCookies();
    const [nickName, setNickName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [joinDate, setJoinDate] = useState<string>('');
    const [status, setStatus] = useState<string>('');
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
                <div className='information-title h1'>내 정보</div>
                <div className='information-contents'>
                    <div className='information-container'>
                        
                        <div className='information-nickname'>닉네임</div>
                        <input className='input' type="text" value={nickName} readOnly />
                        <div className='information-id'>아이디</div>
                        <input className='input' type="text" value={userId} readOnly />
                        <div className='information-password'>비밀번호</div>
                        <input className='input' type="text" readOnly />
                        <div className='information-email'>이메일</div>
                        <input className='input' type="text" value={userEmail} readOnly />
                        <div className='information-joindate'>가입날짜</div>
                        <input className='input' type="text" value={joinDate} readOnly />
                    </div>
                    <div className='information-button'>
                        <div className='primary-button' onClick={ onModifyButtonClickHandler }>수정하기</div>
                    </div>
                </div>
            </div>
        </div>
    )
}