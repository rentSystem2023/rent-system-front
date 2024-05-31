import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import { CompanyListItem } from 'src/types';
import { useNavigate } from 'react-router';
import { ADMIN_COMPANY_LIST_ABSOLUTE_PATH, ADMIN_COMPANY_REGIST_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { GetCompanyListResponseDto, GetSearchCompanyListResponseDto } from 'src/apis/company/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getSearchCompanyListRequest } from 'src/apis/company';

//                    component                    //
function ListItem ({
index,
companyCode,
rentCompany,
address,
owner,
companyTelnumber,
registDate
}: CompanyListItem & {index: number}) {

    //                    render                    //
    return (
        <div className='table-list-table-tr' >
            <div className='admin-table-list-table-th'>
                <div className='company-list-table-check'><input type='checkbox'/></div>
                <div className='company-list-table-list-number'>{index}</div>
                <div className='company-list-table-comapny-code'>{companyCode}</div>
                <div className='company-list-table-company-name'>{rentCompany}</div>
                <div className='company-list-table-company-address'>{address}</div>
                <div className='company-list-table-company-owner'>{owner}</div>
                <div className='company-list-table-company-telnumber'>{companyTelnumber}</div>
                <div className='company-list-table-company-date'>{registDate}</div>
            </div>
        </div>
    );

}

//                    component                    //
export default function CompanyList() {
    //                    state                    //
    const {loginUserRole} = useUserStore();

    const [cookies] = useCookies();

    const [companyList, setCompanyList] = useState<CompanyListItem[]>([]);
    const [viewList, setViewList] = useState<CompanyListItem[]>([]);
    const [totalLenght, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    const [searchWord, setSearchWord] = useState<string>('');


    //                    function                    //
    const navigator = useNavigate();

    const changePage = (companyList: CompanyListItem[], totalLenght: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLenght - 1) endIndex = totalLenght;
        const viewList = companyList.slice(startIndex, endIndex);
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

    const changeCompanyList = (companyList: CompanyListItem[]) => {
        setCompanyList(companyList);

        const totalLenght = companyList.length;
        setTotalLength(totalLenght);

        const totalPage = Math.floor((totalLenght - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(companyList, totalLenght);

        changeSection(totalPage);
    };

    const getCompanyListResponse = (result: GetCompanyListResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(MAIN_PATH);
            return;
        }

        const { companyList } = result as GetCompanyListResponseDto;
        changeCompanyList(companyList);

        setCurrentPage(!companyList.length ? 0 : 1);
        setCurrentSection(!companyList.length ? 0 : 1);
    };

    const getSearchCompanyListResponse = (result: GetSearchCompanyListResponseDto | ResponseDto | null) => {

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
  
        const { companyList } = result as GetSearchCompanyListResponseDto;
        changeCompanyList(companyList);
  
        setCurrentPage(!companyList.length ? 0 : 1);
        setCurrentSection(!companyList.length ? 0 : 1);
    };
  
    //                    event handler                    //
    const onRegistButtonClickHandler = () => {
        if (loginUserRole !== 'ROLE_ADMIN') return; 
        navigator(ADMIN_COMPANY_REGIST_ABSOLUTE_PATH);
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
      if (!searchWord) {
          getSearchCompanyListRequest('', cookies.accessToken).then(getSearchCompanyListResponse);
      } else {
          if (!cookies.accessToken) return;
          getSearchCompanyListRequest(searchWord, cookies.accessToken).then(getSearchCompanyListResponse);
      }
  };
  
    //                    effect                    //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getSearchCompanyListRequest(searchWord,cookies.accessToken).then(getSearchCompanyListResponse);
    }, []);
  
    useEffect(() => {
        if (!companyList.length) return;
        changePage(companyList, totalLenght);
    }, [currentPage]);
  
    useEffect(() => {
        if (!companyList.length) return;
        changeSection(totalPage);
    }, [currentSection]);


  //                    render                    //
  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
  return (
    <div>
    <div id='table-list-wrapper'>
        <div className='table-list-top'>
            <div className='table-list-size-text'>전체 <span className='emphasis'>건</span> | 페이지 <span className='emphasis'></span></div>
            <div className='table-list-top-right'>
                <div className='primary-button' onClick={onRegistButtonClickHandler}>업체등록</div>
                <div className='second-button'>수정</div>
                <div className='error-button'>삭제</div>
            </div>
        </div>
        <div className='table-list-table'>
            <div className='admin-table-list-table-th'>
                <div className='company-list-table-check'>체크</div>
                <div className='company-list-table-list-number'>순번</div>
                <div className='company-list-table-comapny-code'>고유번호</div>
                <div className='company-list-table-company-name'>업체명</div>
                <div className='company-list-table-company-address'>주소</div>
                <div className='company-list-table-company-owner'>담당자</div>
                <div className='company-list-table-company-telnumber'>연락처</div>
                <div className='company-list-table-company-date'>등록일</div>
            </div>
            {viewList.map((item, index) => <ListItem key={index} index={viewList.length - index + (currentPage - 1) * COUNT_PER_PAGE} {...item} />)}
        </div>
        <div className='table-list-bottom'>
            <div style={{ width: '299px' }}></div>
            <div className='table-list-pagenation'>
                <div className='table-list-page-left' onClick={onPreSectionClickHandler}></div>
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
                    <input className='table-list-search-input' placeholder='검색어를 입력하세요.' value={searchWord} onChange={onSearchWordChangeHandler}/>
                </div>
                <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
            </div>
        </div>
    </div>
    </div>
    );
}
