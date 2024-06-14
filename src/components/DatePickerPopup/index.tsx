import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useReservationStore } from "src/stores";
import { getYYYYMMDD } from "src/utils";
import './style.css'

//                          Component                       //
export const DatePickerPopup = ({ onClose }: { onClose: () => void }) => {
    //                       State                          //
    const { reservationStart, reservationEnd, setReservationStart, setReservationEnd } = useReservationStore();

    const tomorrow =  new Date(new Date().setDate(new Date().getDate() + 1)); // 현재 날짜 가져오기

    const [startDate, setStartDate] = useState<Date | null>(tomorrow); // 시작 날짜를 내일로 초기화
    const [endDate, setEndDate] = useState<Date | null>(tomorrow); // 종료 날짜를 null로 초기화
    const startDateInputRef = useRef<HTMLInputElement>(null); // 시작 날짜 input 엘리먼트에 대한 참조 생성

    //                      Effect                     //
    useEffect(() => {
        // 시작 날짜 input 엘리먼트에 포커스를 줌
        if (startDateInputRef.current) {
            startDateInputRef.current.focus();
        }
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    //                  Event Handlers                   //
    const handleStartDateSelecthandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const date = new Date(value);
        setStartDate(date);
        setReservationStart(value);

        // 종료 날짜와 시작 날짜가 같거나 이전인 경우 종료 날짜를 null로 설정
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
        
        // 시작 날짜와 종료 날짜가 같거나 이전인 경우 종료 날짜를 null로 설정
        if (startDate && date.getTime() <= startDate.getTime()) {
            setEndDate(null);
            setReservationEnd('');
        }
    };

    const handleConfirmhandler = () => {
        const today = new Date(); // 현재 날짜 및 시간 가져오기
        const maxEndDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // 최대 30일 이후의 날짜 계산
    
        if (startDate && !endDate) {
            alert("당일 예약은 불가합니다.\r시작날짜와 종료날짜를 선택해주세요.");
            return; // 종료
        }
    
        // 시작 날짜와 종료 날짜가 모두 선택된 경우에만 처리
        if (startDate && endDate) {
            // 시작 날짜가 오늘 이후이고 종료 날짜가 시작 날짜 이후이며 최대 30일 이내인 경우에만 처리
            if (startDate >= today && endDate <= maxEndDate) {
                // 시작 날짜와 종료 날짜가 같은 경우 경고 메시지 표시
                if (startDate.toISOString().split('T')[0] === endDate.toISOString().split('T')[0]) {
                    alert("시작날짜와 종료날짜를 모두 선택해주세요.");
                    return; // 종료
                } else if (startDate.getTime() <= endDate.getTime()) {
                    // 시작 날짜와 종료 날짜가 같거나 이전인 경우에도 처리 가능
                    onClose();
                }
            } else {
                alert("당일 예약은 불가능하며, 오늘 날짜 기준으로 최대 30일 이내여야 합니다.");
            }
        } else {
            alert("시작날짜와 종료날짜를 모두 선택해주세요.");
        }
    };
    
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