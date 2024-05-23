import React from 'react'
import ServiceContainer from '../ServiceContainer';
import './style.css'
import QnaList from 'src/views/Board/qna';
import { Outlet } from 'react-router-dom';

function SideBar () {
    return (
        <>  
            <div className="side-navigation-container">
                <div className="side-navigation-item">
                    <div className="side-navigation-icon person"></div>
                    <div className="side-navigation-item-title">회원 관리</div>
                </div>
                <div className="side-navigation-item">
                    <div className="side-navigation-icon office"></div>
                    <div className="side-navigation-item-title">업체 관리</div>
                </div>
                <div className="side-navigation-item">
                    <div className="side-navigation-icon check"></div>
                    <div className="side-navigation-item-title">예약 관리</div>
                </div>
                <div className="side-navigation-item">
                    <div className="side-navigation-icon board"></div>
                    <div className="side-navigation-item-title">게시물 관리</div>
                </div>
            </div>
            <div className='main'>
                <div className='qna-list'>
                </div>
            </div>
        </>
    )
}

export default function BoardContainer() {

    return (
        <div id="wrapper">
            <SideBar/>
            <div className="main-container">
                <Outlet/>
            </div>
        </div>
    );
}
