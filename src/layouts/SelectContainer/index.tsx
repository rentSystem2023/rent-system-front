import React from 'react'
import './style.css'
import { Outlet, useNavigate } from 'react-router';
import { RESERVATION_CAR_ABSOLUTE_PATH } from 'src/constant';

export default function SelectContainer() {
    const navigator = useNavigate();

    
    const onSearchButtonClickHandler = () => navigator(RESERVATION_CAR_ABSOLUTE_PATH);

    return (
        <div id="reservation-search-wrapper">
            <div className="search-box">
                <div className="search-select-box">
                    <div className="search-select-item">위치선택</div>
                    <div className="search-select-item">날짜선택</div>
                </div>
                <div className="car-search-button" onClick={onSearchButtonClickHandler}>차량검색</div>
            </div>
            <div className="main-container">
            <Outlet />
            </div>
        </div>
    )
}
