import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router';
import { RESERVATION_CAR_ABSOLUTE_PATH } from 'src/constant';
import { CompanyListItem } from 'src/types';



    //                    component                    //
const LocationPopup = ({ onSelect, onClose, viewList }: { onSelect: (location: string) => void, onClose: () => void, viewList: CompanyListItem[] }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>위치 : 제주특별자치도 제주시 공항로 2 (용담2동)</h2>
                <div className="company-list"></div>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

    //                    component                    //
const DatePickerPopup = ({ onSelect, onClose }: { onSelect: (startDate: Date, endDate: Date) => void, onClose: () => void }) => {

    //                              state                              //
    const [startDate, setStartDate] = useState<Date | null>(new Date()); // 시작 날짜를 오늘로 초기화
    const [endDate, setEndDate] = useState<Date | null>(new Date()); // 종료 날짜를 오늘로 초기화
    const startDateInputRef = useRef<HTMLInputElement>(null); // 시작 날짜 input 엘리먼트에 대한 참조 생성


    //                   effect                      //
    useEffect(() => {
        // 시작 날짜 input 엘리먼트에 포커스를 줌
        if (startDateInputRef.current) {
            startDateInputRef.current.focus();
        }
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

        //                              event Handler                              //
    // 시작 날짜 변경 이벤트 핸들러
    const handleStartDateSelecthandler = (date: Date) => {
        setStartDate(date);

        // 종료 날짜와 시작 날짜가 같거나 이전인 경우 종료 날짜를 null로 설정
        if (endDate && date.getTime() >= endDate.getTime()) {
            setEndDate(null);
        }
    };

    // 종료 날짜 변경 이벤트 핸들러
    const handleEndDateSelecthandler = (date: Date) => {
        setEndDate(date);
        
        // 시작 날짜와 종료 날짜가 같거나 이전인 경우 시작 날짜를 null로 설정
        if (startDate && date.getTime() <= startDate.getTime()) {
            setStartDate(null);
        }
    };

    const handleConfirmhandler = () => {
        const today = new Date(); // 현재 날짜 및 시간 가져오기
        const maxEndDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // 최대 30일 이후의 날짜 계산

        // 시작 날짜가 오늘 이후이고 종료 날짜가 오늘 이후이며 최대 30일 이내인 경우에만 처리
        if (startDate && endDate && startDate >= today && endDate <= maxEndDate) {
            onSelect(startDate, endDate);
            onClose();
        } else {
            alert("당일 예약은 불가능하며, 오늘 날짜 기준으로 최대 30일 이내여야 합니다.");
        }
    };
    //                              render                              //
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>날짜 선택</h2>
                <div>
                    <span>시작 날짜: </span>
                    <input ref={startDateInputRef} type="date" value={startDate?.toISOString().split('T')[0]} min={new Date().toISOString().split('T')[0]} onChange={(e) => handleStartDateSelecthandler(new Date(e.target.value))} />
                </div>
                <div>
                    <span>종료 날짜: </span>
                    <input type="date" value={endDate?.toISOString().split('T')[0]} min={startDate ? startDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} onChange={(e) => handleEndDateSelecthandler(new Date(e.target.value))} />
                </div>
                <div>대여 시간은 12:00 ~ 12:00(24시기준)</div>
                <button onClick={handleConfirmhandler}>확인</button>
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
};
    //                    component                    //
export default function Main() {

        //                   state                          //
    const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

    
    const navigator = useNavigate();

    //              event handler                           
    const onSearchButtonClickHandler = () => {
        if ( !selectedStartDate || !selectedEndDate) {
            alert("위치와 날짜를 선택하세요.");
            return;
        }
        navigator(RESERVATION_CAR_ABSOLUTE_PATH);
    };

    const LocationSelecthandler = (location: string) => {
        setSelectedLocation(location);
        setIsLocationPopupOpen(false);
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

    const onDateSelectHandler = (startDate: Date, endDate: Date) => {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
        setIsDatePickerOpen(false);
    };
    //                              render                              //
    return (
        <div id="main-page-wrapper">
            <div className="main-container-box">
                <div className="top-image jeju"></div>
                <div className="container-box">
                    <div className="search-box">
                        <div className="search-select-box">
                            <div className="search-select-item" onClick={openLocationPopupHandler}>
                                {selectedLocation || "제주공항"}
                            </div>
                            <div className="search-select-item" onClick={openDatePickerHandler}>
                                {selectedStartDate && selectedEndDate ? `${selectedStartDate.getFullYear()}.${(selectedStartDate.getMonth() + 1).toString().padStart(2, '0')}.${selectedStartDate.getDate()} ~ ${selectedEndDate.getFullYear()}.${(selectedEndDate.getMonth() + 1).toString().padStart(2, '0')}.${selectedEndDate.getDate()}` : "날짜선택"}
                            </div>
                        </div>
                        <div className="car-search-button" onClick={onSearchButtonClickHandler}>차량검색</div>
                    </div>
                    <div className="popular-car-box">
                        <div className="popular-car-card">카드</div>
                        <div className="popular-car-card">카드</div>
                    </div>
                </div>
            </div>
            {isLocationPopupOpen && <LocationPopup onSelect={LocationSelecthandler} onClose={closeLocationPopupHandler} viewList={[]} />}
            {isDatePickerOpen && <DatePickerPopup onSelect={onDateSelectHandler} onClose={closeDatePickerHandler} />}
        </div>
    );
}