import React, { useEffect, useState } from 'react'
import "./style.css";
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import {  ADMIN_USER_LIST_ABSOLUTE_PATH,  MAIN_ABSOLUTE_PATH,  MAIN_PATH } from 'src/constant';
import { GetDetailUserListResponseDto } from 'src/apis/userList/dto/response';
import { getDetailUserListRequest, deleteUserRequest } from 'src/apis/userList';

    //                    component                    //
export default function DetailUserList() {
    //                      state                      //
    const [cookies] = useCookies();
    const { userId } = useParams();

    const [userEmail, setUserEmail] = useState<string>('');
    const [nickName, setNickName] = useState<string>('');
    const [joinDate, setJoinDate] = useState<string>('');

    //                    function                     //
    const navigator = useNavigate();

    const getDetailUserListResponse = (result: GetDetailUserListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 유저아이디입니다.' : 
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NI' ? '존재하지 않는 아이디입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(MAIN_PATH);
            return;
        }

        const { userEmail, nickName, joinDate } = result as GetDetailUserListResponseDto;
        setUserEmail(userEmail);
        setNickName(nickName);
        setJoinDate(joinDate);
    };

    const deleteUserListResponse = (result: ResponseDto | null) => {

        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'VF' ? '올바르지 않은 유저정보입니다..' :
        result.code === 'NI' ? '존재하지 않는 아이디입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU'){
            alert(message);
            return;
        }

        navigator(ADMIN_USER_LIST_ABSOLUTE_PATH);
    };

    //                event handler                    //
    const onListClickHandler = () => {
        navigator(ADMIN_USER_LIST_ABSOLUTE_PATH);
    };

    const onDeleteClickHandler = () => {
        if (!userId || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteUserRequest(userId, cookies.accessToken) 
        .then(deleteUserListResponse)
    };
    
    //                    effect                       //
    useEffect(() => {
        if (!userId || !cookies.accessToken) return navigator(MAIN_ABSOLUTE_PATH);

        getDetailUserListRequest(userId, cookies.accessToken).then(getDetailUserListResponse);
    }, []);

    //                    render                    //
    return (
        <div id='admin-detail-wrapper'>
        <div className="my-info-title">회원 정보 상세</div>
            <div className='admin-detail-main-box'>
                <div className='admin-datail-contents'>
                    <div className='admin-contents-wrap'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>아이디</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{userId}</div>
                        </div>
                    </div>
                    
                    <div className='admin-contents-wrap'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>닉네임</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{nickName}</div>
                        </div>
                    </div>

                    <div className='admin-contents-wrap'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>이메일</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{userEmail}</div>
                        </div>
                    </div>

                    <div className='admin-contents-wrap date'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>가입날짜</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{joinDate}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='admin-button-box'>
                    <div className='primary-button list' onClick={onListClickHandler}>목록</div>
                    <div className='error-button delete' onClick={onDeleteClickHandler}>회원삭제</div>
            </div>
        </div>
    );
}