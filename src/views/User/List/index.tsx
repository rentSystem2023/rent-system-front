import React from 'react'
import "./style.css";
import ServiceContainer from 'src/layouts/ServiceContainer';

function SideBar () {
    return (
        <>
            <div className="side-navigation-container">
                <div>
                    <div className="side-navigation-item">지역 평균</div>
                </div>
                <div>
                    <div className="side-navigation-item">비율 계산</div>
                </div>
                <div>
                    <div className="side-navigation-item">Q&A 게시판</div>
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
