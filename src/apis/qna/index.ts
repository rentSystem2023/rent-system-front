import axios from "axios";
import { GET_QNA_LIST_SEARCH_URL, GET_QNA_LIST_URL, GET_QNA_DETAIL_URL, INCREASE_QNA_VIEW_COUNT_URL, POST_COMMENT_REQUEST_URL, POST_QNA_REGIST_URL, PUT_QNA_REGIST_URL, DELETE_QNA_LIST_URL } from "src/constant";
import ResponseDto from "src/apis/response.dto";
import {  PostQnaBoardRequestDto, PostQnaCommentRequestDto, PutQnaRequestDto,  } from "./dto/request";
import { GetQnaBoardListResponseDto, GetQnaBoardResponseDto, GetSearchQnaBoardListResponseDto } from "./dto/response";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "src/apis";

// function : Q&A 작성 API 함수 
export const PostQnaRequest = async(requestBody: PostQnaBoardRequestDto, accessToken: string) => {
    const result = await axios
        .post(POST_QNA_REGIST_URL, requestBody,bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : Q&A 답글 작성 API 함수
export const PostCommentRequest = async(receptionNumber: number | string, requestBody: PostQnaCommentRequestDto, accessToken: string) => {
    const result = await axios
        .post(POST_COMMENT_REQUEST_URL(receptionNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;  
};

// function : Q&A 전체 리스트 불러오기 API 함수
export const getQnaListRequest = async(accessToken: string) => {
    const result = await axios
        .get(GET_QNA_LIST_URL,bearerAuthorization(accessToken))
        .then(requestHandler<GetQnaBoardListResponseDto>) 
        .catch(requestErrorHandler);
    return result;
};

// function : Q&A 검색 리스트 불러오기 API 함수
export const getSearchQnaListRequest = async(word: string, accessToken: string) => {
    const config = {...bearerAuthorization(accessToken), params: {word}}
    const result = await axios
        .get(GET_QNA_LIST_SEARCH_URL,config)
        .then(requestHandler<GetSearchQnaBoardListResponseDto>) 
        .catch(requestErrorHandler); 
    return result;
};

// function : Q&A 게시물 불러오기 API 함수
export const getQnaRequest = async(receptionNumber: number | string) => {
    const result = await axios
        .get(GET_QNA_DETAIL_URL(receptionNumber))
        .then(requestHandler<GetQnaBoardResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : Q&A 게시물 수정 API 함수
export const putQnaRequest = async(receptionNumber: number | string, requestBody: PutQnaRequestDto, accessToken: string) =>{
    const result = await axios
        .put(PUT_QNA_REGIST_URL(receptionNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : Q&A 게시물 조회수 증가 API 함수
export const increaseViewCountRequest = async (receptionNumber: number | string, accessToken: string) => {
    const result = await axios
        .patch(INCREASE_QNA_VIEW_COUNT_URL(receptionNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : Q&A 게시물 삭제 API 함수
export const deleteBoardRequest = async(receptionNumber: number | string, accessToken: string)=>{
    const result = await axios
        .delete(DELETE_QNA_LIST_URL(receptionNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)  
        .catch(requestErrorHandler);       
    return result;
};

