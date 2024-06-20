    import React, { ChangeEvent, useEffect, useState } from 'react';
    import { useCookies } from 'react-cookie';
    import { useNavigate } from 'react-router-dom';
    import { getSearchQnaListRequest } from 'src/apis/qna/dto';
    import { GetSearchQnaBoardListResponseDto } from 'src/apis/qna/dto/response';
    import ResponseDto from 'src/apis/response.dto';
    import { AUTH_SIGN_IN_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_PATH, QNA_DETAIL_ABSOLUTE_PATH,   QNA_REGIST_ABSOLUTE_PATH} from 'src/constant';
    import { useUserStore } from 'src/stores';
    import { QnaListItem } from 'src/types';
    import './style.css';
    import { usePagination } from 'src/hooks';

    //                    component                    //
    function ListItem ({ 
    index,
    receptionNumber,
    writeDatetime,
    title,
    writerId,
    viewCount, 
    category,
    publicState,
    status
    }: QnaListItem & { index: number }) {

    //                    function                     //
    const navigator = useNavigate();
    //                      state                      //
    const {loginUserId} = useUserStore();
    const {loginUserRole} = useUserStore();

    //                event handler                    //
    const onClickHandler = () => {
        if (!publicState && (loginUserRole !== 'ROLE_ADMIN' && loginUserId !== writerId )) { 
            alert("비공개글은 작성자 혹은 관리자만 볼 수 있습니다.");
            console.log(writerId);
            console.log(loginUserId);
            return;
        }
        navigator(`/rentcar/qna/${receptionNumber}`, { state: { previousPage: 'ALL_QNA_LIST' } });
    }

    //                    Render                       //
    const coverdWriterId = writerId !== '' && (writerId[0] + '*'.repeat(writerId.length - 1));

    return (
        <div className='table-list-table-tr qna' onClick={onClickHandler}>
            <div className='qna-list-table-reception-number'>{index + 1}</div>
            <div className='qna-list-table-write-date'>{writeDatetime}</div>
            <div className={`qna-list-table-title ${publicState ? 'public' : 'private'}`} style={{ textAlign: 'left' }}>{publicState ? title : '비공개글입니다.'}</div>
            <div className='qna-list-table-writer-id'>{coverdWriterId}</div>
            <div className='qna-list-table-category'>{category}</div>
            <div className='qna-list-table-exposure'>{publicState ? '공개' : '비공개'}</div>
            <div className='qna-list-table-status'>
                    {status ? 
                    <div className='disable-bedge'>완료</div> :
                    <div className='primary-bedge'>접수</div>
                    }
            </div>
            <div className='qna-list-table-viewcount'>{viewCount}</div>
        </div>
    );
}

    //                    component                    //
    export default function QnaList() {

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
    } = usePagination<QnaListItem>(COUNT_PER_PAGE, COUNT_PER_SECTION);

    const {loginUserRole} = useUserStore();
    const [cookies] = useCookies();
    const [isToggleOn, setToggleOn] = useState<boolean>(false);

    const [searchWord, setSearchWord] = useState<string>('');

    //                    function                     //
    const navigator = useNavigate();

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
        changeBoardList(qnaList, isToggleOn);

        setCurrentPage(!qnaList.length ? 0 : 1);
        setCurrentSection(!qnaList.length ? 0 : 1);
    };

    //                event handler                    //
    const onWriteButtonClickHandler = () => {
        if (loginUserRole !== 'ROLE_USER'){
            alert('Q&A 등록은 로그인 후 가능 합니다.');
            return navigator(AUTH_SIGN_IN_ABSOLUTE_PATH);
        }
        
        navigator(QNA_REGIST_ABSOLUTE_PATH);
    };

    const onToggleClickHandler = () => {
        if (loginUserRole !== 'ROLE_ADMIN') return;
        setToggleOn(!isToggleOn);
    };

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };
    
    const onSearchButtonClickHandler = () => {
        if (searchWord) {
            if (cookies.accessToken) {
                getSearchQnaListRequest(searchWord, cookies.accessToken).then(getSearchBoardListResponse);
            } else {
                getSearchQnaListRequest(searchWord, '').then(getSearchBoardListResponse);
            }
        }
        else {
            getSearchQnaListRequest('', '').then(getSearchBoardListResponse);
        }
    };

    //                    effect                       //
    useEffect(() => {
        if (!cookies.accessToken) {
            getSearchQnaListRequest(searchWord, '').then(getSearchBoardListResponse);
        } else {
            getSearchQnaListRequest(searchWord, cookies.accessToken).then(getSearchBoardListResponse);
        }
    }, [isToggleOn]);
    
    //                    render                    //
    const toggleClass = isToggleOn ? 'toggle-active' : 'toggle';
    const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';

    return (
    <>  
    <div className="title-text">문의사항</div>
        
        <div id='table-list-wrapper'>
            <div className="qna-board-text">
                <div className="qna-board-image help"></div>
                궁금한 사항이 있으신가요? <br/> Q&A 등록은 로그인 후 가능 합니다. <br/> (평일 09:00 ~ 18:00 주말 공휴일 휴무)
            </div>
            <div className='table-list-top'>
                <div className='table-list-size-text'>전체 <span className='emphasis'>{totalLength}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
                <div className='table-list-top-right'>
                    {loginUserRole === 'ROLE_ADMIN'?
                    <>
                    <div className={toggleClass} onClick={onToggleClickHandler}></div>
                    <div className='qna-list-top-admin-text'>미완료 보기</div>
                    </> :
                    <>
                    <div className='primary-button' onClick={onWriteButtonClickHandler}>글쓰기</div>
                    </>
                    }
                </div>
            </div>

            <div className='table-list-table'>
                <div className='table-list-table-th qna'>
                    <div className='qna-list-table-reception-number'>순번</div>
                    <div className='qna-list-table-write-date'>작성일</div>
                    <div className='qna-list-table-title'>제목</div>
                    <div className='qna-list-table-writer-id'>작성자</div>
                    <div className='qna-list-table-category'>유형</div>
                    <div className='qna-list-table-exposure'> 노출여부</div>
                    <div className='qna-list-table-status'>상태</div>
                    <div className='qna-list-table-viewcount'>조회수</div>
                </div>
                {viewList.map((item, index) => <ListItem {...item} index={totalLength - (currentPage - 1) * COUNT_PER_PAGE - (index + 1)} key={item.receptionNumber} />)}
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