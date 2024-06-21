import axios from 'axios';
import './style.css';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { PostNoticeRequest } from 'src/apis/notice';
import { PostNoticeBoardRequestDto } from 'src/apis/notice/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { NOTICE_LIST_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores/car.reservation.store';
import { uploadFile } from 'src/apis/imageUrl'; 

    //                    component                    //
export default function NoticeWrite() {

    //                      state                      //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserRole } = useUserStore();

    const [cookies] = useCookies();

    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    //                    function                    //
    const navigator = useNavigate();

    const postNoticeResponse = (result: ResponseDto | null) => {
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

    //                event handler                    //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const contents = event.target.value;
        if (contents.length > 1000) return;
        setContents(contents);
        if (contentsRef.current) {
            contentsRef.current.style.height = 'auto';
            contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
        }
    };

    const onPostButtonClickHandler = async () => {
        if (!title.trim() || !contents.trim()) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }
        if (!cookies.accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }

        let imageUrl = '';
        if (selectedFile) {
            imageUrl = await uploadFile(selectedFile);
        }
    
        const requestBody: PostNoticeBoardRequestDto = {
            title,
            contents,
            imageUrl
        };

        PostNoticeRequest(requestBody, cookies.accessToken).then(postNoticeResponse);
    };

    const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        }
    };

    //                    effect                       //
    useEffect(() => {
        if (loginUserRole === 'ROLE_USER') {
            navigator(NOTICE_LIST_ABSOLUTE_PATH);
        }
    }, [loginUserRole, navigator]);

    //                    Render                       //
    return (
        <div id="notice-write-wrapper">
            <div className='notice-write-top'>
                <div className='notice-write-title-box'>
                    <input
                        className='notice-write-title-input'
                        placeholder='제목을 입력해 주세요'
                        value={title}
                        onChange={onTitleChangeHandler}
                    />
                </div>
                <div className='primary-button' onClick={onPostButtonClickHandler}>
                    올리기
                </div>
            </div>
            <div className='notice-write-contents-box'>
                <textarea
                    ref={contentsRef}
                    className='qna-write-contents-textarea'
                    rows={10}
                    placeholder='내용을 입력해주세요 / 1000자'
                    maxLength={1000}
                    value={contents}
                    onChange={onContentsChangeHandler}
                />
                <div style={{ border: '1px solid rgba(238, 238, 238, 1)' }}></div>
                <div className='file-select'>
                    파일첨부
                    <input type="file" onChange={onFileChangeHandler} />
                </div>
                {imageUrl && (
                    <div className='file-upload'>
                        <img src={imageUrl} alt="Preview" className='file-image' />
                    </div>
                )}
            </div>
        </div>
    );
}
