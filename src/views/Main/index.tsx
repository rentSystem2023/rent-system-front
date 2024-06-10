import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { RESERVATION_CAR_ABSOLUTE_PATH } from 'src/constant';
import { CompanyListItem } from 'src/types';


// pop up //
const LocationPopup = ({ onSelect, onClose }: { onSelect: (location: string) => void, onClose: () => void }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>위치 선택</h2>

                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};


    //                    component                    //
export default function Main() {
    //                    function                    //
    const navigator = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

        //                    event handler                    //
    const onSearchButtonClickHandler = () => {
        if (!selectedLocation) {
            alert("위치를 선택하세요.");
            return;
        }
        navigator(RESERVATION_CAR_ABSOLUTE_PATH);
    };

    const LocationSelecthandler = (location: string) => {
        setSelectedLocation(location);
        setIsPopupOpen(false);
    };

    const openPopuphandler = () => {
        setIsPopupOpen(true);
    };

    const closePopuphandler = () => {
        setIsPopupOpen(false);
    };

    return (
        <div id="main-page-wrapper">
            <div className="main-container-box">
                <div className="top-image jeju"></div>
                <div className="container-box">
                    <div className="search-box">
                        <div className="search-select-box">
                            <div className="search-select-item" onClick={openPopuphandler}>
                                {selectedLocation || "위치선택"}
                            </div>
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
            {isPopupOpen && <LocationPopup onSelect={LocationSelecthandler} onClose={closePopuphandler} />}
        </div>
    );
}