import ResponseDto from "src/apis/response.dto";

// description: 내 정보 수정 Response Body DTO
export interface PatchUserRequestDto{
    userPassword: String;
    nickName: String;
}

