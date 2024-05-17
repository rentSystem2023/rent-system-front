// description: 예약 하기 Request Body DTO //
export interface PostReservationRequestDto {
    insuranceType : string;
    commpanyCarCode : number;
    reservationDate : string;
    reservationSate : string;
    reservationPeriod : string;
}

// description: 예약 취소 Request Body DTO //
export interface PatchReservationRequestDto {
    reservationCode : string;
}
