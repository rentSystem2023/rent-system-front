import React, { useEffect, useState } from 'react'
import './style.css'
import { useReservationStore, useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { GetSearchDetailListResponseDto } from 'src/apis/reservation/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { RESERVATION_COMPANY_PATH } from 'src/constant';
import { getReservationDetailRequest, getSearchDetailListRequest, getSearchReservationCarPriceListRequest } from 'src/apis/reservation';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

//                    component                   //
export default function SearchDetail() {
  const krw = (price: number) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);

  //                    state                   //
  const { rentCompany } = useParams();
  const { loginUserId, loginUserRole } = useUserStore();
  const { selectedInsurance, selectedAddress, reservationStart, reservationEnd, selectedCar } = useReservationStore();

  const [carImageUrl, setCarImageUrl] = useState<string>('');
  const [carName, setCarName] = useState<string>('');
  const [carYear, setCarYear] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [carOil, setCarOil] = useState<number>();
  const [capacity, setCapacity] = useState<string>('');
  const [normalPrice, setNormalPrice] = useState<number>();
  const [luxuryPrice, setLuxuryPrice] = useState<number>();
  const [superPrice, setSuperPrice] = useState<number>();
  const [fuelType, setFuelType] = useState<string>('');
  const [companyTelnumber, setCompanyTelnumber] = useState<string>('');
  const [companyRule, setCompanyRule] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const [displayCarInfo, setDisplayCarInfo] = useState(true);

  //                    function                    //
  const navigator = useNavigate();

  const GetSearchDetailListResponse = (result: GetSearchDetailListResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
          result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 차량입니다.' :
              result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);

      // 어디로 내보낼지 아직 모르겠음
      navigator(RESERVATION_COMPANY_PATH);
      return;
    }

    const { fuelType, address, carImageUrl, carYear, brand, grade, carOil, capacity, normalPrice, luxuryPrice, superPrice, companyTelnumber, companyRule } = result as GetSearchDetailListResponseDto
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
    setAddress(address)
  };

  //                    event handler                   //
  // 차량정보 리스트
  const carInformationClickHandler = () => {
    setDisplayCarInfo(true)
  }

  // 업체정보 리스트
  const companyListClickHandler = () => {
    setDisplayCarInfo(false)
  }

  // 예약하기
  const reservationButtonClickHandler = () => {

  }

  //                    effect                    //
  useEffect(() => {
    if (!selectedCar || !rentCompany) return;

    getSearchReservationCarPriceListRequest(selectedAddress, reservationStart, reservationEnd, selectedCar.carName).then(GetSearchDetailListResponse);
    getSearchDetailListRequest(selectedAddress, reservationStart, reservationEnd, rentCompany, selectedCar.carName).then(GetSearchDetailListResponse);
  }, [selectedCar, rentCompany]);

  if (!selectedCar) return <></>;

  const insurance =
    selectedInsurance === 'normal' ? `${krw(selectedCar.lowNormalPrice)} ~ ${krw(selectedCar.highNormalPrice)}` :
      selectedInsurance === 'luxury' ? `${krw(selectedCar.lowLuxuryPrice)} ~ ${krw(selectedCar.highLuxuryPrice)}` :
        selectedInsurance === 'super' ? `${krw(selectedCar.lowSuperPrice)} ~ ${krw(selectedCar.highSuperPrice)}` : '';

  const insuranceType =
    selectedInsurance === 'normal' ? '완전자차' :
      selectedInsurance === 'luxury' ? '고급자차' :
        selectedInsurance === 'super' ? '슈퍼자차' : '';

  const calculateDateDifference = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // 밀리초를 일(day)로 변환
    return dayDifference;
  };

  const daysDifference = calculateDateDifference(reservationStart, reservationEnd);

  const insurancePrice =
    selectedInsurance === 'normal' && normalPrice ? `${krw(normalPrice * daysDifference)}` :
      selectedInsurance === 'luxury' && luxuryPrice ? `${krw(luxuryPrice * daysDifference)}` :
        selectedInsurance === 'super' && superPrice ? `${krw(superPrice * daysDifference)}` : '';

  //                    render                    //
  return (
    <div id="user-page-wrapper">
      <div className="search-datail-wrapper">
        <div className="search-detail-container">
          <div className="search-detail-image">
            <img style={{ width: '150%', height: '130%' }} src={carImageUrl} alt="Car" />
          </div>

          <div className="search-datail-list">
            <div className="search-info-container">
              <div className="search-detail-title">차이름</div>
              <div className="qna-detail-info-divider">{'\|'}</div>
              <div className="search-detail-contents">{selectedCar.carName}</div>
            </div>

            <div style={{ border: '1px solid rgba(238, 238, 238, 1)' }}></div>

            <div className="search-info-container">
              <div className="search-detail-title">예약 날짜</div>
              <div className="qna-detail-info-divider">{'\|'}</div>
              <div className="search-detail-contents">{`${reservationStart} ~ ${reservationEnd}`}</div>
            </div>
            <div style={{ border: '1px solid rgba(238, 238, 238, 1)' }}></div>

            <div className="search-payment-wrap">
              <div className="search-info-container">
                <div className="search-detail-title">가격</div>
                <div className="qna-detail-info-divider">{'\|'}</div>
                <div className="search-detail-contents">{insurancePrice}</div>
              </div>

              <div className="primary-button" onClick={reservationButtonClickHandler}>
                예약하기
              </div>
            </div>
          </div>
        </div>

        <div className="search-detail-info-list-wrap">
          <div className="search-detail-info-button">
            <div className={`search-detail-button-wrap${displayCarInfo ? ' active' : ''}`} onClick={carInformationClickHandler}>
              <div className="search-detail-info-title">
                차량 정보
              </div>
            </div>
            <div className={`search-detail-button-wrap${!displayCarInfo ? ' active' : ''}`} onClick={companyListClickHandler}>
              <div className="search-detail-info-title">
                업체 정보
              </div>
            </div>
          </div>

          <div className="search-detail-info-list-container">
            {displayCarInfo ? (
              <div className="search-detail-car-info-list">
                <div className="search-detail-info-title">차량 정보</div>
                <div className="search-detail-info-contents">
                  <div className="list-title-wrap">
                    <div className="list-title">차량명</div>
                    <div className="qna-detail-info-divider">{'\|'}</div>
                    <div className="list-title-contents">{selectedCar.carName}</div>
                  </div>
                  <div className="list-title-wrap">
                    <div className="list-title">브랜드</div>
                    <div className="qna-detail-info-divider">{'\|'}</div>
                    <div className="list-title-contents">{brand}</div>
                  </div>
                  <div className="list-title-wrap">
                    <div className="list-title">등급</div>
                    <div className="qna-detail-info-divider">{'\|'}</div>
                    <div className="list-title-contents">{grade}</div>
                  </div>
                  <div className="list-title-wrap">
                    <div className="list-title">연비</div>
                    <div className="qna-detail-info-divider">{'\|'}</div>
                    <div className="list-title-contents">{carOil}</div>
                  </div>
                  <div className="list-title-wrap">
                    <div className="list-title">연료</div>
                    <div className="qna-detail-info-divider">{'\|'}</div>
                    <div className="list-title-contents">{fuelType}</div>
                  </div>
                  <div className="list-title-wrap">
                    <div className="list-title">연식</div>
                    <div className="qna-detail-info-divider">{'\|'}</div>
                    <div className="list-title-contents">{carYear}</div>
                  </div>
                  <div className="list-title-wrap">
                    <div className="list-title">보험</div>
                    <div className="qna-detail-info-divider">{'\|'}</div>
                    <div className="list-title-contents">{insuranceType}</div>
                  </div>
                  <div className="list-title-wrap">
                    <div className="list-title">보험료</div>
                    <div className="qna-detail-info-divider">{'\|'}</div>
                    <div className="list-title-contents">{insurancePrice}</div>
                  </div>
                  <div className="list-title-wrap">
                    <div className="list-title">탑승 인원 수</div>
                    <div className="qna-detail-info-divider">{'\|'}</div>
                    <div className="list-title-contents">{capacity}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="search-detail-company-info-list">
                <div className="search-detail-info-title">업체 정보</div>
                <div className="search-detail-info-contents">
                  <div className="list-title-wrap">
                    <div className="list-title">업체명</div>
                    <div className="qna-detail-info-divider">{'\|'}</div>
                    <div className="list-title-contents">{rentCompany}</div>
                  </div>
                  <div className="list-map-wrap">
                    <div className="list-title-wrap">
                      <div className="list-title">업체 위치</div>
                      <div className="qna-detail-info-divider">{'\|'}</div>
                      <div className="list-title-contents">{address}</div>
                    </div>
                    <Map
                      center={{ lat: 33.5063, lng: 126.49 }}
                      style={{ width: '100%', height: '400px' }}
                      level={6}
                    >
                      <MapMarker // 마커를 생성합니다
                        position={{
                          // 마커가 표시될 위치입니다
                          lat: 33.4996, lng: 126.5312
                        }}
                        image={{
                          src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                          size: { width: 30, height: 40 },
                          options: {
                            alt: '제주특별자치도 제주시 용문로 8',
                            offset: { x: 15, y: 15 },
                          },
                        }}
                      />
                    </Map>
                  </div>
                  <div className="list-title-wrap">
                    <div className="list-title">전화번호</div>
                    <div className="qna-detail-info-divider">{'\|'}</div>
                    <div className="list-title-contents">{companyTelnumber}</div>
                  </div>
                  <div className="list-title-wrap">
                    <div className="list-title">영업점 방침</div>
                    <div className="qna-detail-info-divider">{'\|'}</div>
                    <div className="list-title-contents">{companyRule}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
