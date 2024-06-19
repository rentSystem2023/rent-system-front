import React, { ChangeEvent, useEffect, useState } from 'react'
import "./style.css";
import ServiceContainer from 'src/layouts/ServiceContainer';
import { UserListItem } from 'src/types';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { ADMIN_USER_DETAIL_ABSOLUTE_PATH, ADMIN_USER_LIST_ABSOLUTE_PATH, ADMIN_USER_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { getSearchUserListRequest, getUserListRequest } from 'src/apis/userList';
import { GetSearchUserListResponseDto, GetUserListResponseDto } from 'src/apis/userList/dto/response';

function ListItem ({
    index,
    userId,
    nickName,
    userEmail,
    joinDate
    }: UserListItem & {index: number}) {

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onClickHandler = () => navigator(ADMIN_USER_DETAIL_ABSOLUTE_PATH(userId));

    //                    render                    //
    return (
        <div className='table-list-table-tr user' onClick={onClickHandler}>
            <div className='user-list-table-list-number'>{index}</div>
            <div className='user-list-table-id'>{userId}</div>
            <div className='user-list-table-nickname'>{nickName}</div>
            <div className='user-list-table-email'>{userEmail}</div>
            <div className='user-list-table-join-date'>{joinDate}</div>
        </div>
    );
}

export default function UserList() {

    //                    state                    //
    const {loginUserRole} = useUserStore();
    const [cookies] = useCookies();
    const [userList, setUserList] = useState<UserListItem[]>([]);
    const [viewList, setViewList] = useState<UserListItem[]>([]);
    const [totalLenght, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    const [searchWord, setSearchWord] = useState<string>('');

    //                    function                    //
    const navigator = useNavigate();

    const changePage = (userList: UserListItem[], totalLenght: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLenght - 1) endIndex = totalLenght;
        const viewList = userList.slice(startIndex, endIndex);
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

    const changeUserList = (userList: UserListItem[]) => {
        setUserList(userList);

        const totalLenght = userList.length;
        setTotalLength(totalLenght);

        const totalPage = Math.floor((totalLenght - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(userList, totalLenght);

        changeSection(totalPage);
    };

    const getUserListResponse = (result: GetUserListResponseDto | ResponseDto | null) => {

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

        const { userList } = result as GetUserListResponseDto;
        changeUserList(userList);

        setCurrentPage(!userList.length ? 0 : 1);
        setCurrentSection(!userList.length ? 0 : 1);
    };

    const getSearchUserListResponse = (result: GetSearchUserListResponseDto | ResponseDto | null) => {

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

        const { userList } = result as GetSearchUserListResponseDto;
        changeUserList(userList);

        setCurrentPage(!userList.length ? 0 : 1);
        setCurrentSection(!userList.length ? 0 : 1);
    };


    //                    event handler                    //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
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

    const onSearchButtonClickHandler = () => {
        if (!searchWord) {
            getSearchUserListRequest('', cookies.accessToken).then(getSearchUserListResponse);
        } else {
            if (!cookies.accessToken) return;
            getSearchUserListRequest(searchWord, cookies.accessToken).then(getSearchUserListResponse);
        }
    };

    
    //                    effect                    //
    useEffect(() => {
        if (!cookies.accessToken || loginUserRole !== 'ROLE_ADMIN') return navigator(MAIN_ABSOLUTE_PATH);
        getSearchUserListRequest(searchWord,cookies.accessToken).then(getSearchUserListResponse);
    }, []);

    useEffect(() => {
        if (!userList.length) return;
        changePage(userList, totalLenght);
    }, [currentPage]);

    useEffect(() => {
        if (!userList.length) return;
        changeSection(totalPage);
    }, [currentSection]);

    //                    render                    //

    const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';

    return (
        <>
        <div id='table-list-wrapper'>
        <div className="my-info-title">회원 관리</div>
            <div className='table-list-top'>
                <div className='table-list-size-text'>전체 <span className='emphasis'>{totalLenght}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
            </div>        

        <div className='table-list-table'>
            <div className='table-list-table-th user'>
                <div className='user-list-table-number'>순번</div>
                <div className='user-list-table-id'>아이디</div>
                <div className='user-list-table-nickname'>닉네임</div>
                <div className='user-list-table-email'> 이메일</div>
                <div className='user-list-table-join-date'> 가입날짜</div>
            </div>
            {viewList.map((item, index) => <ListItem key={index} index={totalLenght - ((currentPage - 1) * COUNT_PER_PAGE + index)} {...item} />)}
        </div>
        <div className='table-list-bottom'>
            <div style={{ width: '299px' }}></div>
            <div className='table-list-pagenation'>
                
            <div className='table-list-page-box'>
                {pageList.map(page => 
                page === currentPage ?
                <div className='table-list-page-active'>{page}</div> :
                <div className='table-list-page'onClick={() => onPageClickHandler(page)}>{page}</div>
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
    )
}