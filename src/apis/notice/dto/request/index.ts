// description:  공지사항 등록하기 Response Body DTO
export interface PostNoticeBoardRequestDto {
    title : string;
    contents: string;
    imageUrl: string | null;
}

// description:  공지사항 수정하기 Response Body DTO
export interface PutNoticeBoardRequestDto {
    title : string;
    contents: string;
    imageUrl: string | null;
}