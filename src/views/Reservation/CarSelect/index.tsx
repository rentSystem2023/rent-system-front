import React from 'react'
import './style.css'
import SelectContainer from 'src/layouts/SelectContainer';

export default function CarSelect() {
    return (
        <div id="user-page-wrapper">
            <div className='reservation-select-container'>{<SelectContainer/>}</div>
            
            <div className='car-select-wrap'>
                <div className='option-container'>
                    <div className='table-list-search-box'>
                        <div className='table-list-search-input-box'>
                            <input className='table-list-search-input' placeholder='검색어를 입력하세요.' />
                        </div>
                        <div className='primary-button'>검색 우하늘 사고치는 중</div>
                    </div>
                    <div className='filter-button'>필터</div>
                </div>

                <div className='car-list-wrap'>
                    <div className='car-list-card'>
                        <div className='car-name-wrap'>
                            <div className='car-name'>자동차명</div>
                        </div>
                        <div className='list-wrap'>
                            <div className='car-image nano'></div>
                            <div className='insurance-wrap'>
                                <div className='insurance-price'>
                                    <div className='price-title'>완전자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                                <div className='insurance-price'>
                                    <div className='price-title'>고급자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                                <div className='insurance-price'>
                                    <div className='price-title'>슈퍼자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='car-list-card'>
                        <div className='car-name-wrap'>
                            <div className='car-name'>자동차명</div>
                        </div>
                        <div className='list-wrap'>
                            <div className='car-image nano'></div>
                            <div className='insurance-wrap'>
                                <div className='insurance-price'>
                                    <div className='price-title'>완전자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                                <div className='insurance-price'>
                                    <div className='price-title'>고급자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                                <div className='insurance-price'>
                                    <div className='price-title'>슈퍼자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='car-list-card'>
                        <div className='car-name-wrap'>
                            <div className='car-name'>자동차명</div>
                        </div>
                        <div className='list-wrap'>
                            <div className='car-image nano'></div>
                            <div className='insurance-wrap'>
                                <div className='insurance-price'>
                                    <div className='price-title'>완전자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                                <div className='insurance-price'>
                                    <div className='price-title'>고급자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                                <div className='insurance-price'>
                                    <div className='price-title'>슈퍼자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='car-list-card'>
                        <div className='car-name-wrap'>
                            <div className='car-name'>자동차명</div>
                        </div>
                        <div className='list-wrap'>
                            <div className='car-image nano'></div>
                            <div className='insurance-wrap'>
                                <div className='insurance-price'>
                                    <div className='price-title'>완전자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                                <div className='insurance-price'>
                                    <div className='price-title'>고급자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                                <div className='insurance-price'>
                                    <div className='price-title'>슈퍼자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='car-list-card'>
                        <div className='car-name-wrap'>
                            <div className='car-name'>자동차명</div>
                        </div>
                        <div className='list-wrap'>
                            <div className='car-image nano'></div>
                            <div className='insurance-wrap'>
                                <div className='insurance-price'>
                                    <div className='price-title'>완전자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                                <div className='insurance-price'>
                                    <div className='price-title'>고급자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                                <div className='insurance-price'>
                                    <div className='price-title'>슈퍼자차</div>
                                    <div className='price-result'>최소가격</div>
                                    <div className='price-result'>최대가격</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>     
                <div className='table-list-page-box'>페이지 번호</div>

            </div>           
        </div>    
    );
}
