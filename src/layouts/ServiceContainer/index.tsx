import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { ADMIN_USER_LIST_ABSOLUTE_PATH, AUTH_SIGN_IN_ABSOLUTE_PATH, AUTH_SIGN_UP_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, NOTICE_LIST_ABSOLUTE_PATH, QNA_LIST_ABSOLUTE_PATH, USER_INFO_ABSOLUTE_PATH } from "src/constant";
import { useUserStore } from "src/stores";
import { useCookies } from "react-cookie";
import { GetSignInUserResponseDto } from "src/apis/user/dto/response";
import ResponseDto from "src/apis/response.dto";
import { getSignInUserRequest } from "src/apis/user";

// TODO: 로그인, 회원가입에 아이콘 넣어야함
function TopBar() {

    const navigator = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const { pathname } = useLocation();
    const { loginUserRole, setLoginUserId, setLoginUserRole } = useUserStore();

    const getMyInfoResponse = (result: GetMyInfoResponseDto | ResponseDto | null) => {

        if (!result) return;

        const { nickName } = result as GetMyInfoResponseDto;
        setNickName(nickName);

    };
    
    useEffect (() => {
        if (!cookies.accessToken) return;

        getMyInfoRequest(cookies.accessToken).then(getMyInfoResponse);
    }, [cookies.accessToken]);

    // 로그아웃 처리 시 원래 있던 쿠키 값을 제거
    const onLogoutClickHandler = () => {
        removeCookie('accessToken', { path: '/' });
        setLoginUserId('');
        setLoginUserRole('');
        navigator(MAIN_ABSOLUTE_PATH);
    };

    const onLogoClickHandler = () => {
        if(pathname === MAIN_ABSOLUTE_PATH){
            window.location.reload();
        } else {
        navigator(MAIN_ABSOLUTE_PATH);}
    }        
    const onNoticeClickHandler = () => navigator(NOTICE_LIST_ABSOLUTE_PATH);
    const onQnaClickHandler = () => navigator(QNA_LIST_ABSOLUTE_PATH);
    const onSignInClickHandler = () => navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
    const onSignUpClickHandler = () => navigator(AUTH_SIGN_UP_ABSOLUTE_PATH);
    const onMyPageClickHandler = () => navigator(USER_INFO_ABSOLUTE_PATH);
    const onAdminPageClickHandler = () => navigator(ADMIN_USER_LIST_ABSOLUTE_PATH)

    return (
        <>
        <div className="logo-container" onClick={onLogoClickHandler}>로고</div>
        <div className="top-bar-container">
            <div className="top-bar-button">
            <div className="top-button" onClick={onNoticeClickHandler}>공지사항</div>
            <div className="top-button" onClick={onQnaClickHandler}>문의사항</div>
            </div>
            <div className="top-bar-button">
            {loginUserRole === 'ROLE_USER' &&
            <div className="top-bar-role">
                <div className="sign-in-wrapper">
                    <div className="user-mypage-button person"></div>
                    <div className="user-button" onClick={onMyPageClickHandler}>{}</div>
                </div>
                <div className="logout-button" onClick={onLogoutClickHandler}>로그아웃</div>
                
            </div>
            }
            {loginUserRole === 'ROLE_ADMIN' && 
                <div className="top-bar-role">
                    <div className="sign-in-wrapper">
                        <div className="user-mypage-button person"></div>
                        <div className="user-button" onClick={onAdminPageClickHandler}>관리자님</div>
                    </div>
                    <div className="logout-button" onClick={onLogoutClickHandler}>로그아웃</div>
                </div>
            }
            {loginUserRole !== 'ROLE_USER' && loginUserRole !== 'ROLE_ADMIN' && 
                <div className="top-button" onClick={onSignInClickHandler}>로그인</div>
            }
            {loginUserRole !== 'ROLE_USER' && loginUserRole !== 'ROLE_ADMIN' && 
                <div className="top-button" onClick={onSignUpClickHandler}>회원가입</div>
            }
            </div>
        </div>
        </>
    );
}

// TODO: 하단바에 넣을 내용 정해야함
function BottomBar() {
    return(
        <>
        <div className="bottom-container">
            <div>하단바</div>
        </div>
        </>
    );
}

    export default function ServiceContainer() {

    const { setLoginUserId, setLoginUserRole } = useUserStore();
    const navigator = useNavigate();
    const [cookies] = useCookies();
    
    const getSignInUserResponse = (result: GetSignInUserResponseDto | ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(MAIN_ABSOLUTE_PATH);
            return;
        }

        const { userId, userRole } = result as GetSignInUserResponseDto;
        setLoginUserId(userId);
        setLoginUserRole(userRole);
    };

    useEffect(() => {

        if (!cookies.accessToken) {
            navigator(MAIN_ABSOLUTE_PATH);
            return;
        }

        getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);

    }, [cookies.accessToken]);
    
    return (
        <div id="wrapper">
        <TopBar />
        <div className="main-container">
            <Outlet />
        </div>
        <BottomBar/>
        </div>
    );
}
