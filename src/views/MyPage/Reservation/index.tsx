import React from 'react'
import './style.css'

export default function MyReservation() {
    return (
        <div className='my-reservation-wrapper'>
            <div className='my-reservation-card'>
                <div className='my-reservation-state'>
                    <div className='reservation-title'>예약상태</div>
                </div>
                
                <div className='my-reservation-info-list'>
                    <div className='my-reservation-car-image'>사진</div>

                    <div className='my-reservation-info'>
                        <div className='reservation-info-wrap'>
                            <div className='reservation-title'>예약날짜 :</div>
                        </div>
                        <div className='reservation-info-wrap'>
                            <div className='reservation-title'>예약자명 :</div>
                        </div>
                        <div className='reservation-info-wrap'>
                            <div className='reservation-title'>예약번호 :</div>
                        </div>
                        <div className='reservation-info-wrap'>
                            <div className='reservation-title'>영업점 :</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}