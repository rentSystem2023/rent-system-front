import React, { useEffect } from 'react'
import './style.css'

export default function Main() {
    return (
        <div id="main-page-wrapper">
            <div className="main-container-box">
                <div className="top-image jeju"></div>
                <div className="container-box">
                    <div className="search-box">
                        <div className="search-select-box">
                            <div className="search-select-item">위치선택</div>
                            <div className="search-select-item">날짜선택</div>
                        </div>
                        <div className="search-button">차량검색</div>
                    </div>
                    <div className="popular-car-box">
                        <div className="popular-car-card">카드</div>
                        <div className="popular-car-card">카드</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
