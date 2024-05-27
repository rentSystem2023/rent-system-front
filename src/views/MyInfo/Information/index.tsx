import React from 'react'
import './style.css'
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { USER_INFO_MODIFY_ABSOLUTE_PATH } from 'src/constant';
import { useNavigate } from 'react-router-dom';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';

//                    component                    //
export default function MyInfo() {

    //                    state                    //
    const [cookies, setCookie] = useCookies();



    //                    function                    //
    const MyInfoResponse = (result: GetMyInfoResponseDto | ResponseDto | null) => {

    }

    //                    event handler                    //
    const navigator = useNavigate();

    const onModifyButtonClickHandler = () => {
        navigator(USER_INFO_MODIFY_ABSOLUTE_PATH);
    }
    
    


    return (
        <div id='information-wrapper'>
            <div className='information-main'>
                <div className='information-title h1'>내 정보</div>
                <div className='information-contents'>
                    <div className='information-container'>
                        <div className='information-nickname'>닉네임</div>
                        <div className='information-id'>아이디</div>
                        <div className='information-password'>비밀번호</div>
                        <div className='information-email'>이메일</div>
                        <div className='information-joindate'>가입날짜</div>
                    </div>
                    <div className='information-button'>
                        <div className='information-modify-button' onClick={ onModifyButtonClickHandler }>수정하기</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
