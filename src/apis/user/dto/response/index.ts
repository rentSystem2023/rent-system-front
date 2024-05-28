import ResponseDto from "src/apis/response.dto";
import { UserListItem } from "src/types";


// description: 로그인 유저 정보 불러오기 Response Body DTO
export interface GetSignInUserResponseDto extends ResponseDto{
    userId: string;
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

// description: 내 정보 수정 Response Body DTO
export interface PatchMyInfoResponseDto extends ResponseDto {
    status: boolean;
    userId: string;
    nickName: string;
    userEmail: string;
    userRole: string;
    joinPath: string;
    joinDate: string;
}

// description: 유저 리스트 불러오기 Response Body DTO
export interface GetUserListResponseDto extends ResponseDto {
    boardList: UserListItem[];
}

// description: 유저 검색 리스트 불러오기 Response Body DTO
export interface GetSearchUserListResponseDto extends ResponseDto {
    boardList: UserListItem[];
}
