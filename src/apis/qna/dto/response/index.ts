import ResponseDto from "src/apis/response.dto";
import { QnaListItem, QnaMyListItem } from "src/types";


// description: Q&A 전체 게시물 리스트 불러오기 Response Body DTO
export interface GetQnaBoardListResponseDto extends ResponseDto {
    qnaList: QnaListItem[];
}

// description: Q&A 검색 게시물 리스트 불러오기 Response Body DTO
export interface GetSearchQnaBoardListResponseDto extends ResponseDto {
    qnaList: QnaListItem[];
}

// description: Q&A 게시물 불러오기 Response Body DTO
export interface GetQnaBoardResponseDto extends ResponseDto {
    receptionNumber: number;
    status: boolean;
    title: string;
    writerId: string;
    writeDatetime: string;
    viewCount: number;
    contents: string;
    comment: string | null;
    imageUrl: string;
    category: string;
    publicState: boolean;
}

// description: 마이페이지 해당 사용자의 Q&A 전체 게시물 리스트 불러오기 Response Body DTO
export interface GetQnaBoardMyListResponseDto extends ResponseDto {
    qnaMyList: QnaMyListItem[];
}


// description: 마이페이지 해당 사용자의 Q&A 검색 게시물 리스트 불러오기 Response Body DTO
export interface GetSearchQnaBoardMyListResponseDto extends ResponseDto {
    qnaMyList: QnaMyListItem[];
}