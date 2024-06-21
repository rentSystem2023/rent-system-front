import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import './style.css';
import { useNavigate } from 'react-router';
import { RESERVATION_CAR_ABSOLUTE_PATH } from 'src/constant';
import { PopularCarListItem } from 'src/types';
import { useReservationStore } from 'src/stores';
import { DatePickerPopup } from 'src/components/DatePickerPopup';
import { GetReservationPopularListResponseDto } from 'src/apis/reservation/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getReservationPopularListRequest } from 'src/apis/reservation';
import { useCookies } from 'react-cookie';

    //                    component                    //
function ListItem ({
    carImageUrl,
    carName,
    totalReservationCount
}: PopularCarListItem) {

    //                    function                     //
    const navigator = useNavigate();

    //                event handler                    //
        const popularOnClickHandler = () => {

        };

    //                    Render                       //
    return (
        <div className='popular-car-list-wrap'>
            <div className='popular-car-image'>
                <img style={{ width: '280%', height: '140%'}} src={carImageUrl} />
            </div>

            <div style={{border: '1px solid rgba(238, 238, 238, 1)', width: '100%'}}></div>

            <div className='popular-car-info-list'>
                <div className='popular-car-info-container'>
                    <div className='popular-car-info-contents'>
                        <div className='popular-car-title'>차량명</div>
                        <div className='notice-detail-info-divider'>{'\|'}</div>
                        <div className='popular-car-content'>{carName}</div>
                    </div>
                    <div className='popular-car-info-contents'>
                        <div className='popular-car-title'>차량 예약 수</div>
                        <div className='notice-detail-info-divider'>{'\|'}</div>
                        <div className='popular-car-content'>{totalReservationCount}</div>
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

    const [currentSlide, setCurrentSlide] = useState(0);
const handlePopularCarListResponse = (result: GetReservationPopularListResponseDto | ResponseDto | null) => {
    if (!result || result.code !== 'SU') {
        return;
    }
    const { popularList } = result as GetReservationPopularListResponseDto;
    setPopularCarList(popularList);
};

    //                event handler                    //
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

    const openDatePickerHandler = () => {
        setIsDatePickerOpen(true);
    };

    const closeDatePickerHandler = () => {
        setIsDatePickerOpen(false);
    };
    
    const nextSlide = () => {
        if (currentSlide < Math.ceil(popularList.length / 4) - 1) {
            setCurrentSlide((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
        }
    };


    //                    effect                       //
    useEffect(() => {
        getReservationPopularListRequest().then(handlePopularCarListResponse);
    }, [reservationStart, reservationEnd]);

    //                    Render                       //
    return (
        <div id="main-page-wrapper">
            <div className="main-container-box">
                <div className="top-image jeju"></div>
                <div className="container-box">
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
                    <div className='popular-car-wrap'>
                        <div className='popular-car-title-container'>
                            <div className='popular-car-list-image'></div>
                            <div className='popular-car-list-title'>차탕갑서 인기차량</div>
                        </div>
                        <div className="popular-car-slider">
                            <div className='popular-car-page-left' onClick={prevSlide}></div>
                            <div className="popular-car-list-box">
                                {popularList.slice(currentSlide * 4, currentSlide * 4 + 4).map((item, index) => (
                                    <ListItem key={index} {...item} />
                                ))}
                            </div>
                            <div className='popular-car-page-right' onClick={nextSlide}></div>
                        </div>
                    </div>
                </div>
            </div>
            {isDatePickerOpen && <DatePickerPopup onClose={closeDatePickerHandler} />}
        </div>
    );
}