import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import './style.css'
import { useNavigate, useParams } from 'react-router';
import { deleteNoticeBoardRequest, getNoticeRequest, increaseViewCountRequest } from 'src/apis/notice/dto';
import { GetNoticeBoardListResponseDto, GetNoticeBoardResponseDto } from 'src/apis/notice/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { ADMIN_NOTICE_UPDATE_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, NOTICE_LIST_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores/car.reservation.store';
    //                    component                    //
export default function NoticeDetail() {

    //                      state                      //
    const { loginUserId, loginUserRole } = useUserStore();
    const { registNumber } = useParams();

    const [cookies] = useCookies();
    
    const [title, setTitle] = useState<string>('');
    const [writerId, setWriterId] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);
    const [writeDate, setWriteDate] = useState<string>('');

    //                    function                     //
    const navigator = useNavigate();

    const increaseViewCountResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 접수번호입니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(MAIN_ABSOLUTE_PATH);
                return;
            }
            navigator(NOTICE_LIST_ABSOLUTE_PATH);
            return;
        }

        if (!registNumber) return;
        getNoticeRequest(registNumber)
            .then(getNoticeResponse);
    };

    const getNoticeResponse = (result: GetNoticeBoardListResponseDto | ResponseDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '잘못된 접수번호입니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(MAIN_ABSOLUTE_PATH);
                return;
            }
            navigator(NOTICE_LIST_ABSOLUTE_PATH);
            return;
        }

        const { title, writerId, writeDatetime, viewCount, contents, imageUrl } = result as GetNoticeBoardResponseDto;
        setTitle(title);
        setWriterId(writerId);
        setWriteDate(writeDatetime);
        setViewCount(viewCount);
        setContents(contents);
        setImageUrl(imageUrl);
    };

    const deleteNoticeRequest = (result: ResponseDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
        result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        navigator(NOTICE_LIST_ABSOLUTE_PATH);
    };

    //                event handler                    //
    const onListClickHandler = () => navigator(NOTICE_LIST_ABSOLUTE_PATH);
    
    const onUpdateClickHandler = () => {
        if (!registNumber || loginUserId !== writerId) return;
        navigator(ADMIN_NOTICE_UPDATE_ABSOLUTE_PATH(registNumber));
    };

    const onDeleteClickHandler = () => {
        if (!registNumber || loginUserId !== writerId || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        
        if (!isConfirm) return;
        deleteNoticeBoardRequest(registNumber, cookies.accessToken).then(deleteNoticeRequest)
    };

    //                    effect                       //
    useEffect(() => {
        if (!registNumber) return;
        getNoticeRequest(registNumber).then(getNoticeResponse);
    }, []);

    useEffect(() => {
        if (!cookies.accessToken || !registNumber) return;
        increaseViewCountRequest(registNumber, cookies.accessToken).then(increaseViewCountResponse);
    }, []);

    //                    Render                       //
    return (
        <div id='notice-detail-wrapper'>
            <div className='notice-detail-main-box'>
                <div className='notice-detail-top-box'>
                    <div className='notice-detail-title-box'>{title}</div>
                    <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>
                    <div className='notice-detail-info-box'>
                        <div className='notice-detail-info'>작성자 : 관리자</div>
                        <div className='notice-detail-info-divider'>{'\|'}</div>
                        <div className='notice-detail-info'>작성일 {writeDate}</div>
                        <div className='notice-detail-info-divider'>{'\|'}</div>
                        <div className='notice-detail-info'>조회수 {viewCount}</div>
                    </div>
                    <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>
                </div>
                <div className='notice-detail-contents-box'>{contents}</div>
                <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>
                {imageUrl && <img src={imageUrl} alt="Database Image" className="file-image" />}
            </div>
            <div className='notice-detail-button-box'>
                <div className='primary-button  list' onClick={onListClickHandler}>목록</div>
                {loginUserRole === 'ROLE_ADMIN' &&
                    <div className='notice-detail-owner-button-box'>
                        <div className='error-button delete' onClick={onUpdateClickHandler}>수정</div>
                        <div className='error-button delete' onClick={onDeleteClickHandler}>삭제</div>
                    </div>
                }
            </div>
        </div>
    );
}