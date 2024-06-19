import axios from "axios";
import { GetCompanyDetailResponseDto, GetCompanyListResponseDto, GetSearchCompanyListResponseDto } from "./dto/response";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { DELETE_COMPANY_LIST_URL, GET_COMPANY_DETAIL_URL, GET_COMPANY_LIST_SEARCH_URL, GET_COMPANY_LIST_URL, POST_COMPANY_REGIST_URL, PUT_COMPANY_UPDATE_URL } from "src/constant";
import { PostCompanyRequestDto, PutCompanyRequestDto } from "./dto/request";
import ResponseDto from "../response.dto";

// function: 업체 등록 API 함수 
export const postCompanyRequest = async (requestBody: PostCompanyRequestDto, accessToken: string) => {
    const result = await axios
        .post(POST_COMPANY_REGIST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 업체 수정 API 함수 
export const PutCompanyRequest = async (companyCode: string | number, requestBody: PutCompanyRequestDto, accessToken: string) => {
    const result = await axios
        .put(PUT_COMPANY_UPDATE_URL(companyCode), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    return result;
}

// function : 업체 삭제 API 함수
export const deleteCompanyRequest = async(companyCode: string | number, accessToken: string)=>{
    const result = await axios
        .delete(DELETE_COMPANY_LIST_URL(companyCode),bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function: 업체 전체 리스트 불러오기 API 함수 
export const getCompanyListRequest = async (accessToken: string) => {
    const result = await axios
        .get(GET_COMPANY_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetCompanyListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 업체 상세 불러오기 API 함수 
export const getCompanyDetailRequest = async (companyCode: string | number, accessToken: string) => {
    const result = await axios
        .get(GET_COMPANY_DETAIL_URL(companyCode), bearerAuthorization(accessToken))
        .then(requestHandler<GetCompanyDetailResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 업체 검색 리스트 불러오기 API 함수 
export const getSearchCompanyListRequest = async (word: string, accessToken: string) => {
    const config = { ...bearerAuthorization(accessToken), params: { word } };
    const result = await axios
        .get(GET_COMPANY_LIST_SEARCH_URL, config)
        .then(requestHandler<GetSearchCompanyListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};