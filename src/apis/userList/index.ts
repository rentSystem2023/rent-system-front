import axios from "axios";
import { DELETE_USER_LIST_URL, GET_USER_DETAIL_URL, GET_USER_LIST_SEARCH_URL, GET_USER_LIST_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { GetSearchUserListResponseDto, GetUserListResponseDto, GetDetailUserListResponseDto } from "./dto/response";
import ResponseDto from "../response.dto";

// function : 회원 전체 리스트 불러오기 API 함수
export const getUserListRequest = async(accessToken: string) => {
    const result = await axios.get(GET_USER_LIST_URL, bearerAuthorization(accessToken))
    .then(requestHandler<GetUserListResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 회원 검색 리스트 불러오기 API 함수
export const getSearchUserListRequest = async(word: string, accessToken: string) => { 
    const config = {...bearerAuthorization(accessToken), params: {word}}
    const result = await axios.get(GET_USER_LIST_SEARCH_URL, config)
    .then(requestHandler<GetSearchUserListResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 회원 상세 불러오기 API 함수
export const getDetailUserListRequest = async(userId: string, accessToken: string) => {
    const result = await axios.get(GET_USER_DETAIL_URL(userId), bearerAuthorization(accessToken))
    .then(requestHandler<GetDetailUserListResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function: 회원 삭제하기 API 함수 
export const deleteUserRequest = async (accessToken: string, userId: string) => {
    const result = await axios
        .delete(DELETE_USER_LIST_URL(userId), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
    };