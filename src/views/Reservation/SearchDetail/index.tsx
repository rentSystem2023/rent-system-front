import React, { useEffect, useState } from 'react'
import './style.css'
import { useReservationStore, useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { GetSearchDetailListResponseDto } from 'src/apis/reservation/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { RESERVATION_COMPANY_PATH } from 'src/constant';
import { getReservationDetailRequest, getSearchDetailListRequest, getSearchReservationCarPriceListRequest } from 'src/apis/reservation';

//                    component                   //
export default function SearchDetail() {
  
  //                    state                   //
    const {rentCompany} = useParams();
    const { loginUserId, loginUserRole } = useUserStore();
    const { address, reservationStart, reservationEnd, selectedCar } = useReservationStore();

    const [carImageUrl,setCarImageUrl] = useState<string>('');
    const [carName,setCarName] = useState<string>('');
    const [carYear,setCarYear] = useState<string>('');
    const [brand,setBrand] = useState<string>('');
    const [grade,setGrade] = useState<string>('');
    const [carOil,setCarOil] = useState<number>();
    const [capacity,setCapacity] = useState<string>('');
    const [normalPrice,setNormalPrice] = useState<number>();
    const [luxuryPrice,setLuxuryPrice] = useState<number>();
    const [superPrice,setSuperPrice] = useState<number>();
    const [fuelType,setFuelType] = useState<string>('');
    const [companyTelnumber,setCompanyTelnumber] = useState<string>('');
    const [companyRule,setCompanyRule] = useState<string>('');
    
  //                    function                    //
  const navigator = useNavigate();

  const GetSearchDetailListResponse = (result: GetSearchDetailListResponseDto | ResponseDto | null)=>{
    const message =
    !result ? '서버에 문제가 있습니다.' :
    result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
    result.code === 'AF' ? '인증에 실패했습니다.' :
    result.code === 'NB' ? '존재하지 않는 차량입니다.' :
    result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if(!result || result.code !== 'SU'){
      alert(message);

      // 어디로 내보낼지 아직 모르겠음
      navigator(RESERVATION_COMPANY_PATH);
      return;
    }

    const {carImageUrl,carYear,brand,grade,carOil,capacity,normalPrice,luxuryPrice,superPrice,companyTelnumber,companyRule} =result as GetSearchDetailListResponseDto
    setCarImageUrl(carImageUrl)
    setCarYear(carYear)
    setBrand(brand)
    setGrade(grade)
    setCarOil(carOil)
    setCapacity(capacity)
    setNormalPrice(normalPrice)
    setLuxuryPrice(luxuryPrice)
    setSuperPrice(superPrice)
    setCompanyTelnumber(companyTelnumber)
    setCompanyRule(companyRule)
    setFuelType(fuelType)
  };

  //                    event handler                   //
  // 차량정보 리스트
  const carInformationClickHandler = () => {

  }

  // 업체정보 리스트
  const companyListClickHandler = () => {

  }

  // 예약하기
  const reservationButtonClickHandler = ()=> {

  }

  //                    effect                    //
  // 선택한 차량의 상태를 가져오는 것
  useEffect(() => {
    if (!selectedCar || !rentCompany) return;
    
    getSearchReservationCarPriceListRequest(address, reservationStart, reservationEnd, selectedCar.carName).then(GetSearchDetailListResponse);
    getSearchDetailListRequest(address, reservationStart, reservationEnd, rentCompany, selectedCar.carName).then(GetSearchDetailListResponse);
  }, [selectedCar, rentCompany]);

  if (!selectedCar) return <></>;

  //                    render                    //
  return (
    <div id='user-page-wrapper'>
      <div className='search-datail-wrapper'>
        <div className='search-detail-container'>          
          <div className='search-detail-image'>
            <img style={{ width: '150%', height: '130%'}} src={carImageUrl} />
          </div>

          <div className='search-datail-list'>
            <div className='search-info-container'>
              <div className='search-detail-title'>차이름</div>
              <div className='qna-detail-info-divider'>{'\|'}</div>
              <div className='search-detail-contents'>{selectedCar.carName}</div>
            </div>

            <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>
            
            <div className='search-info-container'>
                <div className='search-detail-title'>예약 날짜</div>
                <div className='qna-detail-info-divider'>{'\|'}</div>
                <div className='search-detail-contents'>{ `${reservationStart} ~ ${reservationEnd}`}</div>
              </div>
            <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>

            <div className='search-payment-wrap'>
              <div className='search-info-container'>
                <div className='search-detail-title'>가격</div>
                <div className='qna-detail-info-divider'>{'\|'}</div>
                <div className='search-detail-contents'>데이터 수정 해야함</div>
              </div>
              
              <div className='primary-button'>예약하기</div>
            </div>
          </div>
        </div>

        <div className='search-detail-info-list-wrap'>
          <div className='search-detail-info-button'>
            <div className='search-detail-button-wrap active'>
              <div className='search-detail-info-title'onClick={carInformationClickHandler}>차량 정보</div>
            </div>            
            <div className='search-detail-button-wrap'>
              <div className='search-detail-info-title'onClick={companyListClickHandler}>업체 정보</div>
            </div>
          </div>

          <div className='search-detail-info-list-container'>
            <div className='search-detail-car-info-list'>
              <div className='search-detail-info-title'>차량 정보</div>
              <div className='search-detail-info-contents'>
                <div className='list-title-wrap'>
                  <div className='list-title'>차량명</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>{selectedCar.carName}</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>브랜드</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>{brand}</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>등급</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>{grade}</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>연비</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>{carOil}</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>연료</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>{fuelType}</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>연식</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>여어어어어어언식</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>보험</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>보허허허허엄</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>보험료</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>보험료 얼마게</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>탑승 인원 수</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>{capacity}</div>
                </div>
              </div>
            </div>

            <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>

            <div className='search-detail-company-info-list'>
              <div className='search-detail-info-title'>업체 정보</div>
              <div className='search-detail-info-contents'>
                <div className='list-title-wrap'>
                  <div className='list-title'>업체명</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>{rentCompany}</div>
                </div>
                <div className='list-map-wrap'>
                  <div className='list-title'>업체 위치</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-map'>지도 들어가야합</div>
                  <div className='list-title-contents'>주소 들어가야함</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>전화번호</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>업체 전화번호전화번호</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>영업시간</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>영업시가아아아아안</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>영업점 방침</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>방침???????????????</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
