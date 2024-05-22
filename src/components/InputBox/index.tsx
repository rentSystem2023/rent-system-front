import React, { ChangeEvent, useState } from 'react'

import { useCookies } from 'react-cookie';
import { GetSearchQnaBoardListResponseDto } from 'src/apis/qna/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { BoardListItem } from 'src/types';


export default function componentsList() {

    //                  state                    //

    const [cookies] = useCookies();

    const [boardList, setBoardList] = useState<BoardListItem[]>([]);
    const [searchWord, setSearchWord] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    //                  function                 //

    //                event handler             //

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onSearchButtonClickHandler = () => {
        if (!searchWord) return;
        if (!cookies.accessToken) return;

        // 전체 리스트 불러오기 API 함수 각각 불러와야함
        getSearckListRequest(searchWord, cookies.accessToken).then(getSearchBoardListResponse);
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

    const getSearchBoardListResponse = (result: GetSearchQnaBoardListResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '검색어를 입력하세요.' : 
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const { boardList } = result as GetSearchBoardListResponseDto;
        changeBoardList(boardList);
        
        setCurrentPage(!boardList.length ? 0 : 1);
        setCurrentSection(!boardList.length ? 0 : 1);

    };

    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <div className='main-bar'>
            <div className='search'>
                <div className='input-box'>
                    <input 
                    className='list-search-input' placeholder='검색어를 입력하세요.' 
                    value={searchWord} {onSearchWordChangeHandler}
                    />
                </div>
                <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
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
            
        </div>
    );
}