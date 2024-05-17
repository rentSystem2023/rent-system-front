import ResponseDto from "src/apis/response.dto";
import { PopularCarListItem, PriceListItem, ReservationListItem } from "src/types";


// description: 나의 예약 리스트 불러오기 Response Body DTO
export interface GetReservationMyListResponseDto extends ResponseDto {
    carImageUrl: string;
    nickName: string;
    reservationDate: string;
    reservationCode: string;
    rentCompany: string;
}
// description: 전체 예약 리스트 불러오기 Response Body DTO
export interface GetReservationListResponseDto extends ResponseDto{
    reservationList : ReservationListItem[];
}


// description: 인기차량 리스트 불러오기 Response Body DTO
export interface GetPopularcarListResponseDto extends ResponseDto {
    popularCarList: PopularCarListItem[];
} 

// description: 차량 검색 결과 리스트 불러오기 Response Body DTO
export interface GetSearchCarListResponseDto extends ResponseDto {
    address : string;
    reservationPeriod : string;
}

// description: 보험별 가격 검색 결과 불러오기 Response Body DTO
export interface GetSearchPriceListResponseDto extends ResponseDto {
    priceList: PriceListItem[];
}

// description: 보험별 가격 상세 검색 결과 불러오기 Response Body DTO
export interface GetSearchDetailListResponseDto extends ResponseDto {
    carImageUrl: string;
    carName: string;
    carYear: string;
    reservationPeriod: string;
    normalPrice: number;
    luxuryPrice: number;
    superPrice: number;
    brand: string;
    grade: string;
    carOil: string;
    fuelType: string;
    capacity: string;
    rentCompany: string;
    address: string;
    companyTelnumber: string;
    companyRule: string;
}

