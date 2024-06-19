import React, { useEffect, useState } from 'react'
import './style.css'
import { useReservationStore, useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { GetSearchDetailListResponseDto, PostReservationResponseDto } from 'src/apis/reservation/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { AUTH_SIGN_IN_ABSOLUTE_PATH, RESERVATION_CAR_ABSOLUTE_PATH, USER_RESERVATION_ABSOLUTE_PATH } from 'src/constant';
import { getSearchDetailListRequest, postReservationRequest } from 'src/apis/reservation';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { PostReservationRequestDto } from 'src/apis/reservation/dto/request';

//                    component                   //
export default function SearchDetail() {
  const krw = (price: number) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);

  //                    state                   //
  const { rentCompany } = useParams();
  const { loginUserId, loginUserRole } = useUserStore();
  const { selectedInsurance, selectedAddress, reservationStart, reservationEnd, selectedCar } = useReservationStore();
  const [cookies] = useCookies();

  const [carImageUrl, setCarImageUrl] = useState<string>('');
  const [carYear, setCarYear] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [carOil, setCarOil] = useState<number>();
  const [capacity, setCapacity] = useState<string>('');
  const [normalPrice, setNormalPrice] = useState<number>();
  const [luxuryPrice, setLuxuryPrice] = useState<number>();
  const [superPrice, setSuperPrice] = useState<number>();
  const [companyCarCode, setCompanyCarCode] = useState<number>(0);
  const [fuelType, setFuelType] = useState<string>('');
  const [companyTelnumber, setCompanyTelnumber] = useState<string>('');
  const [companyRule, setCompanyRule] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [companyLng, setCompanyLng] = useState<number>();
  const [companyLat, setCompantLat] = useState<number>();
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
      navigator(RESERVATION_CAR_ABSOLUTE_PATH);
      return;
    };

    const { fuelType, address, carImageUrl, carYear, brand, grade, carOil, capacity, normalPrice, luxuryPrice, superPrice, companyCarCode, companyTelnumber, companyRule,companyLat,companyLng } = result as GetSearchDetailListResponseDto
    setCarImageUrl(carImageUrl);
    setCarYear(carYear);
    setBrand(brand);
    setGrade(grade);
    setCarOil(carOil);
    setCapacity(capacity);
    setNormalPrice(normalPrice);
    setLuxuryPrice(luxuryPrice);
    setSuperPrice(superPrice);
    setCompanyCarCode(companyCarCode);
    setCompanyTelnumber(companyTelnumber);
    setCompanyRule(companyRule);
    setFuelType(fuelType);
    setAddress(address);
    setCompantLat(companyLat);
    setCompanyLng(companyLng);
  };

  const postReservationResponse = (result: PostReservationResponseDto | ResponseDto | null) => {
    const message =
    !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'NV' ? '존재하지 않는 차량입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      return;
    }

    const { redirectUrl } = result as PostReservationResponseDto;
    window.location.href = redirectUrl;
  };

  //                    event handler                   //
  const carInformationClickHandler = () => {
    setDisplayCarInfo(true);
  };

  const companyListClickHandler = () => {
    setDisplayCarInfo(false);
  };

  const reservationButtonClickHandler = () => {
    if (!cookies.accessToken || loginUserRole !== 'ROLE_USER') {
      alert('로그인 후 예약 가능합니다.'); 
      return navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
    };

    const isConfirm = window.confirm('예약하시겠습니까?');
    
    if (!isConfirm) return;

    const price = 
      selectedInsurance === 'normal' && normalPrice ? normalPrice * daysDifference :
      selectedInsurance === 'luxury' && luxuryPrice ? luxuryPrice * daysDifference :
      selectedInsurance === 'super' && superPrice ? superPrice * daysDifference : 0;

    const requestBody: PostReservationRequestDto = {insuranceType: selectedInsurance, reservationStart, reservationEnd, companyCarCode, price};
    postReservationRequest(requestBody, cookies.accessToken).then(postReservationResponse);
  };

  //                    effect                    //
  useEffect(() => {
    if (!selectedCar || !rentCompany) return;

    getSearchDetailListRequest(selectedAddress, reservationStart, reservationEnd, rentCompany, selectedCar.carName).then(GetSearchDetailListResponse);
  }, [selectedCar, rentCompany]);

  if (!selectedCar) return <></>;

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

  const insuranceType =
    selectedInsurance === 'normal' ? '완전자차' :
    selectedInsurance === 'luxury' ? '고급자차' :
    selectedInsurance === 'super' ? '슈퍼자차' : '';

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
                    {companyLat && companyLng &&  (
                    <Map
                    center={{ lat: companyLat, lng:companyLng }}
                    style={{ width: '100%', height: '400px' }}
                    level={6}
                  >
                    <MapMarker // 마커를 생성합니다
                      position={{
                        // 마커가 표시될 위치입니다
                        lat: companyLat, lng: companyLng
                      }}
                      image={{
                        src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
                        size: { width: 30, height: 40 },
                        options: {
                          alt: '제주특별자치도 제주시 용문로 8',
                          offset: { x: 15, y: 15 },
                        },
                      }}
                      title={rentCompany}
                    />
                  </Map>
                    )}
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
