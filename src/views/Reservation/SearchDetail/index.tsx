import React from 'react'
import './style.css'

export default function SearchDetail() {
  return (
    <div id='user-page-wrapper'>
      <div className='search-datail-wrapper'>
        <div className='search-detail-container'>          
          <div className='search-detail-image'>사진</div>

          <div className='search-datail-list'>
            <div className='search-info-container'>
              <div className='search-detail-title'>이름</div>
              <div className='qna-detail-info-divider'>{'\|'}</div>
              <div className='search-detail-contents'>아으으아아아아아아아아아아아</div>
            </div>

            <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>
            
            <div className='search-info-container'>
                <div className='search-detail-title'>예약 날짜</div>
                <div className='qna-detail-info-divider'>{'\|'}</div>
                <div className='search-detail-contents'>아으으아아아아아아아아아아아</div>
              </div>

            <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>

            <div className='search-payment-wrap'>
              <div className='search-info-container'>
                <div className='search-detail-title'>가격</div>
                <div className='qna-detail-info-divider'>{'\|'}</div>
                <div className='search-detail-contents'>아으으아아아아아아아아아아아</div>
              </div>
              
              <div className='primary-button'>예약하기</div>
            </div>
          </div>
        </div>

        <div className='search-detail-info-list-wrap'>
          <div className='search-detail-info-button'>
            <div className='search-detail-button-wrap active'>
              <div className='search-detail-info-title'>차량 정보</div>
            </div>            
            <div className='search-detail-button-wrap'>
              <div className='search-detail-info-title'>업체 정보</div>
            </div>
          </div>

          <div className='search-detail-info-list-container'>
            <div className='search-detail-car-info-list'>
              <div className='search-detail-info-title'>차량 정보</div>
              <div className='search-detail-info-contents'>
                <div className='list-title-wrap'>
                  <div className='list-title'>차량명</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>차량며여여여여영</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>브랜드</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>브으으으으랜드</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>등급</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>등급등급등급</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>연비</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>여어어어어ㅓ어어언비</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>연료</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>연료로롱로오로오오오오오</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>연식</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>여어어어어어언식</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>보험</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>보허허허허엄</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>보험료</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>보험료 얼마게</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>탑승 인원 수</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>탑승가능인원수탑승가능인원수</div>
                </div>
              </div>
            </div>

            <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>

            <div className='search-detail-company-info-list'>
              <div className='search-detail-info-title'>업체 정보</div>
              <div className='search-detail-info-contents'>
                <div className='list-title-wrap'>
                  <div className='list-title'>업체명</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>어어어업체메에에에명</div>
                </div>
                <div className='list-map-wrap'>
                  <div className='list-title'>업체 위치</div>
                  <div className='list-map'>지도 들어가야합</div>
                  <div className='list-title-contents'>주소 들어가야함</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>전화번호</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>업체 전화번호전화번호</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>영업시간</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>영업시가아아아아안</div>
                </div>
                <div className='list-title-wrap'>
                  <div className='list-title'>영업점 방침</div>
                  <div className='qna-detail-info-divider'>{'\|'}</div>
                  <div className='list-title-contents'>방침???????????????</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
