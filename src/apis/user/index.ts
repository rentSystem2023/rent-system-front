import axios from "axios";
import { GET_MY_INFO_URL, PATCH_MODIFY_MY_INFO_URL, POST_EMAIL_AUTH_CHECK_REQUEST_URL, POST_EMAIL_AUTH_REQUEST_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, PatchMyInfoRequestDto } from "./dto/request";
import { GetMyInfoResponseDto, PatchMyInfoResponseDto } from "./dto/response";


// function: 이메일 인증 API 함수
export const emailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
    const result = await axios
        .post(POST_EMAIL_AUTH_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 이메일 인증 확인 API 함수
export const emailAuthCheckRequest = async (
    requestBody: EmailAuthCheckRequestDto
) => {
    const result = await axios
        .post(POST_EMAIL_AUTH_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 내 정보 불러오기 API 함수 
export const getMyInfoRequest = async (accessToken: string) => {
    const result = await axios
        .get(GET_MY_INFO_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetMyInfoResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 내정보 수정 API 함수
export const patchMyInfoRequest = async (
        requestBody: PatchMyInfoRequestDto
    ) => {
    const result = await axios
        .patch(PATCH_MODIFY_MY_INFO_URL, requestBody)
        .then(requestHandler<PatchMyInfoResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

