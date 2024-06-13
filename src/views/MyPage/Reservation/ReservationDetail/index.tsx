import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getReservationDetailMyListRequest, patchReservationRequest } from 'src/apis/user';
import { PatchReservationRequestDto } from 'src/apis/user/dto/request';
import { GetMyReservationDetailResponseDto } from 'src/apis/user/dto/response';
import { GET_MY_RESERVATION_LIST_URL, MAIN_ABSOLUTE_PATH, USER_RESERVATION_ABSOLUTE_PATH, USER_RESERVATION_DETAIL_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';

export default function MyReservationDetail() {

    //                    state                    //
    const { loginUserRole } = useUserStore();
    const { reservationCode } = useParams();

    const [cookies] = useCookies();
    const [nickName, setNickName] = useState<string>('');
    const [reservationStart, setReservationStart] = useState<string>('');
    const [reservationEnd, setReservationEnd] = useState<string>('');
    const [insuranceType, setInsuranceType] = useState<string>('');
    const [carOil, setCarOil] = useState<number>(0);
    const [grade, setGrade] = useState<string>('');
    const [rentCompany, setRentCompany] = useState<string>('');
    const [companyTelnumber, setCompanyTelnumber] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [price, setPrice] = useState<number>(0);

    // const [carName, setCarName] = useState<string>('');
    // const [carNumber, setCarNumber] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [reservationState, setReservationState] = useState<string>('');

    //                    function                    //
    const navigator = useNavigate();

    const GetMyReservationDetailResponse = (result: GetMyReservationDetailResponseDto | ResponseDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '잘못된 예약 번호입니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'NR' ? '존재하지 않는 예약입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(MAIN_ABSOLUTE_PATH);
                return;
            }
        }

        const { nickName, reservationStart, reservationEnd, insuranceType, carOil, grade, rentCompany, companyTelnumber, address, price, reservationState } = result as GetMyReservationDetailResponseDto;
        setNickName(nickName);
        setReservationStart(reservationStart);
        setReservationEnd(reservationEnd);
        setInsuranceType(insuranceType);
        setCarOil(carOil);
        setGrade(grade);
        setRentCompany(rentCompany);
        setCompanyTelnumber(companyTelnumber);
        setAddress(address);
        setPrice(price);
        setUserId(userId);
        
        // setCarName(carName);
        setReservationState(reservationState);
    };

    const patchMyReservationResponse = (result: ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '올바르지 않은 예약번호입니다.' :
            result.code === 'NC' ? '존재하지 않는 예약입니다.' :
            result.code === 'NW' ? '예약대기 상태가 아닙니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
    
        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

    };

    //                    event handler                    //
    const onListClickHandler = () => {
        navigator(USER_RESERVATION_ABSOLUTE_PATH);
    }

    const onReservationCancelClickHandler = () => {

        if (!reservationCode || !cookies.accessToken || reservationState === '예약취소') return;

        if (reservationState === '예약 취소') {
            alert('이미 취소된 예약내역입니다.')
            return;
        }
        const isConfirm = window.confirm('예약 취소하시겠습니까?');
        if (!isConfirm) return;

        const requestBody: PatchReservationRequestDto = { 
            reservationState: '예약 취소' 
        };
        
        patchReservationRequest(reservationCode, requestBody, cookies.accessToken)
        .then(patchMyReservationResponse);

        alert('해당 예약 내역이 취소되었습니다.');

        // navigator(USER_RESERVATION_ABSOLUTE_PATH);
    }

    //                    effect                    //
    useEffect(() => {
        if (!reservationCode || !cookies.accessToken) return;

        getReservationDetailMyListRequest(reservationCode, cookies.accessToken).then(GetMyReservationDetailResponse);
    }, []);

    return (
        <div id="my-reservation-detail">나의 예약 상세
            <div className='my-reservation-detail-info'>
                <div className='my-reservation-detail-nickname'>닉네임 : {nickName}</div>
                <div className='my-reservation-detail-period'>예약기간 : {reservationStart} ~ {reservationEnd}</div>
                <div className='my-reservation-detail-insurance-type'>보험유형 : {insuranceType}</div>
                <div className='my-reservation-detail-car-oil'>연비 : {carOil}</div>
                <div className='my-reservation-detail-grade'>차 등급 : {grade}</div>
                <div className='my-reservation-detail-company'>영업점 : {rentCompany}</div>
                <div className='my-reservation-detail-company-telnumber'>영업점 전화번호 : {companyTelnumber}</div>
                <div className='my-reservation-detail-company-address'>영업점 주소 : {address}</div>
                <div className='my-reservation-detail-price'>가격 : {price}</div>
            </div>
            <div className='my-reservation-button'>
                <div className='moving-my-reservation-list' onClick={onListClickHandler}>목록</div>
            </div>
            <div className='my-reservation-cancel h2' onClick={onReservationCancelClickHandler}>취소 버튼</div>
        </div>
    )
}
