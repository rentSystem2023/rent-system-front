import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ResponseDto from 'src/apis/response.dto';
import { COUNT_PER_PAGE,COUNT_PER_SECTION, MAIN_PATH, QNA_DETAIL_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores/car.reservation.store';
import { QnaListItem } from 'src/types';
import './style.css';
import { GetMyInfoQnaListResponseDto } from 'src/apis/user/dto/response';
import { getMyQnaListRequest } from 'src/apis/user';
import { usePagination } from 'src/hooks';

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

    //                    function                     //
    const navigator = useNavigate();

    //                event handler                    //
    const onClickHandler = () => {
        navigator(QNA_DETAIL_ABSOLUTE_PATH(receptionNumber), { state: { previousPage: 'MY_QNA_LIST' } });
    };

    //                    Render                       //
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
    //                    component                    //
export default function MyInfoQnaList() {

    //                      state                      //
    const { loginUserRole } = useUserStore();

    const [cookies] = useCookies();

    const {
        viewList,
        pageList,
        currentPage,
        totalLength,
        setCurrentPage,
        setCurrentSection,
        changeBoardList,
        onPageClickHandler,
        onPreSectionClickHandler,
        onNextSectionClickHandler
    } = usePagination<QnaListItem>(COUNT_PER_PAGE, COUNT_PER_SECTION);

    //                    function                     //
    const navigator = useNavigate();

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

    //                    effect                       //
    useEffect (() => {
        if (!cookies.accessToken || loginUserRole !== 'ROLE_USER') return;
        getMyQnaListRequest(cookies.accessToken).then(getMyQnaListResponse);
    }, []);

    //                    Render                       //
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
                        <div className='table-list-bottom myqna'>
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