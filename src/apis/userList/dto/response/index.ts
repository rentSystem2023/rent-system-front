import ResponseDto from "src/apis/response.dto";
import { UserListItem } from "src/types";


// description:  전체 회원 리스트 불러오기 Response Body DTO
export interface GetUserListResponseDto extends ResponseDto {
    userList: UserListItem[];
}

// description: 회원 검색 게시물 리스트 불러오기 Response Body DTO
export interface GetSearchUserListResponseDto extends ResponseDto {
    userList: UserListItem[];
}

// description: 회원 상세페이지 불러오기 Response Body DTO
export interface GetDetailUserListResponseDto extends ResponseDto {
    userId: string;
    nickName: string;
    userEmail: string;
    joinDate: string;
    joinPath: String;
}