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
import { useCookies } from 'react-cookie';

function ListItem ({
    carImageUrl,
    carName,
    reservationCount
}: PopularCarListItem) {

    //                    function                    //
    return (
        <div className='popular-car-list-wrap'>
            <div className='popular-car-image'>
                <img style={{ width: '280%', height: '140%'}} src={carImageUrl} />
            </div>

            <div style={{border: '1px solid rgba(238, 238, 238, 1)', width: '100%'}}></div>

            <div className='popular-car-info-list'>
                {/* <div className='popular-car-info-contents-carname'>
                    <div className='poppular-car-company'>{carRentCompany}</div>
                </div> */}
                <div className='popular-car-info-container'>
                    <div className='popular-car-info-contents'>
                        <div className='popular-car-title'>차량명</div>
                        <div className='notice-detail-info-divider'>{'\|'}</div>
                        <div className='popular-car-content'>{carName}</div>
                    </div>
                    <div className='popular-car-info-contents'>
                        <div className='popular-car-title'>차량 예약 수</div>
                        <div className='notice-detail-info-divider'>{'\|'}</div>
                        <div className='popular-car-content'>{reservationCount}</div>
                    </div>
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
    const [cookies] = useCookies();
    const [popularList, setPopularCarList] = useState<PopularCarListItem[]>([]);

const handlePopularCarListResponse = (result: GetReservationPopularListResponseDto | ResponseDto | null) => {
    if (!result || result.code !== 'SU') {
        // 처리할 오류가 있는 경우
        return;
    }
    // Popular Car 목록을 업데이트
    const { popularList } = result as GetReservationPopularListResponseDto;
    setPopularCarList(popularList);
};

//                  event handler                   //
    const onSearchButtonClickHandler = () => {
        if (!reservationStart || !reservationEnd) {
            alert("위치와 날짜를 선택하세요.");
            return;
        }
        navigator(RESERVATION_CAR_ABSOLUTE_PATH);
    };

    const closeLocationPopupHandler = () => {
        setIsLocationPopupOpen(false);
    };

    const openLocationPopupHandler = () => {
        setIsLocationPopupOpen(true);
    };

    const openDatePickerHandler = () => {
        setIsDatePickerOpen(true);
    };

    const closeDatePickerHandler = () => {
        setIsDatePickerOpen(false);
    };


    //                  effect                        //
    useEffect(() => {
        getReservationPopularListRequest().then(handlePopularCarListResponse);
    }, [reservationStart, reservationEnd]); // reservationStart, reservationEnd가 변경될 때마다 실행

        
    //                    render                    //
    return (
        <div id="main-page-wrapper">
            <div className="main-container-box">
                <div className="top-image jeju"></div>
                <div className="container-box">
                    <div className="search-box">
                        <div className="search-select-box">
                            <div className="search-select-item location" onClick={openLocationPopupHandler}>
                                <div className='location-image'></div>
                                <div className='location-title'>{address || "제주공항"}</div>
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

                    <div className="popular-car-list-box">
                    {popularList.map((item, index) => <ListItem key={index} {...item} />)}
                    </div>

                </div>
            </div>
            {isLocationPopupOpen && <LocationPopup onClose={closeLocationPopupHandler} viewList={[]} />}
            {isDatePickerOpen && <DatePickerPopup onClose={closeDatePickerHandler} />}
        </div>
    );
}