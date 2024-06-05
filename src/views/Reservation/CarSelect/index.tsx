import React from 'react'
import './style.css'

export default function CarSelect() {
    return (
        <div id="user-page-wrapper">
            <div className="title-text">차량 선택</div>
            <div className='car-select-wrap'>
                <div>
                    <div>검색</div>
                    <div>가격순 | 필터순</div>
                    <div>필터</div>
                </div>
                <div>
                    <div>자동차 카드</div>
                    <div>자동차 카드</div>
                    <div>자동차 카드</div>
                    <div>자동차 카드</div>
                    <div>자동차 카드</div>
                </div>
                <div>페이지 번호</div>
            </div>
        </div>
    )
}
