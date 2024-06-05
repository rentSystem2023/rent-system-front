import React, { useEffect, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { RESERVATION_CAR_ABSOLUTE_PATH } from 'src/constant';

export default function Main() {

    //                    state                    //
    
    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onSearchButtonClickHandler = () => navigator(RESERVATION_CAR_ABSOLUTE_PATH);


    //                    render                    //

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
                        <div className="car-search-button" onClick={onSearchButtonClickHandler}>차량검색</div>
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
