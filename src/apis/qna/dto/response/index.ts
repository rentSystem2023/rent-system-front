import ResponseDto from "src/apis/response.dto";
import { BoardListItem } from "src/types";



export interface GetQnaListResponseDto extends ResponseDto {
    boardList: BoardListItem[];
}

export interface GetSearchQnaBoardListResponseDto extends ResponseDto {
    boardList: BoardListItem[];
}

export interface GetQnaResponseDto extends ResponseDto {
    receptionNumber: number;
    status: boolean;
    title: string;
    writerId: string;
    writeDatetime: string;
    viewCount: number;
    contents: string;
    comment: string | null;
}