// description: 예약 하기 Request Body DTO //
export interface PostReservationRequestDto {
    insuranceType : string;
    reservationStart : string;
    reservationEnd : string;
    commpanyCarCode : number;
}

// description: 예약 취소 하기 Request Body DTO //
export interface PatchReservationRequestDto {
    reservationState : string;
}

// description: 예약 신청 승인 하기 Request Body DTO //
export interface PathchReservationApproveRequestDto {
    reservationState : string;
}