import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useReservationStore } from "src/stores";
import { getYYYYMMDD } from "src/utils";

import './style.css'

//                    component                    //
export const DatePickerPopup = ({ onClose }: { onClose: () => void }) => {

    //                              state                              //
    const { reservationStart, reservationEnd, setReservationStart, setReservationEnd } = useReservationStore();
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
    const handleStartDateSelecthandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const date = new Date(value);
        setStartDate(date);
        setReservationStart(value);

        // 종료 날짜와 시작 날짜가 같거나 이전인 경우 종료 날짜를 null로 설정
        if (endDate && date.getTime() >= endDate.getTime()) {
            setEndDate(null);
        }
    };

    // 종료 날짜 변경 이벤트 핸들러
    const handleEndDateSelecthandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const date = new Date(value);
        setEndDate(date);
        setReservationEnd(value);
        
        // 시작 날짜와 종료 날짜가 같거나 이전인 경우 시작 날짜를 null로 설정
        if (startDate && date.getTime() <= startDate.getTime()) {
            setStartDate(null);
        }
    };

    const handleConfirmhandler = () => {
        const today = new Date(); // 현재 날짜 및 시간 가져오기
        const maxEndDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // 최대 30일 이후의 날짜 계산

        // 시작 날짜가 오늘 이후이고 종료 날짜가 오늘 이후이며 최대 30일 이내인 경우에만 처리
        console.log(startDate);
        console.log(endDate);
        console.log(today);
        console.log(maxEndDate);
        if (startDate && endDate && startDate >= today && endDate <= maxEndDate) {
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
                    <input ref={startDateInputRef} type="date" value={reservationStart} min={getYYYYMMDD(new Date())} onChange={handleStartDateSelecthandler} />
                </div>
                <div>
                    <span>종료 날짜: </span>
                    <input type="date" value={reservationEnd} min={getYYYYMMDD(new Date())} onChange={handleEndDateSelecthandler} />
                </div>
                <div>대여 시간은 12:00 ~ 12:00(24시기준)</div>
                <button onClick={handleConfirmhandler}>확인</button>
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
};