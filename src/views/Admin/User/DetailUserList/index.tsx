import React, { useEffect, useState } from 'react'
import "./style.css";
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import {  ADMIN_USER_LIST_ABSOLUTE_PATH,  MAIN_PATH } from 'src/constant';
import { GetDetailUserListResponseDto } from 'src/apis/userList/dto/response';
import { getDetailUserListRequest, deleteUserRequest } from 'src/apis/userList';

export default function DetailUserList() {

    //                    state                    //
    // const {loginUserRole} = useUserStore();
    const [cookies] = useCookies();
    const { userId } = useParams();
    // const [userId, setUserId] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [nickName, setNickName] = useState<string>('');
    const [joinDate, setJoinDate] = useState<string>('');

    //                    function                    //
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

        const { userId, userEmail, nickName, joinDate } = result as GetDetailUserListResponseDto;
        // setUserId(userId);
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


    //                    event handler                    //
    const onListClickHandler = () => {
        navigator(ADMIN_USER_LIST_ABSOLUTE_PATH);
    }

    const onDeleteClickHandler = () => {
        if (!userId || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteUserRequest(userId, cookies.accessToken) 
        .then(deleteUserListResponse)
    }

    
    //                    effect                    //
    useEffect(() => {
        if (!userId || !cookies.accessToken) return;

        getDetailUserListRequest(userId, cookies.accessToken).then(getDetailUserListResponse);
    }, []);

    //                    render                    //
    return (
        <div>
            <div className="title-text">회원 상세 목록</div>
            <div className='detail-user-container'>
            <div className="user-detail-box">
              <div className='user-detail-title'>아이디</div>
              <div className='user-detail-id'>{userId}</div>
              <div className='user-detail-title'>이메일</div>
              <div className='user-detail-email'>{userEmail}</div>
              <div className='user-detail-title'>닉네임</div>
              <div className='user-detail-nickname'>{nickName}</div>
              <div className='user-detail-title'>가입날짜</div>
              <div className='user-detail-join-date'>{joinDate}</div>
            </div>
            <div className='primary-button' onClick={onListClickHandler}>목록보기</div>
            <div className='error-button' onClick={onDeleteClickHandler}>삭제</div>
          </div>
        </div>
    )
}