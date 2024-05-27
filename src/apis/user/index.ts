import axios from "axios";
import { PATCH_MODIFY_MY_INFO_URL, POST_EMAIL_AUTH_CHECK_REQUEST_URL, POST_EMAIL_AUTH_REQUEST_URL } from "src/constant";
import { requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, MyInfoModifyRequestDto } from "./dto/request";


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

// function: 내정보 수정 API 함수
export const myInfoModifyRequest = async (requestBody: MyInfoModifyRequestDto) => {
    const result = await axios
        .patch(PATCH_MODIFY_MY_INFO_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

