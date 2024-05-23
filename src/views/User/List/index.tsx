import React from 'react'
import ServiceContainer from 'src/layouts/ServiceContainer';

function SideBar () {
    return (
        <div className="side-navigation-container">
            <div>
                <div className="side-navigation-icon chart"></div>
                <div className="side-navigation-title">지역 평균</div>
            </div>
            <div>
                <div className="side-navigation-icon pie"></div>
                <div className="side-navigation-title">비율 계산</div>
            </div>
            <div>
                <div className="side-navigation-icon edit"></div>
                <div className="side-navigation-title">Q&A 게시판</div>
            </div>
        </div>
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
