import { POST_FIND_PASSWORD_REQUEST_URL, PUT_FIND_PW_RESET_REQUEST_URL } from './../../constant/index';
import axios from "axios";
import {POST_EMAIL_AUTH_REQUEST_URL,POST_EMAIL_AUTH_CHECK_REQUEST_URL,POST_ID_CHECK_REQUEST_URL,POST_NICKNAME_CHECK_REQUEST_URL,POST_SIGN_UP_REQUEST_URL,POST_SIGN_IN_REQUEST_URL,POST_FIND_ID_REQUEST_URL} from "src/constant";
import {EmailAuthCheckRequestDto,EmailAuthRequestDto,FindIdRequestDto,FindPasswordRequestDto,FindPasswordResetRequestDto,IdCheckRequestDto,NickNameCheckRequestDto,SignInRequestDto,SignUpRequestDto} from "./dto/request";
import { FindIdResponseDto, SignInResponseDto } from "./dto/response";
import ResponseDto from "../response.dto";
import { requestErrorHandler, requestHandler } from "..";

//  function: 로그인 API 함수
export const SignInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios
        .post(POST_SIGN_IN_REQUEST_URL, requestBody)
        .then(requestHandler<SignInResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 아이디 중복 확인 API 함수
export const IdCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios
        .post(POST_ID_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 닉네임 중복 확인 API 함수
export const NickNameCheckRequest = async (requestBody: NickNameCheckRequestDto) => {
    const result = await axios
        .post(POST_NICKNAME_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
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

// function: 이메일 인증 확인 API 함수
export const emailAuthCheckRequest = async (requestBody: EmailAuthCheckRequestDto) => {
    const result = await axios
        .post(POST_EMAIL_AUTH_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 회원가입 API 함수
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios
        .post(POST_SIGN_UP_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 아이디 찾기 API 함수
export const findIdRequest = async (requestBody: FindIdRequestDto) => {
    const result = await axios
        .post(POST_FIND_ID_REQUEST_URL, requestBody)
        .then(requestHandler<FindIdResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 비밀번호 찾기 API 함수
export const findPasswordRequest = async (requestBody: FindPasswordRequestDto) => {
    const result = await axios
        .post(POST_FIND_PASSWORD_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 비밀번호 찾기 비밀번호 재설정 API 함수
export const findPwResetRequest = async (userId: string, requestBody: FindPasswordResetRequestDto) => {
    const result = await axios
        .put(PUT_FIND_PW_RESET_REQUEST_URL(userId), requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};