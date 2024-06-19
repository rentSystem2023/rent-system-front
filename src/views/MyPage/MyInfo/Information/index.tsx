import React, { useEffect, useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { MAIN_ABSOLUTE_PATH, USER_EMAIL_UPDATE_ABSOLUTE_PATH, USER_PW_UPDATE_ABSOLUTE_PATH } from 'src/constant';
import { useNavigate } from 'react-router-dom';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import { deleteUserRequest, getMyInfoRequest } from 'src/apis/user';

//                    component                    //
export default function MyInfo() {

    //                    state                    //
    const [cookies, setCookie, removeCookie] = useCookies();
    const [nickName, setNickName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [userPassword, setUserPassword] = useState<number>(5); 
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
            };
            
            if (!cookies.accessToken) return navigator(MAIN_ABSOLUTE_PATH);
            
            return;
        };

        const { nickName, userId, userEmail, joinDate, userRole } = result as GetMyInfoResponseDto;
        setNickName(nickName);
        setUserId(userId);
        setUserEmail(userEmail);
        setJoinDate(joinDate);
        setUserRole(userRole);
        setUserPassword(10); // 임의로 비밀번호를  '*'로 10개 나타나도록 함
    };

    const deleteUserResponse = (result: ResponseDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'VF' ? '올바르지 않은 접근입니다.' :
        result.code === 'NI' ? '존재하지 않는 유저정보입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU'){
            alert(message);
            return;
        };

        removeCookie('accessToken', { path: '/' }); // 삭제되면 그 게시물에 있으면 안되기 때문에 목록 페이지로 이동
        navigator(MAIN_ABSOLUTE_PATH);
        window.location.reload();
    };

    //                    event handler                    //
    const onPwModifyButtonClickHandler = () => {
        navigator(USER_PW_UPDATE_ABSOLUTE_PATH);
    };

    const onEmailModifyButtonClickHandler = () => {
        navigator(USER_EMAIL_UPDATE_ABSOLUTE_PATH);
    };

    const onDeleteButtonClickHandler = () => {

        if (!userId || !cookies.accessToken) return;

        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');

        if (!isConfirm) return;

        deleteUserRequest(cookies.accessToken, userId).then(deleteUserResponse);
    };

    //                  effect                      //
    useEffect (() => {
        if (!cookies.accessToken) {
            navigator(MAIN_ABSOLUTE_PATH);
        } else {
            getMyInfoRequest(cookies.accessToken).then(getMyInfoResponse);
        };
    }, []);

    //                    render                    //
    return (
        <div id='information-wrapper'>      
            <div className='information-main'>
                <div className='my-info-title'>회원 정보</div>

                <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>

                <div className='information-container'>
                    <div className='infomation-contents'>
                        <div className='information-box'>
                            <div className='label'>닉네임</div>
                            <div className='information-value'>{nickName}</div>    
                        </div>
                        <div className='information-box'>
                            <div className='information-title'>아이디</div>
                            <div className='information-value'>{userId}</div>    
                        </div>
                        <div className='information-box'>
                            <div className='label'>비밀번호</div>
                            <div className='infomation-modify-wrap'>
                                <div className='information-value'>{'*'.repeat(userPassword)}</div> 
                                <div className='information-modify-button' onClick={ onPwModifyButtonClickHandler }>비밀번호 변경</div>
                            </div>
                        </div>
                        <div className='information-box'>
                            <div className='label'>이메일</div>
                            <div className='infomation-modify-wrap'>
                                <div className='information-value'>{userEmail}</div>
                                <div className='information-modify-button' onClick={ onEmailModifyButtonClickHandler }>이메일 변경</div>
                            </div>
                        </div>
                        <div className='information-box'>
                            <div className='label'>가입날짜</div>
                            <div className='information-value'>{joinDate}</div>    
                        </div>

                        <div className='information-modify-button delete' onClick={ onDeleteButtonClickHandler }>회원탈퇴하기</div>
                    </div>
                </div>
            </div>
        </div>
    );
};