import axios from "axios";
import { DELETE_RESERVATION_LIST_URL, DELETE_RESERVATION_URL, GET_CAR_PRICE_SEARCH_DETAIL_LIST_URL, GET_CAR_PRICE_SEARCH_LIST_URL, GET_CAR_SEARCH_LIST_URL, GET_MY_RESERVATION_DETAIL_URL, GET_MY_RESERVATION_LIST_URL, GET_POPULAR_CAR_LIST_URL, GET_RESERVATION_CANCEL_LIST_URL, GET_RESERVATION_LIST_SEARCH_URL, GET_RESERVATION_LIST_URL, PATCH_MY_RESERVATION_DETAIL_URL, POST_RESERVATION_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { PatchReservationRequestDto, PostReservationRequestDto } from "./dto/request";
import ResponseDto from "../response.dto";
import { GetReservationCancelListResponseDto, GetReservationDetailMyListResponseDto, GetReservationListResponseDto, GetReservationMyListResponseDto, GetReservationPopularListResponseDto, GetSearchDetailListResponseDto, GetSearchReservationCarListResponseDto, GetSearchReservationCarPriceListResponseDto, GetSearchReservationListResponseDto } from "./dto/response";



// function : 예약 하기 API 함수
export const postReservationRequest = async (requestBody: PostReservationRequestDto, accessToken: string) => {
    const result = await axios.post(POST_RESERVATION_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 내 예약 내역 리스트 보기 API 함수
export const getReservationMyListRequest = async (accessToken: string) => {
    const result = await axios.post(GET_MY_RESERVATION_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetReservationMyListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 내 예약 내역 상세보기 API 함수
export const getReservationDetailMyListRequest = async (reservaitonCode: string | number, accessToken: string) => {
    const result = await axios.post(GET_MY_RESERVATION_DETAIL_URL(reservaitonCode), bearerAuthorization(accessToken))
        .then(requestHandler<GetReservationDetailMyListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 예약 취소하기 API 함수
export const patchReservationRequest = async (reservaitonCode: string | number, requestBody: PatchReservationRequestDto, accessToken: string) => {
    const result = await axios.post(PATCH_MY_RESERVATION_DETAIL_URL(reservaitonCode), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 취소 신청 예약 리스트 불러오기 API 함수
export const getReservationCancelListRequest = async (reservationState: string, accessToken: string) => {
    const result = await axios.post(GET_RESERVATION_CANCEL_LIST_URL(reservationState), bearerAuthorization(accessToken))
        .then(requestHandler<GetReservationCancelListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 예약 취소 신청 승인하기 API 함수
export const deleteReservationRequest = async (reservaitonCode: string | number, accessToken: string) => {
    const result = await axios.post(DELETE_RESERVATION_URL(reservaitonCode), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 예약 전체 리스트 불러오기 API 함수
export const getReservationListRequest = async(accessToken: string) => {
    const result = await axios.get(GET_RESERVATION_LIST_URL,bearerAuthorization(accessToken))
    .then(requestHandler<GetReservationListResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 예약 검색 리스트 불러오기 API 함수
export const getSearchReservationListRequest = async(word: string | number , accessToken: string) => {
    const config = { ...bearerAuthorization(accessToken), params: { word } };
    const result = await axios.get(GET_RESERVATION_LIST_SEARCH_URL, config)
    .then(requestHandler<GetSearchReservationListResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 예약 목록 리스트 삭제하기 API 함수
export const deleteReservationListRequest = async (reservaitonCode: string | number, accessToken: string) => {
    const result = await axios.post(DELETE_RESERVATION_LIST_URL(reservaitonCode), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 인기 차량 리스트 불러오기 API 함수
export const getReservationPopularListRequest = async(accessToken: string) => {
    const result = await axios.get(GET_POPULAR_CAR_LIST_URL,bearerAuthorization(accessToken))
    .then(requestHandler<GetReservationPopularListResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 차량 검색 결과 불러오기 API 함수
export const getSearchReservationCarListRequest  = async(address : string, reservationStart : string, reservationEnd : string, accessToken: string) => {
    const result = await axios.get(GET_CAR_SEARCH_LIST_URL(address, reservationStart, reservationEnd),bearerAuthorization(accessToken))
    .then(requestHandler<GetSearchReservationCarListResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 보험별(업체) 가격 결과 불러오기 API 함수
export const getSearchReservationCarPriceListRequest  = async(carName : string, accessToken: string) => {
    const result = await axios.get(GET_CAR_PRICE_SEARCH_LIST_URL(carName),bearerAuthorization(accessToken))
    .then(requestHandler<GetSearchReservationCarPriceListResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 보험별 가격 상세 검색 결과 불러오기 API 함수
export const getSearchDetailListRequest  = async(rentCompany : string, accessToken: string) => {
    const result = await axios.get(GET_CAR_PRICE_SEARCH_DETAIL_LIST_URL(rentCompany),bearerAuthorization(accessToken))
    .then(requestHandler<GetSearchDetailListResponseDto>)
    .catch(requestErrorHandler);
    return result;
}