import React, { useEffect, useState } from 'react'
import "./style.css";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_COMPANY_LIST_ABSOLUTE_PATH, ADMIN_NOTICE_LIST_ABSOLUTE_PATH, ADMIN_QNA_LIST_ABSOLUTE_PATH, ADMIN_RESERVATION_LIST_ABSOLUTE_PATH, ADMIN_USER_LIST_ABSOLUTE_PATH } from 'src/constant';

type Path = '회원 관리' | '업체 관리' | '예약 관리' | '' ;
interface Props {
    path: Path;
}

function SideBar ({ path } : Props) {

    const [boardItem, setBoardItem] = useState(false);

    const userClass = `admin-side-navigation-item${path === '회원 관리' ? ' active' : ''}`;
    const companyClass = `admin-side-navigation-item${path === '업체 관리' ? ' active' : ''}`;
    const reservationClass = `admin-side-navigation-item${path === '예약 관리' ? ' active' : ''}`;
    // const boardClass = `admin-side-navigation-item${path === '게시판 관리' || path === '공지사항 관리' || path === 'Q&A 관리' ? ' active' : ''}`;
    // const noticeBoardClass = `admin-side-navigation-sub-item${path === '공지사항 관리' ? ' active' : ''}`;
    // const qnaBoardClass = `admin-side-navigation-sub-item${path === 'Q&A 관리' ? ' active' : ''}`;

    const navigator = useNavigate();

    const onUserClickHandler = () => navigator(ADMIN_USER_LIST_ABSOLUTE_PATH);
    const onCompanyClickHandler = () => navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
    const onReservationClickHandler = () => navigator(ADMIN_RESERVATION_LIST_ABSOLUTE_PATH);
    const onBoardClickHandler = () => {
        setBoardItem(!boardItem);
    navigator(ADMIN_NOTICE_LIST_ABSOLUTE_PATH);
    }
    const onBoardNoticeClickHandler = () => navigator(ADMIN_NOTICE_LIST_ABSOLUTE_PATH);
    const onBoardQnaClickHandler = () => navigator(ADMIN_QNA_LIST_ABSOLUTE_PATH);

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
            {/* <div className={boardClass} onClick={onBoardClickHandler}>
                <div className="admin-side-navigation-icon board"></div>
                <div className="admin-side-navigation-item-title">게시판 관리</div>
            </div>
            {boardItem && (
            <div className="admin-side-navigation-sub-item">
                <div className={noticeBoardClass} onClick={onBoardNoticeClickHandler}>
                    <div className="admin-side-navigation-sub-item-title">공지사항 관리</div>
                </div>
                <div className={qnaBoardClass} onClick={onBoardQnaClickHandler}>
                    <div className="admin-side-navigation-sub-item-title">Q&A 관리</div>
                </div>
            </div>
            )} */}
        </div>
    )
}

export default function AdminContainer() {

    const { pathname } = useLocation();
    const [path, setPath] = useState<Path>('회원 관리');

    useEffect(() => {
        const path = 
            pathname === ADMIN_USER_LIST_ABSOLUTE_PATH ? '회원 관리' :
            pathname === ADMIN_COMPANY_LIST_ABSOLUTE_PATH ? '업체 관리' :
            pathname === ADMIN_RESERVATION_LIST_ABSOLUTE_PATH ? '예약 관리' : '';
            // pathname === ADMIN_NOTICE_LIST_ABSOLUTE_PATH ? '공지사항 관리' : 
            // pathname === ADMIN_QNA_LIST_ABSOLUTE_PATH ? 'Q&A 관리' : '';
    
        setPath(path);
    }, [pathname]);

    return (
        <div id='admin-wrapper'>
            <SideBar path={path}/>
            <div className='admin-main'>
                <Outlet />
            </div>
        </div>
    )
}
