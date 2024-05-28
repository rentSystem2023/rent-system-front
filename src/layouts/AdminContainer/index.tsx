import React from 'react'
import "./style.css";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_COMPANY_LIST_ABSOLUTE_PATH, ADMIN_QNA_LIST_ABSOLUTE_PATH, ADMIN_RESERVATION_LIST_ABSOLUTE_PATH, ADMIN_USER_LIST_ABSOLUTE_PATH } from 'src/constant';

type Path = '회원 관리' | '업체 관리' | '예약 관리' | '게시물 관리' | ''; 

function SideBar () {

    const navigator = useNavigate();
    const { pathname } = useLocation();

    const onUserClickHandler = () => navigator(ADMIN_USER_LIST_ABSOLUTE_PATH);
    const onCompanyClickHandler = () => navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
    const onReservationClickHandler = () => navigator(ADMIN_RESERVATION_LIST_ABSOLUTE_PATH);
    const onBoardClickHandler = () => navigator(ADMIN_QNA_LIST_ABSOLUTE_PATH);

    return (
        <div className="side-navigation-container">
            <div className="side-navigation-item">
                <div className="side-navigation-icon person"></div>
                <div className="side-navigation-item-title" onClick={onUserClickHandler}>회원 관리</div>
            </div>
            <div className="side-navigation-item">
                <div className="side-navigation-icon office"></div>
                <div className="side-navigation-item-title" onClick={onCompanyClickHandler}>업체 관리</div>
            </div>
            <div className="side-navigation-item">
                <div className="side-navigation-icon check"></div>
                <div className="side-navigation-item-title" onClick={onReservationClickHandler}>예약 관리</div>
            </div>
            <div className="side-navigation-item">
                <div className="side-navigation-icon board"></div>
                <div className="side-navigation-item-title" onClick={onBoardClickHandler}>게시물 관리</div>
            </div>
        </div>
    )
}

export default function AdminContainer() {
    return (
        <div id='admin-wrapper'>
            <SideBar/>
            <div id='admin-main'>
                <Outlet />
            </div>
        </div>
    )
}
