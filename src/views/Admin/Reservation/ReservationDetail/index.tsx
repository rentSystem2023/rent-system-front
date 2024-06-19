
import { useUserStore } from 'src/stores';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { GetReservationDetailResponseDto } from 'src/apis/reservation/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { ADMIN_RESERVATION_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH } from 'src/constant';
import { PatchReservationCancelRequest, deleteReservationListRequest, getReservationDetailRequest } from 'src/apis/reservation';
import { PatchReservationCancelRequestDto} from 'src/apis/reservation/dto/request';

export default function ReservationDetail() {

    //                    state                    //
    const { loginUserRole } = useUserStore();
    const { reservationCode } = useParams();

    const [cookies] = useCookies();
    const [rentCompany, setRentCompany] = useState<string>('');
    const [carName, setCarName] = useState<string>('');
    const [carNumber, setCarNumber] = useState<string>('');
    const [reservationStart, setReservationStart] = useState<string>('');
    const [reservationEnd, setReservationEnd] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [nickName, setNickName] = useState<string>('');
    const [reservationState, setReservationState] = useState<string>('');
    const [insuranceType, setInsuranceType] = useState<string>('');
    const [insurancePrice, setInsurancePrice] = useState<number>(0);


    //                    function                    //
    const navigator = useNavigate();

    const GetReservationDetailResponse = (result: GetReservationDetailResponseDto | ResponseDto | null) => {
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

        const { rentCompany, carName, carNumber, reservationStart, reservationEnd, userId, nickName, reservationState, insuranceType, insurancePrice } = result as GetReservationDetailResponseDto;
        setRentCompany(rentCompany);
        setCarName(carName);
        setCarNumber(carNumber);
        setReservationStart(reservationStart);
        setReservationEnd(reservationEnd);
        setUserId(userId);
        setNickName(nickName);
        setReservationState(reservationState);
        setInsuranceType(insuranceType);
        setInsurancePrice(insurancePrice);
    };

    // 예약승인 삭제예정
    // const patchReservaitonApproveResponse = (result: ResponseDto | null) => {
    //     const message =
    //     !result ? '서버에 문제가 있습니다.' :
    //     result.code === 'AF' ? '권한이 없습니다.' :
    //     result.code === 'VF' ? '올바르지 않은 예약번호입니다.' :
    //     result.code === 'NR' ? '존재하지 않는 예약입니다.' :
    //     result.code === 'NW' ? '예약대기 상태가 아닙니다.' :
    //     result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    // if (!result || result.code !== 'SU') {
    //     alert(message);
    //     return;
    //     }
    // };

    const patchReservaitonCancelResponse = (result: ResponseDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'VF' ? '올바르지 않은 예약번호입니다.' :
        result.code === 'NR' ? '존재하지 않는 예약입니다.' :
        result.code === 'NCS' ? '예약취소 상태가 아닙니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
        alert(message);
        return;
        }
    };

    const deleteReservationResponse = (result: ResponseDto | null) => {

        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'VF' ? '올바르지 않은 예약번호입니다.' :
        result.code === 'NC' ? '존재하지 않는 예약입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU'){
            alert(message);
            return;
        }
        navigator(ADMIN_RESERVATION_LIST_ABSOLUTE_PATH);
    };

    //                    event handler                    //
    const onListClickHandler = () => {
        navigator(ADMIN_RESERVATION_LIST_ABSOLUTE_PATH);
    }

    // 예약승인 삭제예정
    // const onReservationApproveClickHandler = () => {
    //     if (!reservationCode || loginUserRole !== 'ROLE_ADMIN' || !cookies.accessToken) return;
    //     const isConfirm = window.confirm('예약 승인하시겠습니까?');
    //     if (!isConfirm) return;

    //     const requestBody: PatchReservationApproveRequestDto = { reservationState: '예약완료' };
    //     PatchReservationApproveRequest(reservationCode, requestBody, cookies.accessToken)
    //     .then(patchReservaitonApproveResponse); 
    // }


    const onReservationCancelClickHandler = () => {
        if (!reservationCode || loginUserRole !== 'ROLE_ADMIN' || !cookies.accessToken) return;
        if (reservationState !== 'watingCancel') {
            alert('예약 취소 대기 상태에서만 예약 취소할 수 있습니다.')
            return;
        }
        const isConfirm = window.confirm('취소 승인하시겠습니까?');
        if (!isConfirm) return;

        const requestBody: PatchReservationCancelRequestDto = { reservationState: 'cancelComplete' };
        PatchReservationCancelRequest(reservationCode, requestBody, cookies.accessToken)
        .then(patchReservaitonCancelResponse); 

        alert('해당 예약 내역이 취소되었습니다.');

        navigator(ADMIN_RESERVATION_LIST_ABSOLUTE_PATH);
    }

    const onDeleteClickHandler = () => {
        if (!reservationCode || loginUserRole !== 'ROLE_ADMIN' || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteReservationListRequest(reservationCode, cookies.accessToken) 
        .then(deleteReservationResponse)    
    }

    //                    effect                    //
    useEffect(() => {
        if (!reservationCode || !cookies.accessToken) return;

        getReservationDetailRequest(reservationCode, cookies.accessToken).then(GetReservationDetailResponse);
    }, []);

    //                    render                    //
    const reservationStateWord =
    reservationState === 'reservationComplete' ? '예약 완료' :
    reservationState === 'watingCancel' ? '예약 취소 대기' :
    reservationState === 'cancelComplete' ? '예약 취소 완료' : '';

    const insuranceTypes =
    insuranceType === 'normal' ? '완전자차' : 
    insuranceType === 'luxury' ? '고급자차' :
    insuranceType === 'super' ? '슈퍼자차' : '';

    const krw = (price: number) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);

    return (
        <div id='admin-detail-wrapper'>
        <div className="my-info-title">예약 정보 상세</div>
            <div className='admin-detail-main-box'>
                <div className='admin-datail-contents'>
                    <div className='admin-contents-wrap'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>예약번호</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{reservationCode}</div>
                        </div>
                    </div>
                    
                    <div className='admin-contents-wrap'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>업체이름</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{rentCompany}</div>
                        </div>
                    </div>

                    <div className='admin-contents-wrap'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>차종</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{carName}</div>
                        </div>
                    </div>

                    <div className='admin-contents-wrap'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>차량번호</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{carNumber}</div>
                        </div>
                    </div>

                    <div className='admin-contents-wrap'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>예약날짜</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{reservationStart} ~ {reservationEnd}</div>
                        </div>
                    </div>

                    <div className='admin-contents-wrap'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>보험타입</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{insuranceTypes}</div>
                        </div>
                    </div>

                    <div className='admin-contents-wrap'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>결제금액</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{`${krw(insurancePrice)}`}</div>
                        </div>
                    </div>

                    <div className='admin-contents-wrap'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>예약자 아이디</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{userId}</div>
                        </div>
                    </div>

                    {/* <div className='admin-contents-wrap'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>예약자 닉네임</div>
                        </div>
                        <div className='admin-content-wrap'>
                            <div className='admin-detail-content'>{nickName}</div>
                        </div>
                    </div> */}

                    <div className='admin-contents-wrap state'>
                        <div className='admin-title-wrap'>
                            <div className='admin-detail-title'>예약상태</div>
                        </div>
                        <div className='admin-content-wrap reser'>
                            <div className='admin-detail-content'>{reservationStateWord}</div>
                            <div className='admin-reservation-state'>
                                {/* <div className='reservation-button confirm' onClick={onReservationApproveClickHandler} >예약승인</div> */}
                                <div className='reservation-button cancle' onClick={onReservationCancelClickHandler} >취소승인</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='admin-button-box reservation'>  
                <div className='reservation-primary-button'>
                    <div className='primary-button list' onClick={onListClickHandler}>목록</div>                    
                </div>              
                <div className='reservation-error-button'>
                    <div className='error-button delete' onClick={onDeleteClickHandler} >삭제</div>
                </div>
            </div>
        </div>
    );
}