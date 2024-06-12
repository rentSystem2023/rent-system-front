
import { useUserStore } from 'src/stores';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { GetReservationDetailResponseDto } from 'src/apis/reservation/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { ADMIN_RESERVATION_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH } from 'src/constant';
import { PathchReservationApproveRequest, deleteReservationListRequest, getReservationDetailRequest } from 'src/apis/reservation';
import { PathchReservationApproveRequestDto } from 'src/apis/reservation/dto/request';

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

        const { rentCompany, carName, carNumber, reservationStart, reservationEnd, userId, nickName, reservationState } = result as GetReservationDetailResponseDto;
        setRentCompany(rentCompany);
        setCarName(carName);
        setCarNumber(carNumber);
        setReservationStart(reservationStart);
        setReservationEnd(reservationEnd);
        setUserId(userId);
        setNickName(nickName);
        setReservationState(reservationState);
    };

    const patchReservaitonApproveResponse = (result: ResponseDto | null) => {

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

    const onReservationApproveClickHandler = () => {
        if (!reservationCode || loginUserRole !== 'ROLE_ADMIN' || !cookies.accessToken) return;
        const isConfirm = window.confirm('예약 승인하시겠습니까?');
        if (!isConfirm) return;

        const requestBody: PathchReservationApproveRequestDto = { reservationState: '예약완료' };
        PathchReservationApproveRequest(reservationCode, requestBody, cookies.accessToken)
        .then(patchReservaitonApproveResponse); 
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
    return (
        <div id="reservation-detail-wrapper">
            <div className='company-detail-container'>
                <h2>예약 현황</h2>
                    <div className="company-detail-box">
                            <div>예약번호{reservationCode}</div>
                            <div>업체이름{rentCompany}</div>
                            <div>차종{carName}</div>
                            <div>차량번호{carNumber}</div>
                            <div>예약시작일{reservationStart}</div>
                            <div>예약종료일{reservationEnd}</div>
                            <div>아이디{userId}</div>
                            <div>닉네임{nickName}</div>
                            <div>예약상태{reservationState}</div>
                    </div>
                <div className='primary-button' onClick={onListClickHandler} >목록보기</div>
                <div className='primary-button' onClick={onReservationApproveClickHandler} >예약완료 처리버튼 이름만 예약완료로 변경</div>
                <div className='error-button' >예약취소승인 처리하면 예약취소완료 or 바로삭제처리 back은 delete로 되어있음</div>
                <div className='error-button' onClick={onDeleteClickHandler} >삭제</div>
            </div>
        </div>
        );



}