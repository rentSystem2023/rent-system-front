import { useEffect, useState } from 'react'
import './style.css'
import { MyReservationListItem} from 'src/types';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_ABSOLUTE_PATH, MAIN_PATH, USER_RESERVATION_DETAIL_ABSOLUTE_PATH } from 'src/constant';
import { GetMyReservationListResponseDto } from 'src/apis/user/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getReservationMyListRequest } from 'src/apis/user';
import { useUserStore } from 'src/stores/car.reservation.store';
import { usePagination } from 'src/hooks';

//                    component                    //
function ListItem ({
    carImageUrl,
    reservationDate,
    nickName,
    reservationCode,
    rentCompany,
    reservationStart,
    reservationEnd,
    reservationState
    }: MyReservationListItem) {

    //                    function                     //
    const navigator = useNavigate();

    //                event handler                    //
    const onClickHandler = () => navigator(USER_RESERVATION_DETAIL_ABSOLUTE_PATH(reservationCode));

    const reservationStateWord =
        reservationState === 'reservationComplete' ? '예약 완료' :
        reservationState === 'watingCancel' ? '예약 취소 대기' :
        reservationState === 'cancelComplete' ? '예약 취소 완료' : '';

    //                    Render                       //
    return (
        <div className='my-reservation-list-table' onClick={onClickHandler}>
            <div className='my-reservation-state'>{reservationStateWord}</div>
            <div className='my-reservation-info-list'>
                <div className='my-reservation-car-image'>
                    <img style={{ width: '150%', height: '120%'}} src={carImageUrl} />
                </div>
                <div className='my-reservation-info'>
                    <div className='reservation-car-container'>
                        <div className='reservation-list-title'>예약번호</div>
                        <div className='qna-detail-info-divider'>{'\|'}</div>
                        <div className='reservation-content'>{reservationCode}</div>
                    </div>
                    <div className='reservation-car-container'>
                        <div className='reservation-list-title'>닉네임</div>
                        <div className='qna-detail-info-divider'>{'\|'}</div>
                        <div className='reservation-content'>{nickName}</div>
                    </div>
                    <div className='reservation-car-container'>
                        <div className='reservation-list-title'>업체명</div>
                        <div className='qna-detail-info-divider'>{'\|'}</div>
                        <div className='reservation-content'>{rentCompany}</div>
                    </div>
                    <div className='reservation-car-container'>
                        <div className='reservation-list-title'>예약날짜</div>
                        <div className='qna-detail-info-divider'>{'\|'}</div>
                        <div className='reservation-content'>{reservationDate}</div>
                    </div>
                    <div className='reservation-car-container'>
                        <div className='reservation-list-title'>예약기간</div>
                        <div className='qna-detail-info-divider'>{'\|'}</div>
                        <div className='reservation-content'>{reservationStart} ~ {reservationEnd}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//                    component                    //
export default function MyReservation() {

    //                      state                      //
    const { loginUserRole } = useUserStore();
    
    const [cookies] = useCookies();

    const {
        viewList,
        pageList,
        totalPage,
        currentPage,
        totalLength,
        setCurrentPage,
        setCurrentSection,
        changeBoardList,
        onPageClickHandler,
        onPreSectionClickHandler,
        onNextSectionClickHandler
    } = usePagination<MyReservationListItem>(COUNT_PER_PAGE, COUNT_PER_SECTION);

    //                    function                    //
    const navigator = useNavigate();

    const getMyReservationListResponse = (result: GetMyReservationListResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(MAIN_PATH);
            return;
        }

        const { reservationList } = result as GetMyReservationListResponseDto;
        changeBoardList(reservationList);

        setCurrentPage(!reservationList.length ? 0 : 1);
        setCurrentSection(!reservationList.length ? 0 : 1);
    };

    //                    effect                    //
    useEffect (() => {
        if (!cookies.accessToken || loginUserRole !== 'ROLE_USER') return navigator(MAIN_ABSOLUTE_PATH);
        getReservationMyListRequest(cookies.accessToken).then(getMyReservationListResponse);
    }, []);

//                    render                    //
    return (
        <div id='information-wrapper'>
            <div className='information-main'>
                <div className="my-info-title">예약 내역</div>
                <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>
                <div className='my-reservation-card-list'>
                    <div className='table-list-top'>
                        <div className='table-list-size-text'>전체 <span className='emphasis'>{totalLength}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
                    </div>
                    <div className='my-reservation-card'>
                        {viewList.map((item) => <ListItem {...item} />)}
                    </div>
                    <div className='table-reservation-list-bottom'>
                        <div className='table-list-pagenation'>
                            <div className='table-list-page-left' onClick={onPreSectionClickHandler}></div>
                            <div className='table-list-page-box'>
                                {pageList.map(page => 
                                    page === currentPage ?
                                    <div className='table-list-page-active'>{page}</div> :
                                    <div className='table-list-page'onClick={() => onPageClickHandler(page)}>{page}</div>
                                )}
                            </div>
                            <div className='table-list-page-right' onClick={onNextSectionClickHandler}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
