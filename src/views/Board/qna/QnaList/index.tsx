import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { getSearchBoardListRequest } from 'src/apis/qna/dto';
import { GetQnaBoardListResponseDto, GetSearchQnaBoardListResponseDto } from 'src/apis/qna/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_PATH, QNA_DETAIL_ABSOLUTE_PATH, QNA_REGIST_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { QnaListItem } from 'src/types';
import './style.css'
import ServiceContainer from 'src/layouts/ServiceContainer';

//                    component                    //
function ListItem ({ 
  receptionNumber,
  writeDatetime,
  title,
  writerId,
  viewCount,
  category,
  publicState,
  status
}: QnaListItem) {

  //                    function                    //
  const navigator = useNavigate();

  //                    event handler                    //
  const onClickHandler = () => navigator(QNA_DETAIL_ABSOLUTE_PATH(receptionNumber));

  //                    render                    //
  return (
      <div className='qna-list-table-tr' onClick={onClickHandler}>

          <div className='qna-list-table-reception-number'>{receptionNumber}</div>
          <div className='qna-list-table-write-date'>{writeDatetime}</div>
          <div className='qna-list-table-title' style={{ textAlign: 'left' }}>{title}</div>
          <div className='qna-list-table-writer-id'>{writerId}</div>
          <div className='qna-list-table-viewcount'>{viewCount}</div>
          <div className='qna-list-table-category'>{category}</div>
          <div className='qna-list-table-exposure'>{publicState}</div>
          <div className='qna-list-table-status'>
              {status ? 
              <div className='disable-bedge'>완료</div> :
              <div className='primary-bedge'>접수</div>
              }
          </div>
      </div>
  );
}

