import React from 'react'
import './style.css'

export default function CompanyList() {
  return (
  <div>
  <div id='company-list-wrapper'>
  <div style={{ display: 'flex' }}>
  <div className='company-list-wrapper'>
    <div className='company-list-top'>
        <div className='company-list-size-text'>전체 <span className='emphasis'>건</span> | 페이지 <span className='emphasis'></span></div>
        <div className='company-list-top-right'>
              <div className='primary-button'>업체등록</div>
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
