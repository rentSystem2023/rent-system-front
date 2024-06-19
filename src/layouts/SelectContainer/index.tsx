import React, { useState } from 'react'
import './style.css'
import { Outlet, useNavigate } from 'react-router';
import { RESERVATION_CAR_ABSOLUTE_PATH, RESERVATION_COMPANY_ABSOLUTE_PATH } from 'src/constant';
import { useReservationStore } from 'src/stores';
import { DatePickerPopup } from 'src/components/DatePickerPopup';

export default function SelectContainer() {

    const { address, reservationStart, reservationEnd } = useReservationStore();
    const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const navigator = useNavigate();
    const openDatePickerHandler = () => {
        setIsDatePickerOpen(true);
    };

    const closeDatePickerHandler = () => {
        setIsDatePickerOpen(false);
    };

    const openLocationPopupHandler = () => {
        setIsLocationPopupOpen(true);
    };

    const closeLocationPopupHandler = () => {
        setIsLocationPopupOpen(false);
    };
    
    const onSearchButtonClickHandler = () => navigator(RESERVATION_CAR_ABSOLUTE_PATH);

    // const onSearchButtonClickHandler = () => {
    //     const currentPath = location.pathname;
    //     if (currentPath === RESERVATION_CAR_ABSOLUTE_PATH) {
    //         navigator(RESERVATION_CAR_ABSOLUTE_PATH);
    //     } else if (currentPath === RESERVATION_COMPANY_ABSOLUTE_PATH) {
    //         navigator(RESERVATION_COMPANY_ABSOLUTE_PATH);
    //     }
    // };

    return (
        <div id="reservation-search-wrapper">
            <div className='reservation-container'>
                <div className="search-box">
                    <div className="search-select-box">
                        <div className="search-select-item location" onClick={openLocationPopupHandler}>
                            <div className='location-image'></div>
                            <div className='location-title'>{address || "제주국제공항"}</div>
                        </div>
                        <div className="search-select-item date" onClick={openDatePickerHandler}>                                
                            <div className='date-image'></div>
                            {reservationStart && reservationEnd ? 
                                <div className='search-date-wrap'>
                                    <div className='search-date-title'>{reservationStart}</div>
                                    <div className='search-date-emo'>{'~'}</div>
                                    <div className='search-date-title'>{reservationEnd}</div>
                                </div> 
                                : "날짜선택"
                            }
                    </div>
                    </div>
                    <div className="car-search-button" onClick={onSearchButtonClickHandler}>차량검색</div>
                </div>      
            </div>
            {isDatePickerOpen && <DatePickerPopup onClose={closeDatePickerHandler} />}
            <div className="main-container">
                <Outlet />
            </div>
        </div>
    )
}
