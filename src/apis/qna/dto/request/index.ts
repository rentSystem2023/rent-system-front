// description: Q&A 게시물 작성하기 Request Body DTO //
export interface PostQnaBoardRequestDto {
    title: string;
    contents: string;
    category: string;
    imageUrl: string;
    publicState: boolean;
}

// description: Q&A 게시물 답글 작성하기 Request Body DTO //
export interface PostQnaRequestDto {
    comment : string;
}

// description: Q&A 게시물 수정하기 Request Body DTO //
export interface PutQnaRequestDto {
    title: string;
    contents: string;
    category: string;
    imageUrl: string;
    publicState: boolean;
}