import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useUserStore } from 'src/stores/car.reservation.store';
import { useNavigate } from 'react-router';
import { QNA_LIST_ABSOLUTE_PATH } from 'src/constant';
import { PostQnaBoardRequestDto } from 'src/apis/qna/dto/request';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { PostQnaRequest } from 'src/apis/qna';
import { uploadFile } from 'src/apis/imageUrl'; 

//                    component                    //
export default function QnAWrite() {

    //                      state                      //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [publicState, setPublicState] = useState<boolean>(true);
    const [category, setCategory] = useState<string>('문의');

    //                    function                     //
    const navigator = useNavigate();

    const postQnaResponse = (result: ResponseDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }
        navigator(QNA_LIST_ABSOLUTE_PATH);
    };

    //                event handler                    //
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
    }

    const onPostButtonClickHandler = async () => {
        if (!title.trim() || !contents.trim()) return; 
        if (!cookies.accessToken) return;

        let imageUrl = '';
        if (selectedFile) {
            imageUrl = await uploadFile(selectedFile);
        }

        const requestBody: PostQnaBoardRequestDto = {
            title,
            contents,
            category,
            publicState,
            imageUrl
        };

        PostQnaRequest(requestBody, cookies.accessToken).then(postQnaResponse);
    };

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
        setPublicState(!publicState);
    };

    //                    effect                       //
    useEffect(() => {
        if (loginUserRole === 'ROLE_ADMIN') {
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }
    }, [loginUserRole, navigator]);

    //                    Render                       //
    return (
        <div id="qna-write-wrapper">
            <div className='qna-wrap'>
                <div className='qna-write-top'>
                    <div className='qna-write-title-box'>
                        <input className='qna-write-title-input' placeholder='제목을 입력해 주세요' value={title} onChange={onTitleChangeHandler} />
                    </div>
                    <div className='qna-category-box'>
                        <div className='public-state-toggle'>
                            공개 여부:<input type="checkbox" onChange={onPublicStateChangeHandler} checked={publicState} />
                            {publicState ? '공개' : '비공개'}
                        </div>
                        <select value={category} onChange={onCategoryChangeHandler} className='qna-category-select'>
                            <option value="문의">문의</option>
                            <option value="건의">건의</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                    <div className='primary-button' onClick={onPostButtonClickHandler}>올리기</div>
                </div>

                <div className='qna-write-contents-box'>
                    <textarea ref={contentsRef} className='qna-write-contents-textarea' rows={10} placeholder='내용을 입력해주세요/ 1000자' maxLength={1000} value={contents} onChange={onContentsChangeHandler} />
                    
                    <div style={{border: '1px solid rgba(238, 238, 238, 1)'}}></div>
                    
                    <div className='file-select'>파일첨부  <input type="file" onChange={onFileChangeHandler} />
                    </div>
                    {imageUrl && (
                        <div className='file-upload'>
                            <img src={imageUrl} alt="Preview" className='file-image' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}