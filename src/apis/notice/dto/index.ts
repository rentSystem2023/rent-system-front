import axios from "axios";


import ResponseDto from "src/apis/response.dto";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "src/apis";
import { DELETE_NOTICE_URL, GET_NOTICE_DETAIL_URL, GET_NOTICE_LIST_URL, GET_QNA_DETAIL_URL, GET_QNA_LIST_URL, INCREASE_NOTICE_VIEW_COUNT_URL, INCREASE_QNA_VIEW_COUNT_URL, NOTICE_LIST_SEARCH_URL, POST_COMMENT_REQUEST_URL, POST_NOTICE_REQUESURL, POST_QNA_REGIST_URL, PUT_NOTICE_REGIST_URL, PUT_QNA_REGIST_URL } from "src/constant";
import { PutQnaRequestDto } from "src/apis/qna/dto/request";
import { GetQnaBoardListResponseDto, GetQnaBoardResponseDto, GetSearchQnaBoardListResponseDto } from "src/apis/qna/dto/response";
import { PostNoticeBoardRequestDto, PutNoticeBoardRequestDto } from "./request";
import { GetNoticeBoardResponseDto, GetSearchNoticeBoardListResponseDto } from "./response";

// function : 공지사항 작성 API 함수 
export const PostNoticeRequest = async(requestBody: PostNoticeBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_NOTICE_REQUESURL, requestBody,bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 공지사항 전체 리스트 불러오기 API 함수
export const getNoticeListRequest = async(accessToken: string) => { // 토큰을 포함해서 가져와야 함
    const result = await axios.get(GET_NOTICE_LIST_URL,bearerAuthorization(accessToken))
    .then(requestHandler<GetQnaBoardListResponseDto>) //위에 코드가 성공한다면 <GetBoardListResponseDto> 받을 것이고
    .catch(requestErrorHandler); // 실패한다면 에러
    return result;
}

// function : 공지사항 검색 리스트 불러오기 API 함수
export const getSearcNoticeListRequest = async(word:string, accessToken:string) => { //searchWord 먼저 받고 ,accessToken 받기
    const config = {...bearerAuthorization(accessToken), params: {word}} // params 속성 추가해서 수정함.
    const result = await axios.get(NOTICE_LIST_SEARCH_URL,config)
    .then(requestHandler<GetSearchNoticeBoardListResponseDto>) // 성공
    .catch(requestErrorHandler); // 실패
    return result;
}

// function : 공지사항 게시물 불러오기 API 함수
export const getNoticeRequest = async(registNumber:number | string, accessToken:string) => {
    const result = await axios.get(GET_NOTICE_DETAIL_URL(registNumber))
    .then(requestHandler<GetNoticeBoardResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 공지사항 게시물 수정 API 함수
export const putNoticeRequest = async(registNumber: number | string, requestBody: PutNoticeBoardRequestDto , accessToken:string) =>{
    const result = await axios.put(PUT_NOTICE_REGIST_URL(registNumber), requestBody, bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : 공지사항 게시물 조회수 증가 API 함수
export const increaseViewCountRequest = async (registNumber: number | string, accessToken: string) => {
    const result = await axios.patch(INCREASE_NOTICE_VIEW_COUNT_URL(registNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 공지사항 게시물 삭제 API 함수
export const deleteNoticeBoardRequest = async(registNumber: number | string, accessToken: string)=>{
    const result = await axios.delete(DELETE_NOTICE_URL(registNumber),bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)   // 반환되는 타입이 responseDto 
    .catch(requestErrorHandler);        // 실패했을때 에러
    return result; // 결과 반환
}