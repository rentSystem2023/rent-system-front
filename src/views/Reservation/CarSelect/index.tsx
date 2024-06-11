import React, { useEffect, useState } from 'react'
import './style.css'
import SelectContainer from 'src/layouts/SelectContainer';
import { useCookies } from 'react-cookie';
import { getSearchReservationCarListRequest } from 'src/apis/reservation';
import { getSearcNoticeListRequest } from 'src/apis/notice/dto';
import { GetSearchReservationCarListResponseDto } from 'src/apis/reservation/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { ReservationCarListItem, ReservationCarViewListItem } from 'src/types';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, COUNT_RESERVATION_PAGE, MAIN_PATH, RESERVATION_CAR_ABSOLUTE_PATH } from 'src/constant';
import { useNavigate } from 'react-router';
import { useReservationStore } from 'src/stores';

function ListItem ({
    carName,
    carImageUrl,
    highLuxuryPrice,
    highNormalPrice,
    highSuperPrice,
    lowLuxuryPrice,
    lowNormalPrice,
    lowSuperPrice
}: ReservationCarViewListItem) {

    //                    function                    //
    const navigator = useNavigate();

    const krw = (price: number) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);

    return(
        <>
        <div className='car-list-card'>
            <div className='car-name-wrap'>
                <div className='car-name'>{carName}</div>
            </div>
            <div className='list-wrap'>
                <div className='car-image'>
                    <img style={{ width: '150%'}} src={carImageUrl} />
                </div>
                <div className='insurance-wrap'>
                    <div className='insurance-price'>
                        <div className='price-title'>완전자차</div>
                        <div className='price-result'>{`${krw(lowNormalPrice)} ~ ${krw(highNormalPrice)}`}</div>
                    </div>
                    <div className='insurance-price'>
                        <div className='price-title'>고급자차</div>
                        <div className='price-result'>{`${krw(lowLuxuryPrice)} ~ ${krw(highLuxuryPrice)}`}</div>
                    </div>
                    <div className='insurance-price'>
                        <div className='price-title'>슈퍼자차</div>
                        <div className='price-result'>{`${krw(lowSuperPrice)} ~ ${krw(highSuperPrice)}`}</div>
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
    const [reservationCarList, setReservationCarList] = useState<ReservationCarViewListItem[]>([]);
    const [viewList, setViewList] = useState<ReservationCarViewListItem[]>([]);
    const [totalLenght, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);

    //                    function                    //
    const navigator = useNavigate();

    const { address, reservationStart, reservationEnd } = useReservationStore();

    const changePage = (reservationCarList: ReservationCarViewListItem[], totalLenght: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_RESERVATION_PAGE;
        let endIndex = currentPage * COUNT_RESERVATION_PAGE;
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

    const changeReservationCarList = (reservationCarList: ReservationCarViewListItem[]) => {

        setReservationCarList(reservationCarList);

        const totalLenght = reservationCarList.length;
        setTotalLength(totalLenght);

        const totalPage = Math.floor((totalLenght - 1) / COUNT_RESERVATION_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(reservationCarList, totalLenght);

        changeSection(totalPage);
    };
    
    const getSearchReservationCarListResponse = (result: GetSearchReservationCarListResponseDto | ResponseDto | null) => {

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

        const list: ReservationCarViewListItem[] = [];
        reservationCarList.forEach(car => {
            const existCarIndex = list.findIndex(item => item.carName === car.carName);
            if (existCarIndex === -1) {
                list.push({ carName: car.carName, carImageUrl: car.carImageUrl, highLuxuryPrice: car.luxuryPrice, lowLuxuryPrice: car.luxuryPrice, highNormalPrice: car.luxuryPrice, lowNormalPrice: car.normalPrice, highSuperPrice: car.superPrice, lowSuperPrice: car.superPrice });
                return;
            }

            if (list[existCarIndex].highLuxuryPrice < car.luxuryPrice) list[existCarIndex].highLuxuryPrice = car.luxuryPrice;
            if (list[existCarIndex].highNormalPrice < car.normalPrice) list[existCarIndex].highNormalPrice = car.normalPrice;
            if (list[existCarIndex].highSuperPrice < car.superPrice) list[existCarIndex].highSuperPrice = car.superPrice;
            if (list[existCarIndex].lowLuxuryPrice > car.luxuryPrice) list[existCarIndex].lowLuxuryPrice = car.luxuryPrice;
            if (list[existCarIndex].lowNormalPrice > car.normalPrice) list[existCarIndex].lowNormalPrice = car.normalPrice;
            if (list[existCarIndex].lowSuperPrice > car.superPrice) list[existCarIndex].lowSuperPrice = car.superPrice;
        })

        setReservationCarList(list);
        setCurrentPage(!reservationCarList.length ? 0 : 1);
        setCurrentSection(!reservationCarList.length ? 0 : 1);
        changeReservationCarList(list);
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
        if (!reservationCarList.length) return;
        changePage(reservationCarList, totalLenght);
    }, [currentPage]);

    useEffect(() => {
        if (!reservationCarList.length) return;
        changeSection(totalPage);
    }, [currentSection]);

    useEffect(() => {
        getSearchReservationCarListRequest(address, reservationStart, reservationEnd).then(getSearchReservationCarListResponse)
    }, [address, reservationStart, reservationEnd]);

    //                    render                    //

    const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';

    return (
        <div id="user-page-wrapper">
            <div className='reservation-select-container'>{<SelectContainer/>}</div>
            
            <div className='car-select-wrap'>
                <div className='option-container'>
                    <div className='table-list-search-box'>
                        <div className='table-list-search-input-box'>
                            <input className='table-list-search-input' placeholder='자동차 모델명을 입력하세요.' />
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
