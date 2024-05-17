import ResponseDto from "src/apis/response.dto";
import { UserListItem } from "src/types";


// description: 로그인 유저 정보 불러오기 Response Body DTO
export interface GetSignInUserResponseDto extends ResponseDto{
    userId: string;
    userRole: string;
}

// description: 나의 정보 불러오기 Response Body DTO
export interface GetinformationResponseDto extends ResponseDto{
    nickName: string;
    userId: string;
    userPassword: string;
    telnumber: string;
    userEmail: string;
    joinDate: Date;
    userRole: String;
}

// description: 유저  리스트 불러오기 Response Body DTO
export interface GetUserListResponseDto extends ResponseDto {
    boardList: UserListItem[];
}

// description: 유저  검색 리스트 불러오기 Response Body DTO
export interface GetUserSearchListResponseDto extends ResponseDto{
    boardList: UserListItem[];
}