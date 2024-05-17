import ResponseDto from "src/apis/response.dto";

// description: 나의 정보 수정 Response Body DTO
export interface PathchModifyRequestDto extends ResponseDto{
    telnumber: String;
    userEmail: String;
}

