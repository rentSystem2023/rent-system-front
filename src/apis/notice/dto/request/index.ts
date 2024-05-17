// description:  공지사항 등록하기 Response Body DTO
export interface PostRegistNoticeRequestDto {
    title : string;
    contents: string;
    imageUrl: string;
}

// description:  공지사항 수정하기 Response Body DTO
export interface PostNoticeRequestDto {
    registNumber: number;
}