import axios from 'axios';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { PostNoticeRequest } from 'src/apis/notice/dto';
import { PostNoticeBoardRequestDto } from 'src/apis/notice/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { NOTICE_LIST_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
export default function NoticeWrite() {

    //                              state                              //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    //                              function                              //

    const navigator = useNavigate();

    const PostNotceResponse = (result: ResponseDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }
        navigator(NOTICE_LIST_ABSOLUTE_PATH);
    };



    //                              event Handler                              //
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
        if (!title.trim() || !contents.trim()) return; // 비어있으면 return
        if (!cookies.accessToken) return;

        let imageUrl = '';
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            imageUrl = await axios.post('http://localhost:4000/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => response.data ? response.data : '').catch(error => '');
        }
    
        const requestBody: PostNoticeBoardRequestDto = {
            title,
            contents,
            imageUrl
        }

        PostNoticeRequest(requestBody, cookies.accessToken).then(PostNotceResponse);

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

    //                              effect                              //

    // 화면이 전환될때 작성
    useEffect(() => {

        if (loginUserRole === 'ROLE_USER') {
            navigator(NOTICE_LIST_ABSOLUTE_PATH);
            return;

        }

    }, [loginUserRole])

    //                              render                              //

    return (
        <div id="notice-write-wrapper">
            <div className='notice-write-top'>
                <div className='notice-write-title-box'>
                    <input className='notice-write-title-input' placeholder='제목을 입력해 주세요' value={title} onChange={onTitleChangeHandler} />
                </div>
                <div className='primary-button' onClick={onPostButtonClickHandler}>올리기</div>
            </div>
            <div className='notice-write-contents-box'>
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
