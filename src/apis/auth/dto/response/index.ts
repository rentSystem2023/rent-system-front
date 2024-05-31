import ResponseDto from 'src/apis/response.dto';

// description: 로그인 Response Body DTO 
export interface SignInResponseDto extends ResponseDto {
    accessToken: string;
    expires: number;
}

// description: 아이디 찾기 Response Body DTO
export interface FindIdResponseDto extends ResponseDto {
    userId: string;
}