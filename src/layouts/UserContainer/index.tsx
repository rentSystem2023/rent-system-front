import React, { useEffect, useState } from 'react';
import './style.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { USER_INFO_ABSOLUTE_PATH, USER_QNA_ABSOLUTE_PATH, USER_RESERVATION_ABSOLUTE_PATH } from 'src/constant';

type Path = '회원 정보' | '예약 내역' | '문의 내역' | '' ;

interface Props {
  path: Path;
}

function UserSideBar({ path } : Props) {

  const myInfoClass = `user-side-navigation-item${path === '회원 정보' ? ' active' : ''}`;
  const reservationClass = `user-side-navigation-item${path === '예약 내역' ? ' active' : ''}`;
  const boardClass = `user-side-navigation-item${path === '문의 내역' ? ' active' : ''}`;

  const navigator = useNavigate();

  const onUserClickHandler = () => navigator(USER_INFO_ABSOLUTE_PATH);
  const onReservationClickHandler = () => navigator(USER_RESERVATION_ABSOLUTE_PATH);
  const onBoardClickHandler = () => navigator(USER_QNA_ABSOLUTE_PATH);

  return(
    <>   
    <div className="user-side-navigation-container">
        <div className={myInfoClass} onClick={onUserClickHandler}>
          <div className="user-side-navigation-icon person"></div>
          <div className="user-side-navigation-item-title">회원 정보</div>
        </div>
        <div className={reservationClass} onClick={onReservationClickHandler}>
          <div className="user-side-navigation-icon car"></div>
          <div className="user-side-navigation-item-title">예약 내역</div>
        </div>
        <div className={boardClass} onClick={onBoardClickHandler}>
          <div className="user-side-navigation-icon board"></div>
          <div className="user-side-navigation-item-title">문의 내역</div>
        </div>
      </div>
    </>
  );
}

export default function UserContainer() {

  const { pathname } = useLocation();
  const [path, setPath] = useState<Path>('');

  useEffect(() => {
    const path = 
        pathname.startsWith(USER_INFO_ABSOLUTE_PATH) ? '회원 정보' :
        pathname.startsWith(USER_RESERVATION_ABSOLUTE_PATH) ? '예약 내역' :
        pathname === USER_QNA_ABSOLUTE_PATH ? '문의 내역' : '';

    setPath(path);
}, [pathname]);

  return (
    <>
    <div className='title-text'>마이페이지</div>
    <div id="user-wrapper">
      <UserSideBar path={path} />
      <div className="user-main">
        <Outlet/>
      </div>
    </div>
    </>
  )
}
