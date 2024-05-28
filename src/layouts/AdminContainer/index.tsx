import React, { useEffect, useState } from 'react'
import "./style.css";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_COMPANY_LIST_ABSOLUTE_PATH, ADMIN_QNA_LIST_ABSOLUTE_PATH, ADMIN_RESERVATION_LIST_ABSOLUTE_PATH, ADMIN_USER_LIST_ABSOLUTE_PATH } from 'src/constant';
import path from 'path';

type Path = '회원 관리' | '업체 관리' | '예약 관리' | '게시판 관리' | ''; 
interface Props {
    path: Path;
}

function SideBar ({ path } : Props) {

    const userClass = `admin-side-navigation-item${path === '회원 관리' ? ' active' : ''}`;
    const companyClass = `admin-side-navigation-item${path === '업체 관리' ? ' active' : ''}`;
    const reservationClass = `admin-side-navigation-item${path === '예약 관리' ? ' active' : ''}`;
    const boardClass = `admin-side-navigation-item${path === '게시판 관리' ? ' active' : ''}`;

    const navigator = useNavigate();

    const onUserClickHandler = () => navigator(ADMIN_USER_LIST_ABSOLUTE_PATH);
    const onCompanyClickHandler = () => navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
    const onReservationClickHandler = () => navigator(ADMIN_RESERVATION_LIST_ABSOLUTE_PATH);
    const onBoardClickHandler = () => navigator(ADMIN_QNA_LIST_ABSOLUTE_PATH);

    return (
        <div className="admin-side-navigation-container">
            <div className={userClass} onClick={onUserClickHandler}>
                <div className="admin-side-navigation-icon person"></div>
                <div className="admin-side-navigation-item-title">회원 관리</div>
            </div>
            <div className={companyClass} onClick={onCompanyClickHandler}>
                <div className="admin-side-navigation-icon office"></div>
                <div className="admin-side-navigation-item-title">업체 관리</div>
            </div>
            <div className={reservationClass} onClick={onReservationClickHandler}>
                <div className="admin-side-navigation-icon check"></div>
                <div className="admin-side-navigation-item-title">예약 관리</div>
            </div>
            <div className={boardClass} onClick={onBoardClickHandler}>
                <div className="admin-side-navigation-icon board"></div>
                <div className="admin-side-navigation-item-title">게시판 관리</div>
            </div>
        </div>
    )
}

export default function AdminContainer() {

    const { pathname } = useLocation();
    const [path, setPath] = useState<Path>('');

    useEffect(() => {
        const path = 
            pathname === ADMIN_USER_LIST_ABSOLUTE_PATH ? '회원 관리' :
            pathname === ADMIN_COMPANY_LIST_ABSOLUTE_PATH ? '업체 관리' :
            pathname === ADMIN_RESERVATION_LIST_ABSOLUTE_PATH ? '예약 관리' : 
            pathname === ADMIN_QNA_LIST_ABSOLUTE_PATH ? '게시판 관리' : '';
    
        setPath(path);
    }, [pathname]);

    return (
        <div id='admin-wrapper'>
            <SideBar path={path}/>
            <div id='admin-main'>
                <Outlet />
            </div>
        </div>
    )
}
