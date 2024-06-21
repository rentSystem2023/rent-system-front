import ResponseDto from "src/apis/response.dto";
import { MyReservationListItem, QnaListItem } from "src/types";

// description: 로그인 유저 정보 불러오기 Response Body DTO
export interface GetSignInUserResponseDto extends ResponseDto{
    userId: string;
    nickName: string;
    userRole: string;
}

// description: 내 정보 불러오기 Response Body DTO
export interface GetMyInfoResponseDto extends ResponseDto{
    status: boolean;
    userId: string;
    nickName: string;
    userEmail: string;
    userRole: String;
    joinPath: String;
    joinDate: string;
}

// description: 나의 Q&A 전체 게시물 리스트 불러오기 Response Body DTO
export interface GetMyInfoQnaListResponseDto extends ResponseDto {
    qnaList: QnaListItem[];
}

// description: 나의 예약 리스트 불러오기 Response Body DTO
export interface GetMyReservationListResponseDto extends ResponseDto {
    reservationList: MyReservationListItem[];
}

// description: 나의 예약 리스트 상세보기 Response Body DTO
export interface GetMyReservationDetailResponseDto extends ResponseDto {
    carImageUrl: string;
    nickName: string;
    reservationStart: string;
    reservationEnd: string;
    insuranceType: string;
    carOil: number;
    grade: string;
    carNumber: string;
    rentCompany: string;
    companyTelnumber: string;
    address: string;
    reservationState: string;
    carName: string;
    insurancePrice: number;
}
