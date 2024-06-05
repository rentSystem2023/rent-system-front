import axios from "axios";
import { DELETE_MY_INFO_URL, GET_MY_INFO_URL, GET_SIGN_IN_USER_REQUEST_URL, POST_EMAIL_AUTH_REQUEST_URL, PUT_MY_INFO_EMAIL_MODIFY_URL, PUT_MY_INFO_PW_MODIFY_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { EmailAuthRequestDto, PutMyInfoEmailRequestDto, PutMyInfoPwRequestDto } from "./dto/request";
import { GetMyInfoResponseDto, GetSignInUserResponseDto } from "./dto/response";

// function: 로그인 유저 정보 불러오기 API 함수
export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetSignInUserResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 이메일 인증 API 함수
export const emailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
    const result = await axios
        .post(POST_EMAIL_AUTH_REQUEST_URL, requestBody)
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

// function: 내정보 패스워드 수정 API 함수
export const putMyInfoPwRequest = async (
    requestBody: PutMyInfoPwRequestDto, accessToken: string
) => {
const result = await axios
    .put(PUT_MY_INFO_PW_MODIFY_URL, requestBody, bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
return result;
};

// function: 내정보 이메일 수정 API 함수
export const putMyInfoEmailRequest = async (
requestBody: PutMyInfoEmailRequestDto, accessToken: string
) => {
const result = await axios
.put(PUT_MY_INFO_EMAIL_MODIFY_URL, requestBody, bearerAuthorization(accessToken))
.then(requestHandler<ResponseDto>)
.catch(requestErrorHandler);
return result;
};

// function: 내 정보 삭제하기 API 함수 
export const deleteUserRequest = async (accessToken: string, userId: string) => {
const result = await axios
    .delete(DELETE_MY_INFO_URL(userId), bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
return result;
};

