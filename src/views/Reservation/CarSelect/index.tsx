import React, { useEffect, useState } from 'react'
import './style.css'
import SelectContainer from 'src/layouts/SelectContainer';
import { useCookies } from 'react-cookie';
import { getSearchReservationCarListRequest } from 'src/apis/reservation';
import { getSearcNoticeListRequest } from 'src/apis/notice/dto';
import { GetSearchReservationCarListResponseDto } from 'src/apis/reservation/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { ReservationCarListItem } from 'src/types';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_PATH, RESERVATION_CAR_ABSOLUTE_PATH } from 'src/constant';
import { useNavigate } from 'react-router';

function ListItem ({
    carName,
    carImageUrl,
    normalPrice,
    luxuryPrice,
    superPrice
}: ReservationCarListItem) {

    //                    function                    //
    const navigator = useNavigate();

    return(
        <>
        <div className='car-list-card'>
            <div className='car-name-wrap'>
                <div className='car-name'>{carName}</div>
            </div>
            <div className='list-wrap'>
                <div className='car-image'>{carImageUrl}</div>
                <div className='insurance-wrap'>
                    <div className='insurance-price'>
                        <div className='price-title'>완전자차</div>
                        <div className='price-result'>최소가격</div>
                        <div className='price-result'>최대가격</div>
                    </div>
                    <div className='insurance-price'>
                        <div className='price-title'>고급자차</div>
                        <div className='price-result'>최소가격</div>
                        <div className='price-result'>최대가격</div>
                    </div>
                    <div className='insurance-price'>
                        <div className='price-title'>슈퍼자차</div>
                        <div className='price-result'>최소가격</div>
                        <div className='price-result'>최대가격</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default function CarSelect() {

    //                    state                    //
    const [cookies] = useCookies();
    const [searchWord, setSearchWord] = useState<string>('');
    const [reservationCarList, setReservationCarList] = useState<ReservationCarListItem[]>([]);
    const [viewList, setViewList] = useState<ReservationCarListItem[]>([]);
    const [totalLenght, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);

    //                    function                    //
    const navigator = useNavigate();

    const changePage = (reservationCarList: ReservationCarListItem[], totalLenght: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLenght - 1) endIndex = totalLenght;
        const viewList = reservationCarList.slice(startIndex, endIndex);
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

    const changeReservationCarList = (reservationCarList: ReservationCarListItem[]) => {

        setReservationCarList(reservationCarList);

        const totalLenght = reservationCarList.length;
        setTotalLength(totalLenght);

        const totalPage = Math.floor((totalLenght - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(reservationCarList, totalLenght);

        changeSection(totalPage);
    };
    
    const getReservationCarListResponse = (result: GetSearchReservationCarListResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '검색어를 입력하세요.' : 
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(RESERVATION_CAR_ABSOLUTE_PATH);
            return;
        }

        const { reservationCarList } = result as GetSearchReservationCarListResponseDto;
        changeReservationCarList(reservationCarList);

        setCurrentPage(!reservationCarList.length ? 0 : 1);
        setCurrentSection(!reservationCarList.length ? 0 : 1);
    };

    //                    event handler                    //
    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
    };

    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
    };

    const onNextSectionClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
    };

    // const onSearchButtonClickHandler = () => {
    //     // 검색어가 있는 경우
    //     if (searchWord) {
    //         if (cookies.accessToken) {
    //             getSearcNoticeListRequest(searchWord, cookies.accessToken).then(getReservationCarListResponse);
    //         } else {
    //             // 토큰이 없는 경우, 빈 문자열을 전달하여 검색
    //             getSearcNoticeListRequest(searchWord, '').then(getReservationCarListResponse);
    //         }
    //     }
    //     // 검색어가 없는 경우
    //     else {
    //         // 빈 문자열을 전달하여 검색
    //         getSearcNoticeListRequest('', '').then(getReservationCarListResponse);
    //     }
    // }

    //                    effect                    //
    // useEffect(() => {
    //     if (!cookies.accessToken) {
    //         // 토큰이 없는 경우 처리
    //         getSearcNoticeListRequest(searchWord, '').then(getSearchBoardListResponse);
    //     } else {
    //         getSearcNoticeListRequest(searchWord, cookies.accessToken).then(getSearchBoardListResponse);
    //     }
    // }, []);

    useEffect(() => {
        if (!CarSelect.length) return;
        changePage(reservationCarList, totalLenght);
    }, [currentPage]);

    useEffect(() => {
        if (!CarSelect.length) return;
        changeSection(totalPage);
    }, [currentSection]);

    //                    render                    //

    const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';

    return (
        <div id="user-page-wrapper">
            <div className='reservation-select-container'>{<SelectContainer/>}</div>
            
            <div className='car-select-wrap'>
                <div className='option-container'>
                    <div className='table-list-search-box'>
                        <div className='table-list-search-input-box'>
                            <input className='table-list-search-input' placeholder='검색어를 입력하세요.' />
                        </div>
                        <div className={searchButtonClass}>검색</div>
                    </div>
                    {/* <div className='filter-button'>필터</div> */}
                </div>

                <div className='car-list-wrap'>
                    {viewList.map(item => <ListItem {...item} />)}
                </div>

                <div className='table-list-pagenation'>
                    <div className='table-list-page-left' onClick={onPreSectionClickHandler}></div>
                    <div className='table-list-page-box'>
                        {pageList.map(page => 
                        page === currentPage ?
                        <div className='table-list-page-active'>{page}</div> :
                        <div className='table-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
                        )}
                    </div>
                    <div className='table-list-page-right' onClick={onNextSectionClickHandler}></div>
                </div>

            </div>           
        </div>    
    );
}
