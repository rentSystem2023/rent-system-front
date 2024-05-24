import React from 'react'
import './style.css'

export default function Main() {
    return (
        <div id="main-page-wrapper">
            <div className="main-container-box">
                <div className="top-image jeju"></div>
                <div className="container-box">
                    <div className="search-box">
                        검색바
                    </div>
                    <div className="popular-car-box">
                        <div className="popular-car-card">카드</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
