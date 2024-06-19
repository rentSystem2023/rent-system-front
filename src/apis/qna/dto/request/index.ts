// description: 문의사항 게시물 작성하기 Request Body DTO //
export interface PostQnaBoardRequestDto {
    title: string;
    contents: string;
    category: string;
    publicState: boolean;
    imageUrl: string | null;
}

// description: 문의사항 게시물 답글 작성하기 Request Body DTO //
export interface PostQnaRequestDto {
    title: string;
    comment : string;
}

// description: 문의사항 게시물 수정하기 Request Body DTO //
export interface PutQnaRequestDto {
    title: string;
    contents: string;
    category: string;
    publicState: boolean;
    imageUrl:string | null;
}

// description: 문의사항 댓글 달기 Request Body DTO //
export interface PostQnaCommentRequestDto {
    comment : string;
}

