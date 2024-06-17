import React, { useEffect, useState } from 'react'
import './style.css'
import SelectContainer from 'src/layouts/SelectContainer';
import { ReservationCarPriceListItem } from 'src/types';
import { GetSearchDetailListResponseDto, GetSearchReservationCarPriceListResponseDto } from 'src/apis/reservation/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { useNavigate } from 'react-router';
import { useReservationStore } from 'src/stores';
import { getSearchReservationCarPriceListRequest } from 'src/apis/reservation';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, COUNT_RESERVATION_PAGE, RESERVATION_REQUEST_ABSOLUTE_PATH } from 'src/constant';

function ListItem ({
  rentCompany,
  carYear,
  address,
  normalPrice,
  luxuryPrice,
  superPrice,
}: ReservationCarPriceListItem){

  const navigator = useNavigate();
  const selectedInsurance = useReservationStore(state => state.selectedInsurance);
  const { reservationStart, reservationEnd } = useReservationStore();

  const onClickHandler = () => navigator(RESERVATION_REQUEST_ABSOLUTE_PATH(rentCompany));

  const krw = (price: number) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);

  const calculateDateDifference = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // 밀리초를 일(day)로 변환
    return dayDifference;
  };

  const PriceByInsuranceType = () => {
    const daysDifference = calculateDateDifference(reservationStart, reservationEnd);

    switch (selectedInsurance) {
      case 'normal':
        return `${krw(normalPrice * daysDifference)}`;
      case 'luxury':
        return `${krw(luxuryPrice * daysDifference)}`;
      case 'super':
        return `${krw(superPrice * daysDifference)}`;
      default:
        return '가격 없음';
    }
  }
  
  return(
    <>
    <div className='insurance-list-container' onClick={onClickHandler}>
      <div className='insurance-info-wrap'>
        <div className='insurance-info-title-container'>
          <div className='insurance-info-title'>업체명</div>
          <div className='qna-detail-info-divider'>{'\|'}</div>
          <div className='insurance-info-contents'>{rentCompany}</div>
        </div>

        <div className='insurance-info-title-container'>
          <div className='insurance-info-title'>연식</div>
          <div className='qna-detail-info-divider'>{'\|'}</div>
          <div className='insurance-info-contents'>{carYear}</div>
        </div>
      </div>
      
      <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>

      <div className='insurance-info-wrap'>                
        <div className='insurance-info-title-container'>
          <div className='insurance-info-title'>주소</div>
          <div className='qna-detail-info-divider'>{'\|'}</div>
          <div className='insurance-info-contents'>{address}</div>
        </div>

        <div className='insurance-info-title-container'>
          <div className='insurance-info-title'>가격</div>
          <div className='qna-detail-info-divider'>{'\|'}</div>
          <div className='insurance-info-contents'>{PriceByInsuranceType()}</div>
        </div>
      </div>
    </div>
    </>
);
}

// 하늘
// func DetailImage ({ imageUrl, onClose }: { imageUrl: string, onClose: () => void }) {
//   return (
//     <div className='detail-image-container'>
//       <div className='detail-image-wrap'>
//         <div className='detail-image-close-button'>
//           <div className='detail-image-close' onClick={onClose}>X</div>
//         </div>
//         <div className='detail-image-content'>
//           <img src={imageUrl} alt="detail" style={{ width: '200%' }} />
//         </div>
//       </div>
//     </div>
//   );
// };

