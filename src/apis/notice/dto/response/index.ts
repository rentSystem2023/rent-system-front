import ResponseDto from "src/apis/response.dto";
import { noticeListItem } from "src/types";

// description:  공지사항 전체 게시물 리스트 불러오기 Response Body DTO
export interface GetNoticeListResponseDto extends ResponseDto {
    noticeList: noticeListItem[];
}

// description: 공지사항 검색  게시물 리스트 불러오기 Response Body DTO
export interface GetSearchListResponseDto extends ResponseDto {
    noticeList: noticeListItem[];
}

// description: 공지사항 게시물 리스트 불러오기 Response Body DTO
export interface GetListResponseDto extends ResponseDto {
    registNumber: number;
    title: string;
    contents: string;
    writeDatetime: string;
    viewCount: number;
    imageUrl: string;
}
