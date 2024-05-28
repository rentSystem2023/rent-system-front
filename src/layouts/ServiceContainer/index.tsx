import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { AUTH_FIND_PASSWORD_ABSOLUTE_PATH, AUTH_SIGN_IN_ABSOLUTE_PATH, AUTH_SIGN_UP_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, NOTICE_LIST_ABSOLUTE_PATH, QNA_LIST_ABSOLUTE_PATH } from "src/constant";

// TODO: 로그인, 회원가입에 아이콘 넣어야함
function TopBar() {

    const navigator = useNavigate();
    const { pathname } = useLocation();

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

    return (
        <>
        <div className="logo-container" onClick={onLogoClickHandler}>로고</div>
        <div className="top-bar-container">
            <div className="top-bar-button">
            <div className="top-button" onClick={onNoticeClickHandler}>공지사항</div>
            <div className="top-button" onClick={onQnaClickHandler}>문의사항</div>
            </div>
            <div className="top-bar-button">
            <div className="top-button" onClick={onSignInClickHandler}>로그인</div>
            <div className="top-button" onClick={onSignUpClickHandler}>회원가입</div>
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
