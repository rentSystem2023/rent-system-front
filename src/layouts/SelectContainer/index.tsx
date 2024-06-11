import React, { useState } from 'react'
import './style.css'
import { Outlet, useNavigate } from 'react-router';
import { RESERVATION_CAR_ABSOLUTE_PATH } from 'src/constant';
import { useReservationStore } from 'src/stores';
import { DatePickerPopup } from 'src/components/DatePickerPopup';
import { LocationPopup } from 'src/components/LocationPopup';

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

    return (
        <div id="reservation-search-wrapper">
            <div className='reservation-container'>
                <div className="search-box">
                    <div className="search-select-box">
                            <div className="search-select-item" onClick={openLocationPopupHandler}>
                                {address || "제주공항"}
                            </div>
                            <div className="search-select-item" onClick={openDatePickerHandler}>
                                {reservationStart && reservationEnd ? `${reservationStart} ~ ${reservationEnd}` : "날짜선택"}
                            </div>
                    </div>
                    <div className="car-search-button" onClick={onSearchButtonClickHandler}>차량검색</div>
                </div>            
            </div>
            {isLocationPopupOpen && <LocationPopup onClose={closeLocationPopupHandler} viewList={[]} />}
            {isDatePickerOpen && <DatePickerPopup onClose={closeDatePickerHandler} />}
            <div className="main-container">
                <Outlet />
            </div>
        </div>
    )
}
