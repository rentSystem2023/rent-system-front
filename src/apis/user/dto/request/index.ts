import ResponseDto from "src/apis/response.dto";


// description: 이메일 인증 Request Body DTO 
export interface EmailAuthRequestDto {
    userEmail: string;
}

// description: 이메일 인증 확인 Request Body DTO 
export interface EmailAuthCheckRequestDto {
    userEmail: string;
    authNumber: string;
}

// description: 내정보 수정 Request Body Dto 
export interface PatchMyInfoRequestDto {
    // accessToken: string;
    userPassword: string;
    userEmail: string;
    authNumber: string;
}