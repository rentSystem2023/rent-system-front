import React, { useEffect, useState } from 'react'
import './style.css'
import { MyReservationListItem, ReservationUserListItem } from 'src/types';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_ABSOLUTE_PATH, MAIN_PATH, USER_RESERVATION_DETAIL_ABSOLUTE_PATH } from 'src/constant';
import { GetMyReservationListResponseDto } from 'src/apis/user/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getReservationMyListRequest } from 'src/apis/user';

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

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onClickHandler = () => navigator(USER_RESERVATION_DETAIL_ABSOLUTE_PATH(reservationCode));

    const reservationStateWord =
    reservationState === 'reservationComplete' ? '예약 완료' :
    reservationState === 'watingCancel' ? '예약 취소 대기' :
    reservationState === 'cancelComplete' ? '예약 취소 완료' : '';

    //                    render                    //
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

export default function MyReservation() {

    //                    state                    //
    const [cookies] = useCookies();

    const [userId, setUserId] = useState<string>('');
    const [reservationList, setReservationList] = useState<MyReservationListItem[]>([]);
    const [viewList, setViewList] = useState<MyReservationListItem[]>([]);
    const [totalLenght, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    //                    function                    //
    const navigator = useNavigate();

    const changePage = (reservationList: MyReservationListItem[], totalLenght: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLenght - 1) endIndex = totalLenght;
        const viewList = reservationList.slice(startIndex, endIndex);
        setViewList(viewList);
    };

    const changeSection = (totalPage: number) => {
        if (!currentPage) return;
        const startPage = (currentSection * COUNT_PER_SECTION) - (COUNT_PER_SECTION - 1);
        let endPage = currentSection * COUNT_PER_SECTION;
        if (endPage > totalPage) endPage = totalPage;
        const pageList: number[] = [];
        for (let page = startPage; page <= endPage; page++) pageList.push(page);
        setPageList(pageList);
    };

    const changeReservationList = (reservationList: MyReservationListItem[]) => {
        setReservationList(reservationList);

        const totalLenght = reservationList.length;
        setTotalLength(totalLenght);

        const totalPage = Math.floor((totalLenght - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(reservationList, totalLenght);

        changeSection(totalPage);
    };

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
        changeReservationList(reservationList);

        setCurrentPage(!reservationList.length ? 0 : 1);
        setCurrentSection(!reservationList.length ? 0 : 1);
    };

    //                    event handler                    //
    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
    };

    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
    };

    const onNextSectionClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
    };

    //                    effect                    //
    useEffect (() => {
        if (!cookies.accessToken || userId !== 'ROLE_USER') {
            return navigator(MAIN_ABSOLUTE_PATH);
        };
        getReservationMyListRequest(cookies.accessToken).then(getMyReservationListResponse);
    }, []);

    useEffect(() => {
        if (!reservationList.length) return;
        changePage(reservationList, totalLenght);
    }, [currentPage]);

    useEffect(() => {
        if (!reservationList.length) return;
        changeSection(totalPage);
    }, [currentSection]);


//                    render                    //
    return (
        <div id='information-wrapper'>
            <div className='information-main'>
                <div className="my-info-title">예약 내역</div>

                <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>
                
                <div className='my-reservation-card-list'>
                    <div className='table-list-top'>
                        <div className='table-list-size-text'>전체 <span className='emphasis'>{totalLenght}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
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
