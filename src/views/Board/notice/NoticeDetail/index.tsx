import React, { ChangeEvent, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { deleteNoticeBoardRequest,  getNoticeRequest, increaseViewCountRequest, putNoticeRequest } from 'src/apis/notice/dto';
import { GetNoticeBoardListResponseDto, GetNoticeBoardResponseDto } from 'src/apis/notice/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { ADMIN_NOTICE_UPDATE_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, NOTICE_LIST_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';

//                    component                    //
export default function NoticeDetail() {

  //                    state                    //
  const { loginUserId, loginUserRole } = useUserStore();
  const {registNumber} = useParams();

  const [cookies] = useCookies();
  const [title, setTitle] = useState<string>('');
  const [writerId, setWriterId] = useState<string>('');
  const [writeDate, setWriteDate] = useState<string>('');
  const [viewCount, setViewCount] = useState<number>(0);
  const [contents, setContents] = useState<string>('');
  const [imageUrl , setImageUrl] = useState<string>('');

  //                    function                    //
  const navigator = useNavigate();

  const increaseViewCountResponse = (result: ResponseDto | null) => {
      const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'VF' ? '잘못된 접수번호입니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      if (!result || result.code !== 'SU') {
          alert(message);
          if (result?.code === 'AF') {
              navigator(MAIN_ABSOLUTE_PATH);
              return;
          }
          navigator(NOTICE_LIST_ABSOLUTE_PATH);
          return;
      }

      if (!registNumber) return;
      getNoticeRequest(registNumber,cookies.accessToken)
          .then(getNoticeResponse);
  };

  const getNoticeResponse = (result: GetNoticeBoardListResponseDto | ResponseDto | null) => {
      const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'VF' ? '잘못된 접수번호입니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
  
      if (!result || result.code !== 'SU') {
          alert(message);
          if (result?.code === 'AF') {
              navigator(MAIN_ABSOLUTE_PATH);
              return;
          }
          navigator(NOTICE_LIST_ABSOLUTE_PATH);
          return;
      }
  
      const { title, writeDatetime, viewCount,writerId,imageUrl} = result as GetNoticeBoardResponseDto;
      setTitle(title);
      setWriteDate(writeDatetime);
      setViewCount(viewCount);
      setContents(contents);
      setWriterId(writerId);
      setImageUrl(imageUrl);
  };

 
  const deleteNoticeRequest = (result: ResponseDto | null) => {

      const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '권한이 없습니다.' :
      result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
      result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      if (!result || result.code !== 'SU'){
          alert(message);
          return;
      }

      // 삭제되면 그 게시물에 있으면 안되기 때문에 목록 페이지로 이동
      navigator(NOTICE_LIST_ABSOLUTE_PATH);
  }

  //                    event handler                    //


  // 목록
  const onListClickHandler = () => {
      navigator(NOTICE_LIST_ABSOLUTE_PATH);
  }

  // 수정
  const onUpdateClickHandler = () => {
      if (!registNumber ||loginUserId !==writerId) return;
      navigator(ADMIN_NOTICE_UPDATE_ABSOLUTE_PATH(registNumber));
  }

  // 삭제
  const onDeleteClickHandler = () => {
      if (!registNumber ||loginUserId !==writerId || !cookies.accessToken) return;
      const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
      if (!isConfirm) return;

      deleteNoticeBoardRequest(registNumber, cookies.accessToken) 
      .then(deleteNoticeRequest)
  }

  //                    effect                    //
  useEffect(() => {
      if (!registNumber ) return;
      // 토큰 없이 게시글 상세 정보를 가져오도록 수정
      getNoticeRequest(registNumber,cookies.accessToken).then(getNoticeResponse);
  }, []);


  useEffect(() => {
      if (!cookies.accessToken || !registNumber) return;
      increaseViewCountRequest(registNumber, cookies.accessToken)
          .then(increaseViewCountResponse);
  }, []);



  //                    render                    //
  return (
      <div id='qna-detail-wrapper'>
          <div className='qna-detail-main-box'>
              <div className='qna-detail-top-box'>
                  <div className='qna-detail-title-box'>{title}</div>
                  <div className='qna-detail-info-box'>
                      <div className='qna-detail-info'>{writerId}</div>
                      <div className='qna-detail-info-divider'>{'\|'}</div>
                      <div className='qna-detail-info'>작성일 {writeDate}</div>
                      <div className='qna-detail-info-divider'>{'\|'}</div>
                      <div className='qna-detail-info'>조회수 {viewCount}</div>
                  </div>
              </div>
              <div className='qna-detail-contents-box'>{contents}</div>
              {imageUrl && <img src={imageUrl} alt="Database Image" className="qna-image" />}
          </div>
          <div className='qna-detail-button-box'>
              <div className='primary-button' onClick={onListClickHandler}>목록보기</div>
              { loginUserRole === 'ROLE_ADMIN' &&
                  <div className='qna-detail-owner-button-box'>
                          <div className='second-button' onClick={onUpdateClickHandler}>수정</div>
                      <div className='error-button' onClick={onDeleteClickHandler}>삭제</div>
                  </div>

              }

          </div>
      </div>
  );
}