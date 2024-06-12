import { CompanyListItem } from 'src/types';
import './style.css';

//                    component                    //
export const LocationPopup = ({ onClose, viewList }: { onClose: () => void, viewList: CompanyListItem[] }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>제주국제공항</h2>
                <div className="company-list"></div>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};