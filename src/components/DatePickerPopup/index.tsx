import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useReservationStore } from "src/stores";
import { getYYYYMMDD } from "src/utils";
import './style.css'

    //                    component                    //
export const DatePickerPopup = ({ onClose }: { onClose: () => void }) => {
    //                    state                        //
    const { reservationStart, reservationEnd, setReservationStart, setReservationEnd } = useReservationStore();

    const tomorrow =  new Date(new Date().setDate(new Date().getDate() + 1));

    const [startDate, setStartDate] = useState<Date | null>(tomorrow);
    const [endDate, setEndDate] = useState<Date | null>(tomorrow); 
    const startDateInputRef = useRef<HTMLInputElement>(null); 

    //                    effect                       //
    useEffect(() => {
        if (startDateInputRef.current) {
            startDateInputRef.current.focus();
        }
    }, []);

    //                  Event Handlers                   //
    const handleStartDateSelecthandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const date = new Date(value);
        setStartDate(date);
        setReservationStart(value);

        if (endDate && date.getTime() >= endDate.getTime()) {
            setEndDate(null);
            setReservationEnd('');
        }
    };

    const handleEndDateSelecthandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const date = new Date(value);
        setEndDate(date);
        setReservationEnd(value);
        
        if (startDate && date.getTime() <= startDate.getTime()) {
            setEndDate(null);
            setReservationEnd('');
        }
    };

    const handleConfirmhandler = () => {
        const today = new Date(); 
        const maxEndDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
        if (startDate && !endDate) {
            alert("당일 예약은 불가합니다.\r시작날짜와 종료날짜를 선택해주세요.");
            return; 
        }
    
        if (startDate && endDate) {
            if (startDate >= today && endDate <= maxEndDate) {
                if (startDate.toISOString().split('T')[0] === endDate.toISOString().split('T')[0]) {
                    alert("시작날짜와 종료날짜를 모두 선택해주세요.");
                    return;
                } else if (startDate.getTime() <= endDate.getTime()) {
                    onClose();
                }
            } else {
                alert("당일 예약은 불가능하며, 오늘 날짜 기준으로 최대 30일 이내여야 합니다.");
            }
        } else {
            alert("시작날짜와 종료날짜를 모두 선택해주세요.");
        }
    };

    //                    Render                       //
    return (
        <div className="date-popup-wrapper">
            <div className="date-popup-container">
                <div className="date-popup-top">날짜 선택</div>
                <div className="date-popup-contents">
                    <div className="date-popup-content">
                        <div className="date-popup-title">시작일</div>
                        <div className="date-popup-calender">
                        <input
                            className="date-calender"
                            ref={startDateInputRef} 
                            type="date" 
                            min={getYYYYMMDD(tomorrow)}
                            onChange={handleStartDateSelecthandler} 
                        />
                        </div>
                    </div>
                    <div className="date-popup-content">
                        <div className="date-popup-title">종료일</div>
                        <div className="date-popup-calender">
                            <input
                                className="date-calender"
                                type="date"  
                                min={startDate ? getYYYYMMDD(startDate) : getYYYYMMDD(tomorrow)} 
                                onChange={handleEndDateSelecthandler} 
                            />
                        </div>
                    </div>
                </div>
                <div className="date-popup-button">
                    <div className="primary-button choice" onClick={handleConfirmhandler}>선택</div>
                    <div className="error-button cancle" onClick={onClose}>취소</div>
                </div>
            </div>
        </div>
    );
};

export default DatePickerPopup;