//                    component                    //
export default function QnaList() {
  //                    state                    //
  const {loginUserRole} = useUserStore();

  const [cookies] = useCookies();

  const [qnaList, setQnaList] = useState<QnaListItem[]>([]);
  const [viewList, setViewList] = useState<QnaListItem[]>([]);
  const [totalLenght, setTotalLength] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([1]);
  const [totalSection, setTotalSection] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [isToggleOn, setToggleOn] = useState<boolean>(false);

  const [searchWord, setSearchWord] = useState<string>('');

  //                    function                    //
  const navigator = useNavigate();

  const changePage = (boardList: QnaListItem[], totalLenght: number) => {
      if (!currentPage) return;
      const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
      let endIndex = currentPage * COUNT_PER_PAGE;
      if (endIndex > totalLenght - 1) endIndex = totalLenght;
      const viewList = boardList.slice(startIndex, endIndex);
      setViewList(viewList);
  };

  const changeSection = (totalPage: number) => {
      if (!currentPage) return;
      const startPage = (currentSection * COUNT_PER_SECTION) - (COUNT_PER_SECTION - 1);
      let endPage = currentSection * COUNT_PER_SECTION;
      if (endPage > totalPage) endPage = totalPage;
      const pageList: number[] = [];
      for (let page = startPage; page <= endPage; page++) pageList.push(page);
      setPageList(pageList);
  };

  const changeBoardList = (boardList: QnaListItem[]) => {
      if (isToggleOn) boardList = boardList.filter(board => !board.status);
      setQnaList(boardList);

      const totalLenght = boardList.length;
      setTotalLength(totalLenght);

      const totalPage = Math.floor((totalLenght - 1) / COUNT_PER_PAGE) + 1;
      setTotalPage(totalPage);

      const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
      setTotalSection(totalSection);

      changePage(boardList, totalLenght);

      changeSection(totalPage);
  };

  const getBoardListResponse = (result: GetQnaBoardListResponseDto | ResponseDto | null) => {
      const message = 
          !result ? '서버에 문제가 있습니다.' :
          result.code === 'AF' ? '인증에 실패했습니다.' : 
          result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      if (!result || result.code !== 'SU') {
          alert(message);
          if (result?.code === 'AF') navigator(MAIN_PATH);
          return;
      }

      const { qnaList } = result as GetQnaBoardListResponseDto;
      changeBoardList(qnaList);

      setCurrentPage(!qnaList.length ? 0 : 1);
      setCurrentSection(!qnaList.length ? 0 : 1);
  };

  const getSearchBoardListResponse = (result: GetSearchQnaBoardListResponseDto | ResponseDto | null) => {

      const message =
          !result ? '서버에 문제가 있습니다.' :
          result.code === 'VF' ? '검색어를 입력하세요.' : 
          result.code === 'AF' ? '인증에 실패했습니다.' :
          result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      if (!result || result.code !== 'SU') {
          alert(message);
          if (result?.code === 'AF') navigator(MAIN_PATH);
          return;
      }

      const { qnaList } = result as GetSearchQnaBoardListResponseDto;
      changeBoardList(qnaList);

      setCurrentPage(!qnaList.length ? 0 : 1);
      setCurrentSection(!qnaList.length ? 0 : 1);
  };

  //                    event handler                    //
  const onWriteButtonClickHandler = () => {
      if (loginUserRole !== 'ROLE_USER') return;
      navigator(QNA_REGIST_ABSOLUTE_PATH);
  };

  const onToggleClickHandler = () => {
      if (loginUserRole !== 'ROLE_ADMIN') return;
      setToggleOn(!isToggleOn);
  };

  const onPageClickHandler = (page: number) => {
      setCurrentPage(page);
  };

  const onPreSectionClickHandler = () => {
      if (currentSection <= 1) return;
      setCurrentSection(currentSection - 1);
      setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
  };

  const onNextSectionClickHandler = () => {
      if (currentSection === totalSection) return;
      setCurrentSection(currentSection + 1);
      setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
  };

  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const searchWord = event.target.value;
      setSearchWord(searchWord);
  };

  const onSearchButtonClickHandler = () => {
      if (!searchWord) return;
      if (!cookies.accessToken) return;

      getSearchBoardListRequest(searchWord, cookies.accessToken).then(getSearchBoardListResponse);
  };

  //                    effect                    //
  useEffect(() => {
      if (!cookies.accessToken) return;
      getSearchBoardListRequest(searchWord,cookies.accessToken).then(getSearchBoardListResponse);
  }, [isToggleOn]);

  useEffect(() => {
      if (!qnaList.length) return;
      changePage(qnaList, totalLenght);
  }, [currentPage]);

  useEffect(() => {
      if (!qnaList.length) return;
      changeSection(totalPage);
  }, [currentSection]);
  
  //                    render                    //
  const toggleClass = isToggleOn ? 'toggle-active' : 'toggle';
  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
  return (<div>
           {/* <ServiceContainer /> */}
    <div id='list-wrapper'>

      <div style={{ display: 'flex' }}> 
      {/* <SideBar/> */}
      <div className='qna-list-wrapper'>
          <div className='qna-list-top'>
              <div className='qna-list-size-text'>전체 <span className='emphasis'>{totalLenght}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
              <div className='qna-list-top-right'>
                    {loginUserRole === 'ROLE_USER' ? 
                    <div className='primary-button' onClick={onWriteButtonClickHandler}>글쓰기</div> :
                    <>
                    <div className={toggleClass} onClick={onToggleClickHandler}></div>
                    <div className='qna-list-top-admin-text'>미완료 보기</div>
                    </>
}
              </div>
          </div>
          <div className='qna-list-table'>
              <div className='qna-list-table-th'>
                  <div className='qna-list-table-reception-number'>순번</div>
                  <div className='qna-list-table-write-date'>작성일</div>
                  <div className='qna-list-table-title'>제목</div>
                  <div className='qna-list-table-writer-id'>작성자</div>
                  <div className='qna-list-table-viewcount'>조회수</div>
                  <div className='qna-list-table-category'>유형</div>
                  <div className='qna-list-table-exposure'>노출 여부</div>
                  <div className='qna-list-table-status'>상태</div>
              </div>
              {viewList.map(item => <ListItem {...item} />)}
          </div>
          <div className='qna-list-bottom'>
              <div style={{ width: '299px' }}></div>
              <div className='qna-list-pagenation'>
                  <div className='qna-list-page-left' onClick={onPreSectionClickHandler}></div>
                  <div className='qna-list-page-box'>
                      {pageList.map(page => 
                      page === currentPage ?
                      <div className='qna-list-page-active'>{page}</div> :
                      <div className='qna-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
                      )}
                  </div>
                  <div className='qna-list-page-right' onClick={onNextSectionClickHandler}></div>
              </div>
              <div className='qna-list-search-box'>
                  <div className='qna-list-search-input-box'>
                      <input className='qna-list-search-input' placeholder='검색어를 입력하세요.' value={searchWord} onChange={onSearchWordChangeHandler} />
                  </div>
                  <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
              </div>
          </div>
      </div>
      </div>
    </div>
    </div>
  );

  }

  
function SideBar () {
  return (
      <>
          <div className="user-list-wrapper">
          <div className="side-navigation-container">
              <div className="side-navigation-item">
                  <div className="side-navigation-icon person"></div>
                  <div className="side-navigation-item-title">회원 관리</div>
              </div>
              <div className="side-navigation-item">
                  <div className="side-navigation-icon office"></div>
                  <div className="side-navigation-item-title">업체 관리</div>
              </div>
              <div className="side-navigation-item">
                  <div className="side-navigation-icon check"></div>
                  <div className="side-navigation-item-title">예약 관리</div>
              </div>
              <div className="side-navigation-item">
                  <div className="side-navigation-icon board"></div>
                  <div className="side-navigation-item-title">게시물 관리</div>
              </div>
          </div>
          <div className='main'>
            <div className='qna-list'>

            </div>
          </div>
          </div>
      </>
  )

  
}