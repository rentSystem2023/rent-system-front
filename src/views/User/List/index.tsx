import React from 'react'
import "./style.css";
import ServiceContainer from 'src/layouts/ServiceContainer';

function SideBar () {
    return (
        <>
            <div id="user-list-wrapper">
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
            </div>
        </>
    )
}

export default function UserList() {
    return (
        <div>
            <ServiceContainer/>
            <SideBar/>
        </div>
    )
}
