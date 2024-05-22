import ResponseDto from "src/apis/response.dto";
import { noticeListItem } from "src/types";

// description:  공지사항 전체 게시물 리스트 불러오기 Response Body DTO
export interface GetNoticeBoardListResponseDto extends ResponseDto {
    noticeList: noticeListItem[];
}

// description: 공지사항 검색 게시물 리스트 불러오기 Response Body DTO
export interface GetSearchNoticeBoardListResponseDto extends ResponseDto {
    noticeList: noticeListItem[];
}

// description: 공지사항 게시물 불러오기 Response Body DTO
export interface GetNoticeBoardResponseDto extends ResponseDto {
    registNumber: number;
    title: string;
    writerId: string;
    writeDatetime: string;
    viewCount: number;
    contents: string;
    imageUrl: string | null;
}