export default function InsuranceSelect() {

  const krw = (price: number) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
  
  //                    state                    //
  const [priceList, setPriceList] = useState<ReservationCarPriceListItem[]>([]);
  const [viewList, setViewList] = useState<ReservationCarPriceListItem[]>([]);
  const [totalLenght, setTotalLength] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalSection, setTotalSection] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const { address, reservationStart, reservationEnd, selectedCar, selectedInsurance } = useReservationStore();
  const [pageList, setPageList] = useState<number[]>([1]);
  // const [imageDetail, setImageDetail] = useState(false);
    
  //                    function                    //
  const navigator = useNavigate();

  const changePage = (priceList: ReservationCarPriceListItem[], totalLenght: number) => {
    if (!currentPage) return;
    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    let endIndex = currentPage * COUNT_RESERVATION_PAGE;
    if (endIndex > totalLenght - 1) endIndex = totalLenght;
    const viewList = priceList.slice(startIndex, endIndex);
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

  const changePriceList = (priceList: ReservationCarPriceListItem[]) => {

    setPriceList(priceList);

    const totalLenght = priceList.length;
    setTotalLength(totalLenght);

    const totalPage = Math.floor((totalLenght - 1) / COUNT_RESERVATION_PAGE) + 1;
    setTotalPage(totalPage);

    const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
    setTotalSection(totalSection);

    changePage(priceList, totalLenght);

    changeSection(totalPage);
  };

  const getCompanyListResponse = (result: GetSearchReservationCarPriceListResponseDto | ResponseDto | null) => {
    const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '잘못된 접수번호입니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
          alert(message);
      }

      const { reservationCarPriceList } = result as GetSearchReservationCarPriceListResponseDto;

      setPriceList(reservationCarPriceList);
      setCurrentPage(!reservationCarPriceList.length ? 0 : 1);
      setCurrentSection(!reservationCarPriceList.length ? 0 : 1);
      changePriceList(reservationCarPriceList);
  };

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

  // const closeImagePopupHandler = () => {
  //   setImageDetail(false);
  // };

  //                    effect                    //
  useEffect(() => {
    if (!priceList.length) return;
    changePage(priceList, totalLenght);
  }, [currentPage]);

  useEffect(() => {
    if (!priceList.length) return;
    changeSection(totalPage);
  }, [currentSection]);

  useEffect(() => {
    if (!selectedCar) return;
    
    getSearchReservationCarPriceListRequest(address, reservationStart, reservationEnd, selectedCar.carName).then(getCompanyListResponse);
  }, [selectedCar]);

  if (!selectedCar) return <></>;

  // const insurance = 
  //   selectedInsurance === 'normal' ? `${krw(selectedCar.lowNormalPrice)} ~ ${krw(selectedCar.highNormalPrice)}` :
  //   selectedInsurance === 'luxury' ? `${krw(selectedCar.lowLuxuryPrice)} ~ ${krw(selectedCar.highLuxuryPrice)}` :
  //   selectedInsurance === 'super' ? `${krw(selectedCar.lowSuperPrice)} ~ ${krw(selectedCar.highSuperPrice)}` : '';

    const insuranceType =
    selectedInsurance === 'normal' ? '완전자차' : 
    selectedInsurance === 'luxury' ? '고급자차' :
    selectedInsurance === 'super' ? '슈퍼자차' : '';

  return (
    <div id='user-page-wrapper'>
      <div className='reservation-select-container'>{<SelectContainer/>}</div>

      <div className='insurance-wrapper'>
        <div className='select-car-info'>
          <div className='select-car-info-image'>
            <img 
              style={{ width: '200%', height: '120%'}} 
              src={selectedCar.carImageUrl} 
              // onClick={() => setImageDetail(true)}
            />
          </div>

          <div className='select-car-info-list'>
            <div className='select-info-wrap'>
              <div className='select-info'>차량명</div>
              <div className='qna-detail-info-divider'>{'\|'}</div>
              <div className='selecet-info-cotents'>{selectedCar.carName}</div>
            </div>
            {/* <div className='select-info-wrap'>
              <div className='select-info'>연료</div>
              <div className='qna-detail-info-divider'>{'\|'}</div>
              <div className='selecet-info-cotents'>{fuelType}</div>
            </div> */}
            <div className='select-info-wrap'>
              <div className='select-info'>보험</div>
              <div className='qna-detail-info-divider'>{'\|'}</div>
              <div className='selecet-info-cotents'>{insuranceType}</div>
            </div>
          </div>
        </div>

        <div className='insurance-list-wrap'>      
          {viewList.map(item => <ListItem {...item} />)}

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
      {/* {imageDetail && <DetailImage imageUrl={selectedCar.carImageUrl} onClose={closeImagePopupHandler}/>} */}
    </div>
  );
}
