import React from 'react'
import './style.css'
import SelectContainer from 'src/layouts/SelectContainer'

export default function CarSelect() {
    return (
        <div id="user-page-wrapper">
            <div className="title-text">차량 검색</div>
            <div className='car-select-wrap'>
                <div className='car-select-container'><SelectContainer/></div>
                <div className='option-container'>
                    <div className='table-list-search-box'>
                        <div className='table-list-search-input-box'>
                            <input className='table-list-search-input' placeholder='검색어를 입력하세요.'/>
                        </div>
                        <div className='primary-button'>검색</div>
                    </div>
                    <div className='filter-button'>필터</div>
                </div>
                <div className='car-list-wrap'>
                    <div className='car-card'>
                        <div className='car-name'>자동차명</div>
                        <div className='list-wrap'>
                            <div className='car-image'>사진</div>
                            <div>
                                <div className='insurance-price'>보험별 가격</div>
                                <div className='insurance-price'>보험별 가격</div>
                                <div className='insurance-price'>보험별 가격</div>
                            </div>
                        </div>
                    </div>
                    <div className='car-card'>자동차 카드</div>
                    <div className='car-card'>자동차 카드</div>
                    <div className='car-card'>자동차 카드</div>
                    <div className='car-card'>자동차 카드</div>
                </div>
                <div>페이지 번호</div>
            </div>
        </div>
    )
}
