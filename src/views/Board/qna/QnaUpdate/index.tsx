import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';

import ResponseDto from 'src/apis/response.dto';
import { GetQnaBoardListResponseDto, GetQnaBoardResponseDto } from 'src/apis/qna/dto/response';
import { QNA_DETAIL_ABSOLUTE_PATH, QNA_LIST_ABSOLUTE_PATH } from 'src/constant';
import { PutQnaRequestDto } from 'src/apis/qna/dto/request';
import { getQnaRequest, putQnaRequest } from 'src/apis/qna/dto';
import axios from 'axios';



//                    component                    //
export default function QnaUpdate() {

    //                    state                    //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserId, loginUserRole } = useUserStore();

    const [cookies] = useCookies();
    const [writerId, setWriterId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [category, setCategory] = useState<string>('');  // 카테고리 state 추가
    const [publicState, setPublicState] = useState<boolean>(false);  // 퍼블릭 스테이트 state 추가
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // 파일 state 추가
    const [imageUrl, setImageUrl] = useState<string | null>(null); // 이미지 미리보기 URL 추가

    const { receptionNumber } = useParams();
    //                    function                    //
    const navigator = useNavigate();

    const getQnaResponse = (result: GetQnaBoardListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }

        const { writerId, title, contents, category, publicState, status ,imageUrl} = result as GetQnaBoardResponseDto;  // 카테고리와 퍼블릭 스테이트 포함
        if (writerId !== loginUserId) {
            alert('권한이 없습니다.');
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }
        if (status) {
            alert('답변이 완료된 게시물입니다.');
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }

        setTitle(title);
        setContents(contents);
        setWriterId(writerId);
        setCategory(category);  // 카테고리 설정
        setPublicState(publicState);  // 퍼블릭 스테이트 설정
        setImageUrl(imageUrl);
    };

    const putQnaResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '모든 값을 입력해주세요.' :
            result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
            result.code === 'WC' ? '이미 답글이 작성되어있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!receptionNumber) return;
        navigator(QNA_DETAIL_ABSOLUTE_PATH(receptionNumber));
    };

    

    //                    event handler                    //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setTitle(title);
    };

    const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const contents = event.target.value;
        if (contents.length > 1000) return;
        setContents(contents);

        if (!contentsRef.current) return;
        contentsRef.current.style.height = 'auto';
        contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
    };



    const onUpdateButtonClickHandler = async () => {
        if (!cookies.accessToken || !receptionNumber) return;
        if (!title.trim() || !contents.trim() ) return;
    
        let imageUrl = '';
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            imageUrl = await axios.post('http://localhost:4000/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => response.data ? response.data : '').catch(error => '');
        }
        
        

        const requestBody: PutQnaRequestDto = {
            title,
            contents,
            category,
            publicState,
            imageUrl
        }
        putQnaRequest(receptionNumber, requestBody, cookies.accessToken).then(putQnaResponse);
    }

    


// description: 이미지 변경 시 이미지 미리보기 //
    const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        }
    };

    const onCategoryChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    
    const onPublicStateChangeHandler = () => {
        setPublicState(!publicState); // 체크 여부에 따라 값을 반대로 설정
    };


    //                    effect                    //
    useEffect(() => {
        if (!receptionNumber || !cookies.accessToken) return;
        if (!loginUserRole) return;
        if (loginUserRole !== 'ROLE_USER') {
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }
        getQnaRequest(receptionNumber).then(getQnaResponse);  // accessToken 추가
    }, [loginUserRole]);

    //                    render                    //
    return (
        <div id="qna-write-wrapper">
            <div className='qna-write-top'>
                <div className='qna-write-title-box'>

                    <input className='qna-write-title-input' placeholder='제목을 입력해 주세요' value={title} onChange={onTitleChangeHandler} />
                </div>
                <div className='qna-category-box'>
                    <div className='public-state-toggle'>
                        공개 여부:<input type="checkbox" onChange={onPublicStateChangeHandler} />
                        {publicState ? '비공개' : '공개'}
                    </div>
                    <select value={category} onChange={onCategoryChangeHandler} className='qna-category-select'>
                        <option value="문의">문의</option>
                        <option value="건의">건의</option>
                        <option value="기타">기타</option>
                    </select>
                </div>
                <div className='primary-button' onClick={onUpdateButtonClickHandler}>올리기</div>
            </div>

            <div className='qna-write-contents-box'>
                {/*  두줄이상 작성할때 textarea 사용,  row로 기본값 10줄짜리 작성, 1000자 제한 가능 */}
                <textarea ref={contentsRef} className='qna-write-contents-textarea' rows={10} placeholder='내용을 입력해주세요/ 1000자' maxLength={1000} value={contents} onChange={onContentsChangeHandler} />
                <div className='dd'>파일첨부  <input type="file" onChange={onFileChangeHandler} />
                </div>
                {imageUrl && (
                    <div className='preview'>
                        <img src={imageUrl} alt="Preview" className='preview-image' />
                    </div>
                )}
            </div>
        </div>
    );
}