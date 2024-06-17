import React, { useEffect, useState } from 'react'
import './style.css'
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
    const [carImageUrl, setCarImageUrl] = useState<string>('');
    const [nickName, setNickName] = useState<string>('');
    const [reservationStart, setReservationStart] = useState<string>('');
    const [reservationEnd, setReservationEnd] = useState<string>('');
    const [insuranceType, setInsuranceType] = useState<string>('');
    
    const [carOil, setCarOil] = useState<number>(0);
    const [grade, setGrade] = useState<string>('');
    const [rentCompany, setRentCompany] = useState<string>('');
    const [companyTelnumber, setCompanyTelnumber] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [insurancePrice, setInsurancePrice] = useState<number>(0);

    const [carName, setCarName] = useState<string>('');
    const [carNumber, setCarNumber] = useState<string>('');
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

        const { carImageUrl, nickName, reservationStart, reservationEnd, insuranceType, carOil, grade, rentCompany, companyTelnumber, address, insurancePrice, reservationState, carName, carNumber } = result as GetMyReservationDetailResponseDto;
        setCarImageUrl(carImageUrl)
        setNickName(nickName);
        setReservationStart(reservationStart);
        setReservationEnd(reservationEnd);
        setInsuranceType(insuranceType);
        setCarOil(carOil);
        setGrade(grade);
        setRentCompany(rentCompany);
        setCompanyTelnumber(companyTelnumber);
        setAddress(address);
        setInsurancePrice(insurancePrice);
        setUserId(userId);
        setCarName(carName);
        setCarNumber(carNumber)
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

        if (reservationState !== '예약 완료') {
            alert('예약완료 상태에서만 예약 취소할 수 있습니다.')
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

        navigator(USER_RESERVATION_ABSOLUTE_PATH);
    }

    //                    effect                    //
    useEffect(() => {
        if (!reservationCode || !cookies.accessToken) return;

        getReservationDetailMyListRequest(reservationCode, cookies.accessToken).then(GetMyReservationDetailResponse);
    }, []);

    const insuranceTypes =
    insuranceType === 'normal' ? '완전자차' : 
    insuranceType === 'luxury' ? '고급자차' :
    insuranceType === 'super' ? '슈퍼자차' : '';

    return (
        <div id='information-wrapper'>
            <div className='information-main'>
                <div className="my-info-title">예약내역 상세</div>
                
                <div className='reservation-car-container'>
                    <div className='reservation-up-title'>닉네임</div>
                    <div className='qna-detail-info-divider'>{'\|'}</div>
                    <div className='reservation-content'>{nickName}</div>
                </div>
                <div className='reservation-car-container'>
                    <div className='reservation-up-title'>예약기간</div>
                    <div className='qna-detail-info-divider'>{'\|'}</div>
                    <div className='reservation-content'>{reservationStart} ~ {reservationEnd}</div>
                </div>

                <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>

                <div className='my-reservation-detail-info'>
                    <div className='my-reservation-list-wrap'>                
                        <div className='my-reservation-car-image detail'>
                            <img style={{ width: '130%', height: '100%'}} src={carImageUrl} />
                        </div>
                        
                        <div className='my-reservation-detail-list'>
                            <div className='reservation-car-container detail'>
                                <div className='reservation-side-title'>차량명</div>
                                <div className='qna-detail-info-divider list'>{'\|'}</div>
                                <div className='reservation-content'>{carName}</div>
                            </div>
                            <div className='reservation-car-container detail'>
                                <div className='reservation-side-title'>차 번호</div>
                                <div className='qna-detail-info-divider list'>{'\|'}</div>
                                <div className='reservation-content'>{carNumber}</div>
                            </div>
                            <div className='reservation-car-container detail'>
                                <div className='reservation-side-title'>등급</div>
                                <div className='qna-detail-info-divider list'>{'\|'}</div>
                                <div className='reservation-content'>{grade}</div>
                            </div>
                            <div className='reservation-car-container detail'>
                                <div className='reservation-side-title'>연비</div>
                                <div className='qna-detail-info-divider list'>{'\|'}</div>
                                <div className='reservation-content'>{carOil}</div>
                            </div>
                            <div className='reservation-car-container detail'>
                                <div className='reservation-side-title'>업체명</div>
                                <div className='qna-detail-info-divider list'>{'\|'}</div>
                                <div className='reservation-content'>{rentCompany}</div>
                            </div>
                            <div className='reservation-car-container detail'>
                                <div className='reservation-side-title'>업체 전화번호</div>
                                <div className='qna-detail-info-divider list'>{'\|'}</div>
                                <div className='reservation-content'>{companyTelnumber}</div>
                            </div>
                            <div className='reservation-car-container detail'>
                                <div className='reservation-side-title'>업체 주소</div>
                                <div className='qna-detail-info-divider list'>{'\|'}</div>
                                <div className='reservation-content'>{address}</div>
                            </div>
                            <div className='reservation-car-container detail'>
                                <div className='reservation-side-title'>보험 타입</div>
                                <div className='qna-detail-info-divider list'>{'\|'}</div>
                                <div className='reservation-content'>{insuranceTypes}</div>
                            </div>
                            <div className='reservation-car-container detail'>
                                <div className='reservation-side-title'>결제금액</div>
                                <div className='qna-detail-info-divider list'>{'\|'}</div>
                                <div className='reservation-content'>{insurancePrice}</div>
                            </div>
                        </div>
                    </div>

                    <div className='my-reservation-button'>
                        <div className='primary-button list' onClick={onListClickHandler}>목록</div>
                        <div className='error-button delete' onClick={onReservationCancelClickHandler}>예약취소</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
