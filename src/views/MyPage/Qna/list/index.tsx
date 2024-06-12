import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { getSearchQnaListRequest } from 'src/apis/qna/dto';
import { GetQnaBoardListResponseDto, GetSearchQnaBoardListResponseDto } from 'src/apis/qna/dto/response';
import ResponseDto from 'src/apis/response.dto';
import {
    COUNT_PER_PAGE,
    COUNT_PER_SECTION,
    MAIN_PATH,
    QNA_DETAIL_ABSOLUTE_PATH,
    QNA_REGIST_ABSOLUTE_PATH
} from 'src/constant';
import { useUserStore } from 'src/stores';
import { QnaListItem } from 'src/types';
import './style.css';

// Component for a single list item
function ListItem({
    receptionNumber,
    writeDatetime,
    title,
    writerId,
    viewCount,
    category,
    publicState,
    status
}: QnaListItem) {
    const navigator = useNavigate();
    const { loginUserId } = useUserStore();

    const onClickHandler = () => {

        // 나의 문의내역 페이지에서 상세 페이지로 이동할 때
        navigator(`/rentcar/qna/${receptionNumber}`, { state: { previousPage: 'MY_QNA_LIST' } });

        // navigator(QNA_DETAIL_ABSOLUTE_PATH(receptionNumber));
    };

    const coveredWriterId = writerId !== '' ? writerId[0] + '*'.repeat(writerId.length - 1) : '';
    return (
        <div className='table-list-table-tr qna' onClick={onClickHandler}>
            <div className='qna-list-table-reception-number'>{receptionNumber}</div>
            <div className='qna-list-table-write-date'>{writeDatetime}</div>
            <div className={`qna-list-table-title ${publicState ? 'public' : 'private'}`} style={{ textAlign: 'left' }}>
                {publicState ? title : '비공개글입니다.'}
            </div>
            <div className='qna-list-table-writer-id'>{coveredWriterId}</div>
            <div className='qna-list-table-category'>{category}</div>
            <div className='qna-list-table-exposure'>{publicState ? '공개' : '비공개'}</div>
            <div className='qna-list-table-status'>
                {status ? <div className='disable-bedge'>완료</div> : <div className='primary-bedge'>접수</div>}
            </div>
            <div className='qna-list-table-viewcount'>{viewCount}</div>
        </div>
    );
}

// Main component for the Q&A list
export default function MyInfoQnaList() {
    const { loginUserId, loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [qnaList, setQnaList] = useState<QnaListItem[]>([]);
    const [viewList, setViewList] = useState<QnaListItem[]>([]);
    const [totalLength, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);
    const [isToggleOn, setToggleOn] = useState<boolean>(false);
    const [searchWord, setSearchWord] = useState<string>('');

    const navigator = useNavigate();

    const changePage = (boardList: QnaListItem[], totalLength: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLength - 1) endIndex = totalLength;
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

        const totalLength = boardList.length;
        setTotalLength(totalLength);

        const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(boardList, totalLength);
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
        // 검색어가 있는 경우
        if (searchWord) {
            if (cookies.accessToken) {
                getSearchQnaListRequest(searchWord, cookies.accessToken).then(getSearchBoardListResponse);
            } else {
                // 토큰이 없는 경우, 빈 문자열을 전달하여 검색
                getSearchQnaListRequest(searchWord, '').then(getSearchBoardListResponse);
            }
        }
        // 검색어가 없는 경우
        else {
            // 빈 문자열을 전달하여 검색
            getSearchQnaListRequest('', '').then(getSearchBoardListResponse);
        }
    };

    useEffect(() => {
        if (!cookies.accessToken) {
            // 토큰이 없는 경우 처리
            getSearchQnaListRequest(searchWord, '').then(getSearchBoardListResponse);
        } else {
            getSearchQnaListRequest(searchWord, cookies.accessToken).then(getSearchBoardListResponse);
        }
    }, []);
    
    const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';

    // 로그인 유저 아이디와 작성자 아이디가 일치하는 항목 필터링
    const filteredViewList = viewList.filter(item => item.writerId === loginUserId);

    return (
        <>        
        <div id='information-wrapper'>
            <div className='information-main'>
            <div className="my-info-title">문의내역</div>
            
            <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>

            <div id='table-list-wrapper'>
                <div className='table-list-top'>
                    <div className='table-list-size-text'></div>
                </div>

                <div className='table-list-table'>
                    <div className='table-list-table-th qna'>
                        <div className='qna-list-table-reception-number'>순번</div>
                        <div className='qna-list-table-write-date'>작성일</div>
                        <div className='qna-list-table-title'>제목</div>
                        <div className='qna-list-table-writer-id'>작성자</div>
                        <div className='qna-list-table-category'>문의</div>
                        <div className='qna-list-table-exposure'>노출여부</div>
                        <div className='qna-list-table-status'>상태</div>
                        <div className='qna-list-table-viewcount'>조회수</div>
                    </div>
                    <div className='table-list-table-body'>
                        {filteredViewList.map(item => <ListItem key={item.receptionNumber} {...item} />)}
                    </div>
                </div>

                <div className='table-list-bottom'>
                    <div style={{ width: '299px' }}></div>
                    <div className='table-list-pagenation'>
                        <div className='table-list-page-left' onClick={onPreSectionClickHandler}></div>
                        <div className='table-list-page-box'>
                            {pageList.map(page =>
                                page === currentPage ?
                                    <div key={page} className='table-list-page-active'>{page}</div> :
                                    <div key={page} className='table-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
                            )}
                        </div>
                        <div className='table-list-page-right' onClick={onNextSectionClickHandler}></div>
                    </div>
                    <div className='table-list-search-box'>
                        <div className='table-list-search-input-box'>
                            <input className='table-list-search-input' placeholder='검색어를 입력하세요.' value={searchWord} onChange={onSearchWordChangeHandler} />
                        </div>
                        <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </>
    );
}