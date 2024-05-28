import React from 'react';
import './style.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { USER_INFO_ABSOLUTE_PATH, USER_QNA_ABSOLUTE_PATH, USER_RESERVATION_ABSOLUTE_PATH } from 'src/constant';

function UserSideBar() {

  const navigator = useNavigate();
  const { pathname } = useLocation();

  const onUserClickHandler = () => navigator(USER_INFO_ABSOLUTE_PATH);
  const onReservationClickHandler = () => navigator(USER_RESERVATION_ABSOLUTE_PATH);
  const onBoardClickHandler = () => navigator(USER_QNA_ABSOLUTE_PATH);


  return(
    <div className="side-navigation-container">
            <div className="side-navigation-item">
                <div className="side-navigation-icon person"></div>
                <div className="side-navigation-item-title" onClick={onUserClickHandler}>내 정보</div>
            </div>
            <div className="side-navigation-item">
                <div className="side-navigation-icon office"></div>
                <div className="side-navigation-item-title" onClick={onReservationClickHandler}>예약 내역</div>
            </div>
            <div className="side-navigation-item">
                <div className="side-navigation-icon board"></div>
                <div className="side-navigation-item-title" onClick={onBoardClickHandler}>문의 내역</div>
            </div>
        </div>
  );
}

export default function UserContainer() {
  return (
    <div id="user-wrapper">
      <UserSideBar />
      <div id="user-main">
        <Outlet/>
      </div>
    </div>
  )
}
