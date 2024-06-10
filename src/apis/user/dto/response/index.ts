import ResponseDto from "src/apis/response.dto";
import { QnaListItem, UserListItem } from "src/types";


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

// description: Q&A 전체 게시물 리스트 불러오기 Response Body DTO
export interface GetMyInfoQnaListResponseDto extends ResponseDto {
    qnaList: QnaListItem[];
}
