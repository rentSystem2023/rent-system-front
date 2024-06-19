    import React, { ChangeEvent, useEffect, useState } from 'react'
    import './style.css'
    import { ReservationUserListItem } from 'src/types';
    import { useNavigate } from 'react-router';
    import { ADMIN_RESERVATION_DETAIL_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_PATH } from 'src/constant';
    import { useCookies } from 'react-cookie';
    import ResponseDto from 'src/apis/response.dto';
    import { GetReservationListResponseDto, GetSearchReservationListResponseDto } from 'src/apis/reservation/dto/response';
import { getSearchReservationListRequest } from 'src/apis/reservation';

    //                    component                    //
    function ListItem ({
    reservationCode,
    rentCompany,
    carName,
    carNumber,
    reservationStart,
    reservationEnd,
    userId,
    nickName,
    reservationState
    }: ReservationUserListItem) {

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //

    const onClickHandler = () => navigator(ADMIN_RESERVATION_DETAIL_ABSOLUTE_PATH(reservationCode));

    //                    render                    //
    const reservationStateWord =
    reservationState === 'reservationComplete' ? '예약 완료' :
    reservationState === 'watingCancel' ? '예약 취소 대기' :
    reservationState === 'cancelComplete' ? '예약 취소 완료' : '';

    return (
        <div className='table-list-table-tr reservation' onClick={onClickHandler}>
            <div className='reservation-list-table-list-number'>{reservationCode}</div>
            <div className='reservation-list-table-reservation-name'>{rentCompany}</div>
            <div className='reservation-list-table-reservation-car'>{carName}</div>
            <div className='reservation-list-table-reservation-carnum'>{carNumber}</div>
            <div className='reservation-list-table-reservation-date'>{reservationStart}</div>
            <div className='reservation-list-table-reservation-date'>{reservationEnd}</div>
            <div className='reservation-list-table-reservation-user'>{nickName}</div>
            <div className='reservation-list-table-reservation-user-id'>{userId}</div>
            <div className='reservation-list-table-reservation-state'>{reservationStateWord}</div>
        </div>
    );
}

    //                    component                    //
    export default function ReservationList() {

    //                    state                    //
    const [cookies] = useCookies();

    const [reservationList, setReservationList] = useState<ReservationUserListItem[]>([]);
    const [viewList, setViewList] = useState<ReservationUserListItem[]>([]);
    const [totalLenght, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);
    const [searchWord, setSearchWord] = useState<string | number>('');

    //                    function                    //
    const navigator = useNavigate();

    const changePage = (reservationList: ReservationUserListItem[], totalLenght: number) => {
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

    const changeReservationList = (reservationList: ReservationUserListItem[]) => {
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

    const getReservationListResponse = (result: GetReservationListResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(MAIN_PATH);
            return;
        }

        const { reservationList } = result as GetReservationListResponseDto;
        changeReservationList(reservationList);

        setCurrentPage(!reservationList.length ? 0 : 1);
        setCurrentSection(!reservationList.length ? 0 : 1);
    };

    const getSearchReservationListResponse = (result: GetSearchReservationListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '검색어를 입력하세요.' : 
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(MAIN_PATH);
            return;
        }

        const { reservationUserList } = result as GetSearchReservationListResponseDto;
        changeReservationList(reservationUserList);

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

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onSearchButtonClickHandler = () => {
    if (!searchWord) {
        getSearchReservationListRequest('', cookies.accessToken).then(getSearchReservationListResponse);
    } else {
        if (!cookies.accessToken) return;
        getSearchReservationListRequest(searchWord, cookies.accessToken).then(getSearchReservationListResponse);
    }
    };

    //                    effect                    //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getSearchReservationListRequest(searchWord, cookies.accessToken).then(getSearchReservationListResponse);
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
    const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
    return (
        <>
        <div id='table-list-wrapper'>
        <div className="my-info-title">예약 관리</div>
            <div className='table-list-top'>
                <div className='table-list-size-text'>전체 <span className='emphasis'>{totalLenght}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
            </div>
            <div className='table-list-table reservation'>
                <div className='table-list-table-th reservation'>
                    <div className='reservation-list-table-list-number'>예약번호</div>
                    <div className='reservation-list-table-reservation-name'>업체 이름</div>
                    <div className='reservation-list-table-reservation-car'>차종</div>
                    <div className='reservation-list-table-reservation-carnum'>차량번호</div>
                    <div className='reservation-list-table-reservation-date'>예약시작일</div>
                    <div className='reservation-list-table-reservation-date'>예약종료일</div>
                    <div className='reservation-list-table-reservation-user'>닉네임</div>
                    <div className='reservation-list-table-reservation-user-id'>아이디</div>
                    <div className='reservation-list-table-reservation-state'>상태</div>
                </div>
                {viewList.map((item) => <ListItem {...item} />)}
            </div>
            <div className='table-list-bottom'>
                <div style={{ width: '299px' }}></div>
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
                <div className='table-list-search-box reservation'>
                    <div className='table-list-search-input-box'>
                        <input className='table-list-search-input' placeholder='검색어를 입력하세요.' value={searchWord} onChange={onSearchWordChangeHandler}/>
                    </div>
                    <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
                </div>
            </div>
        </div>
        </>
    );
}
