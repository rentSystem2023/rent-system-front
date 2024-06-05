import axios from "axios";

import { GET_QNA_LIST_SEARCH_URL, GET_QNA_LIST_URL, GET_QNA_DETAIL_URL, INCREASE_QNA_VIEW_COUNT_URL, POST_COMMENT_REQUEST_URL, POST_QNA_REGIST_URL, PUT_QNA_REGIST_URL, DELETE_QNA_LIST_URL } from "src/constant";

import ResponseDto from "src/apis/response.dto";
import {  PostQnaBoardRequestDto, PostQnaCommentRequestDto, PutQnaRequestDto,  } from "./request";
import { GetQnaBoardListResponseDto, GetQnaBoardResponseDto, GetSearchQnaBoardListResponseDto } from "./response";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "src/apis";

// function : Q&A 작성 API 함수 
export const PostQnaRequest = async(requestBody: PostQnaBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_QNA_REGIST_URL, requestBody,bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : Q&A 답글 작성 API 함수
export const PostCommentRequest = async(receptionNumber: number | string, requestBody: PostQnaCommentRequestDto, accessToken:string) => {
    const result = await axios.post(POST_COMMENT_REQUEST_URL(receptionNumber),requestBody,bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;  
}


// function : Q&A 전체 리스트 불러오기 API 함수
export const getQnaListRequest = async(accessToken: string) => { // 토큰을 포함해서 가져와야 함
    const result = await axios.get(GET_QNA_LIST_URL,bearerAuthorization(accessToken))
    .then(requestHandler<GetQnaBoardListResponseDto>) //위에 코드가 성공한다면 <GetBoardListResponseDto> 받을 것이고
    .catch(requestErrorHandler); // 실패한다면 에러
    return result;
}

// function : Q&A 검색 리스트 불러오기 API 함수
export const getSearchQnaListRequest = async(word:string, accessToken:string) => { //searchWord 먼저 받고 ,accessToken 받기
    const config = {...bearerAuthorization(accessToken), params: {word}} // params 속성 추가해서 수정함.
    const result = await axios.get(GET_QNA_LIST_SEARCH_URL,config)
    .then(requestHandler<GetSearchQnaBoardListResponseDto>) // 성공
    .catch(requestErrorHandler); // 실패
    return result;
}

// 게시물 불러올때 토큰없이 받는 작업하면됨 바로 밑에

// function : Q&A 게시물 불러오기 API 함수
export const getQnaRequest = async(receptionNumber:number | string) => {
    const result = await axios.get(GET_QNA_DETAIL_URL(receptionNumber))
    .then(requestHandler<GetQnaBoardResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : Q&A 게시물 수정 API 함수
export const putQnaRequest = async(receptionNumber: number | string , requestBody: PutQnaRequestDto , accessToken:string) =>{
    const result = await axios.put(PUT_QNA_REGIST_URL(receptionNumber), requestBody, bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
    return result;
}

// function : Q&A 게시물 조회수 증가 API 함수
export const increaseViewCountRequest = async (receptionNumber: number | string , accessToken: string) => {
    const result = await axios.patch(INCREASE_QNA_VIEW_COUNT_URL(receptionNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : Q&A 게시물 삭제 API 함수
export const deleteQnaRequest = async(receptionNumber: number | string, accessToken: string)=>{
    const result = await axios.delete(DELETE_QNA_LIST_URL(receptionNumber),bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)   // 반환되는 타입이 responseDto 
    .catch(requestErrorHandler);        // 실패했을때 에러
    return result; // 결과 반환
}

