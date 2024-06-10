
import './style.css';

export default function ReservationDetail() {


    //                    render                    //
    return (
        <div id="reservation-detail-wrapper">
            <div className='company-detail-container'>
                <h2>업체 현황</h2>
                    <div className="company-detail-box">
                            <div>예약번호</div>
                            <div>업체이름</div>
                            <div>차종</div>
                            <div>차량번호</div>
                            <div>예약시작일</div>
                            <div>예약종료일</div>
                            <div>예약자명</div>
                            <div>아이디</div>
                            <div>예약상태</div>
                    </div>
                <div className='primary-button' >목록보기</div>
                <div className='primary-button' >예약완료 처리버튼</div>
                <div className='error-button' >예약취소승인 삭제처리버튼</div>
                <div className='error-button' >삭제</div>
            </div>
        </div>
        );



}