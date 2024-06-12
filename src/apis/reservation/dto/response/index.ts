import ResponseDto from "src/apis/response.dto";
import { PopularCarListItem, ReservationCancelListItem, ReservationCarListItem, ReservationCarPriceListItem, ReservationListItem, ReservationUserListItem } from "src/types";


// description: 나의 예약 리스트 불러오기 Response Body DTO
export interface GetReservationMyListResponseDto extends ResponseDto {
    reservationList: ReservationListItem[];
}

// description: 나의 예약 리스트 상세보기 Response Body DTO
export interface GetReservationDetailMyListResponseDto extends ResponseDto {
    carImageUrl: string;
    nickName: string;
    reservationStart: string;
    reservationEnd: string;
    carOil: number;
    grade: string;
    carNumber: string;
    rentCompany: string;
    companyTelnumber: string;
    address: string;
}

// description: 취소 신청 예약 리스트 불러오기 Response Body DTO
export interface GetReservationCancelListResponseDto extends ResponseDto {
    reservationCancelList: ReservationCancelListItem[];
}

// description: 전체 예약 리스트 불러오기 Response Body DTO
export interface GetReservationListResponseDto extends ResponseDto {
    reservationList : ReservationUserListItem[];
}

// description: 예약 상세 리스트 불러오기 Response Body DTO
export interface GetReservationDetailResponseDto extends ResponseDto {
    reservationCode : string | number;
    rentCompany : string;
    carName : string;
    carNumber : string;
    reservationStart : string;
    reservationEnd : string;
    userId : string;
    nickName : string;
    reservationState : string;
}


// description: 예약 검색 리스트 불러오기 Response Body DTO
export interface GetSearchReservationListResponseDto extends ResponseDto {
    reservationUserList : ReservationUserListItem[];
}

// description: 인기차량 리스트 불러오기 Response Body DTO
export interface GetReservationPopularListResponseDto extends ResponseDto {
    popularList: PopularCarListItem[];
} 

// description: 차량 검색 결과 리스트 불러오기 Response Body DTO
export interface GetSearchReservationCarListResponseDto extends ResponseDto {
    reservationCarList: ReservationCarListItem[];
}

// description: 보험별 가격 검색 결과 불러오기 Response Body DTO
export interface GetSearchReservationCarPriceListResponseDto extends ResponseDto {
    priceList: ReservationCarPriceListItem[];
}

// description: 보험별 가격 상세 검색 결과 불러오기 Response Body DTO
export interface GetSearchDetailListResponseDto extends ResponseDto {
    carImageUrl: string;
    carName: string;
    carYear: string;
    brand: string;
    grade: string;
    carOil: number;
    fuelType: string;
    capacity: string;
    normalPrice: number;
    luxuryPrice: number;
    superPrice: number;
    rentCompany: string;
    address: string;
    companyTelnumber: string;
    companyRule: string;
    reservationStart: string;
    reservationEnd: string;
}

