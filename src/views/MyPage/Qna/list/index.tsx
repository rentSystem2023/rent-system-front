import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ResponseDto from 'src/apis/response.dto';
import {
    COUNT_PER_PAGE,
    COUNT_PER_SECTION,
    MAIN_PATH
} from 'src/constant';
import { useUserStore } from 'src/stores';
import { QnaListItem } from 'src/types';
import './style.css';
import { GetMyInfoQnaListResponseDto } from 'src/apis/user/dto/response';
import { getMyQnaListRequest } from 'src/apis/user';

//                    component                    //
function ListItem({
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

    const navigator = useNavigate();

    const onClickHandler = () => {
        navigator(`/rentcar/qna/${receptionNumber}`, { state: { previousPage: 'MY_QNA_LIST' } });
    };

    return (
        <div className='table-list-table-tr qna' onClick={onClickHandler}>
            <div className='qna-list-table-reception-number'>{index + 1}</div>
            <div className='qna-list-table-write-date'>{writeDatetime}</div>
            <div className={`qna-list-table-title ${publicState ? 'public' : 'private'}`} style={{ textAlign: 'left' }}>{title}</div>
            <div className='qna-list-table-writer-id'>{writerId}</div>
            <div className='qna-list-table-category'>{category}</div>
            <div className='qna-list-table-exposure'>{publicState ? '공개' : '비공개'}</div>
            <div className='qna-list-table-status'>
                {status ? <div className='disable-bedge'>완료</div> : <div className='primary-bedge'>접수</div>}
            </div>
            <div className='qna-list-table-viewcount'>{viewCount}</div>
        </div>
    );
}

export default function MyInfoQnaList() {

    //                    state                    //
    const [cookies] = useCookies();
    const { loginUserRole } = useUserStore();
    const [qnaList, setQnaList] = useState<QnaListItem[]>([]);
    const [viewList, setViewList] = useState<QnaListItem[]>([]);
    const [totalLength, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);
    const [isToggleOn, setToggleOn] = useState<boolean>(false);

    //                    function                    //
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

    const getMyQnaListResponse = (result: GetMyInfoQnaListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(MAIN_PATH);
            return;
        }

        const { qnaList } = result as GetMyInfoQnaListResponseDto;
        changeBoardList(qnaList);

        setCurrentPage(!qnaList.length ? 0 : 1);
        setCurrentSection(!qnaList.length ? 0 : 1);
    };

    //                    event handler                    //
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

    //                  effect                      //
    useEffect (() => {
        if (!cookies.accessToken || loginUserRole !== 'ROLE_USER') return;
        getMyQnaListRequest(cookies.accessToken).then(getMyQnaListResponse);
    }, []);

    useEffect(() => {
        if (!qnaList.length) return;
        changePage(qnaList, totalLength);
    }, [currentPage]);

    useEffect(() => {
        if (!qnaList.length) return;
        changeSection(totalPage);
    }, [currentSection]);

    //                    render                    //
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
                        {viewList.map((item, index) => <ListItem {...item} index={totalLength - (currentPage - 1) * COUNT_PER_PAGE - (index + 1)} key={item.receptionNumber} />)}
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
                </div>
            </div>
            </div>
            </div>
        </>
    );
}