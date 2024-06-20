import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import { useUserStore } from 'src/stores';
import { ADMIN_NOTICE_REGIST_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_PATH, NOTICE_DETAIL_ABSOLUTE_PATH } from 'src/constant';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { getSearcNoticeListRequest } from 'src/apis/notice/dto';
import { GetSearchNoticeBoardListResponseDto } from 'src/apis/notice/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { NoticeListItem } from 'src/types';
import { usePagination } from 'src/hooks';

    //                    component                    //
function ListItem ({
    index,
    registNumber,
    title,
    writerId,
    writeDatetime,
    viewCount
}:NoticeListItem & { index: number }) {
    
    //                    function                     //
    const navigator = useNavigate();
    //                event handler                    //
    const onClickHandler = () => navigator(NOTICE_DETAIL_ABSOLUTE_PATH(registNumber));

    //                    Render                       //
    return (
        <div className='table-list-table-tr notice' onClick={onClickHandler}>
            <div className='notice-list-table-reception-number'>{index + 1}</div>
            <div className='notice-list-table-title' style={{ textAlign: 'left' }}>{title}</div>
            <div className='notice-list-table-writer-Id'>관리자</div>
            <div className='notice-list-table-write-date'>{writeDatetime}</div>
            <div className='notice-list-table-viewcount'>{viewCount}</div>
        </div>
    );
};

    //                    component                    //
export default function NoticeList() {
    
    //                      state                      //
    const {
        viewList,
        pageList,
        totalPage,
        currentPage,
        totalLength,
        setCurrentPage,
        setCurrentSection,
        changeBoardList,
        onPageClickHandler,
        onPreSectionClickHandler,
        onNextSectionClickHandler
    } = usePagination<NoticeListItem>(COUNT_PER_PAGE, COUNT_PER_SECTION);

    const {loginUserRole} = useUserStore();
    const [cookies] = useCookies();
    const [searchWord, setSearchWord] = useState<string>('');

    //                    function                     //
    const navigator = useNavigate();

    const getSearchBoardListResponse = (result: GetSearchNoticeBoardListResponseDto | ResponseDto | null) => {

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

        const { noticeList } = result as GetSearchNoticeBoardListResponseDto;
        changeBoardList(noticeList);

        setCurrentPage(!noticeList.length ? 0 : 1);
        setCurrentSection(!noticeList.length ? 0 : 1);
    };

    //                event handler                    //
    const onWriteButtonClickHandler = () => {
        if (loginUserRole !== 'ROLE_ADMIN') return;
        
        navigator(ADMIN_NOTICE_REGIST_ABSOLUTE_PATH);
    };

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onSearchButtonClickHandler = () => {
        if (!searchWord) {
            getSearcNoticeListRequest('', cookies.accessToken).then(getSearchBoardListResponse);
        } else {
            if (!cookies.accessToken) return;
            getSearcNoticeListRequest(searchWord, cookies.accessToken).then(getSearchBoardListResponse);
        }
    };

    //                    effect                       //
    useEffect(() => {
        if (!cookies.accessToken) {
            getSearcNoticeListRequest(searchWord, '').then(getSearchBoardListResponse);
        } else {
            getSearcNoticeListRequest(searchWord, cookies.accessToken).then(getSearchBoardListResponse);
        }
    }, []);
    
    //                    Render                       //
    const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';

    return (
    <>  
    <div className="title-text">공지사항</div>
        <div id='table-list-wrapper'>
            <div className='table-list-top'>
                <div className='table-list-size-text'>전체 <span className='emphasis'>{totalLength}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
                <div className='table-list-top-right'>
                    {loginUserRole === 'ROLE_ADMIN' ? 
                    <div className='primary-button' onClick={onWriteButtonClickHandler}>글쓰기</div> : ''
                    }
                </div>
            </div>

            <div className='table-list-table'>
                <div className='table-list-table-th notice'>
                    <div className='notice-list-table-reception-number'>순번</div>
                    <div className='notice-list-table-title'>제목</div>
                    <div className='notice-list-table-writer-Id'>작성자</div>
                    <div className='notice-list-table-write-date'>작성일</div>
                    <div className='notice-list-table-viewcount'>조회수</div>
                </div>
                {viewList.map((item, index) => <ListItem {...item} index={totalLength - (currentPage - 1) * COUNT_PER_PAGE - (index + 1)} key={item.registNumber} />)}
            </div>
            <div className='table-list-bottom'>
                <div style={{ width: '299px' }}></div>
                <div className='table-list-pagenation'>
                    <div className='table-list-page-left' onClick={onPreSectionClickHandler}></div>
                    <div className='table-list-page-box'>
                        {pageList.map(page => 
                        page === currentPage ?
                        <div className='table-list-page-active'>{page}</div> :
                        <div className='table-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
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
    </>
    );
}
