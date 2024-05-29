import React, { useEffect, useState } from 'react'
import './style.css'
import { CompanyListItem } from 'src/types';
import { useNavigate } from 'react-router';
import { ADMIN_COMPANY_LIST_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { GetCompanyListResponseDto } from 'src/apis/company/dto/response';
import ResponseDto from 'src/apis/response.dto';

//                    component                    //
function ListItem ({
    companyCode,
    rentCompany,
    address,
    owner,
    companyTelnumber,
    registDate
}:CompanyListItem) {

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onClickHandler = () => navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);

    //                    render                    //
    return (
        <div className='company-list-table-tr'onClick={onClickHandler}>
            <div className='company-list-table-check'><input type='checkbox' /></div>
            <div className='company-list-table-list-number'>1</div>
            <div className='company-list-table-comapny-code'>{companyCode}</div>
            <div className='company-list-table-company-name'>{rentCompany}</div>
            <div className='company-list-table-company-address'>{address}</div>
            <div className='company-list-table-company-owner'>{owner}</div>
            <div className='company-list-table-company-telnumber'>{companyTelnumber}</div>
            <div className='company-list-table-company-date'>{registDate}</div>
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
    // const [totalLenght, setTotalLength] = useState<number>(0);
    // const [totalPage, setTotalPage] = useState<number>(1);
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const [pageList, setPageList] = useState<number[]>([1]);
    // const [totalSection, setTotalSection] = useState<number>(1);
    // const [currentSection, setCurrentSection] = useState<number>(1);
    // const [isToggleOn, setToggleOn] = useState<boolean>(false);

    // const [searchWord, setSearchWord] = useState<string>('');


    //                    function                    //
    const navigator = useNavigate();

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

        // const { companyList } = result as GetCompanyListResponseDto;
        // changeCompanyList(companyList);

        // setCurrentPage(!companyList.length ? 0 : 1);
        // setCurrentSection(!companyList.length ? 0 : 1);
    };



  //                    render                    //
  return (
  <div>
  <div id='company-list-wrapper'>
  <div style={{ display: 'flex' }}>
  <div className='company-list-wrapper'>
    <div className='company-list-top'>
        <div className='company-list-size-text'>전체 <span className='emphasis'>건</span> | 페이지 <span className='emphasis'></span></div>
        <div className='company-list-top-right'>
              <div className='primary-button'>업체등록</div>
              <div className='second-button'>수정</div>
              <div className='error-button'>삭제</div>
        </div>
    </div>
    <div className='company-list-table'>
        <div className='company-list-table-th'>
            <div className='company-list-table-check'>체크</div>
            <div className='company-list-table-list-number'>순번</div>
            <div className='company-list-table-comapny-code'>고유번호</div>
            <div className='company-list-table-company-name'>업체명</div>
            <div className='company-list-table-company-address'>주소</div>
            <div className='company-list-table-company-owner'>담당자</div>
            <div className='company-list-table-company-telnumber'>연락처</div>
            <div className='company-list-table-company-date'>등록일</div>
        </div>
        {viewList.map(item => <ListItem {...item} />)}
    </div>
    <div className='company-list-bottom'>
        <div style={{ width: '299px' }}></div>
        <div className='company-list-pagenation'>
            <div className='company-list-page-left'></div>
            <div className='company-list-page-box'>
                <div className='company-list-page-active'></div> :
                <div className='company-list-page'></div>
            </div>
            <div className='company-list-page-right'></div>
        </div>
        <div className='company-list-search-box'>
            <div className='company-list-search-input-box'>
                <input className='company-list-search-input' placeholder='검색어를 입력하세요.'/>
            </div>
            <div className='disable-button'>검색</div>
        </div>
    </div>
  </div>
  </div>
  </div>
  </div>
);
}
