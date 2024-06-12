import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import './style.css';
import { useNavigate } from 'react-router';
import { COUNT_PER_SECTION, RESERVATION_CAR_ABSOLUTE_PATH } from 'src/constant';
import { CompanyListItem, PopularCarListItem, ReservationCarViewListItem } from 'src/types';
import { getYYYYMMDD } from 'src/utils';
import { useReservationStore } from 'src/stores';
import { DatePickerPopup } from 'src/components/DatePickerPopup';
import { LocationPopup } from 'src/components/LocationPopup';
import { GetReservationPopularListResponseDto } from 'src/apis/reservation/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getReservationPopularListRequest } from 'src/apis/reservation';
function ListItem ({
    carImageUrl,
    carName
}: PopularCarListItem) {

    //                    function                    //
    const navigator = useNavigate();
    return (
        <div className='car-list-card'>
            <div className='car-name-wrap'>
                <div className='car-image'>
                    <img src={carImageUrl} alt={carName} />
                </div>
            </div>
        </div>
    );
}

    //                    component                    //
    export default function Main() {
        const { address, reservationStart, reservationEnd } = useReservationStore();
        const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);
        const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
        const navigator = useNavigate();


    //                  effect                        //

 

    //                  event handler                   //
        const onSearchButtonClickHandler = () => {
            if (!reservationStart || !reservationEnd) {
                alert("위치와 날짜를 선택하세요.");
                return;
            }
            navigator(RESERVATION_CAR_ABSOLUTE_PATH);
        };
    
        const openLocationPopupHandler = () => {
            setIsLocationPopupOpen(true);
        };
    
        const closeLocationPopupHandler = () => {
            setIsLocationPopupOpen(false);
        };
    
        const openDatePickerHandler = () => {
            setIsDatePickerOpen(true);
        };
    
        const closeDatePickerHandler = () => {
            setIsDatePickerOpen(false);
        };
            //                    effect                    //

            
        //                    render                    //
        return (
            <div id="main-page-wrapper">
                <div className="main-container-box">
                    <div className="top-image jeju"></div>
                    <div className="container-box">
                        <div className="search-box">
                            <div className="search-select-box">
                                <div className="search-select-item" onClick={openLocationPopupHandler}>
                                    {address || "제주공항"}
                                </div>
                                <div className="search-select-item" onClick={openDatePickerHandler}>
                                    {reservationStart && reservationEnd ? `날짜선택` : "날짜선택"}
                                </div>
                            </div>
                            <div className="car-search-button" onClick={onSearchButtonClickHandler}>차량검색</div>
                        </div>
                        <div className="popular-car-box">

                        </div>
                    </div>
                </div>
                {isLocationPopupOpen && <LocationPopup onClose={closeLocationPopupHandler} viewList={[]} />}
                {isDatePickerOpen && <DatePickerPopup onClose={closeDatePickerHandler} />}
            </div>
        );
    }