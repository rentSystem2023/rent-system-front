import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { ADMIN_COMPANY_LIST_ABSOLUTE_PATH, ADMIN_COMPANY_REGIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH } from 'src/constant';
import { Cookies, useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';
import { postCompanyRequest } from 'src/apis/company';
import { PostCompanyRequestDto } from 'src/apis/company/dto/request';
import InputBox from 'src/components/Inputbox';

export default function CompanyRegist() {

    //                      state                      //
    const [cookies] = useCookies();
    const {loginUserRole} = useUserStore();
    
    const [companyCode, setCompanyCode] = useState<number | string>('');
    const [rentCompany, setRentCompany] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [owner, setOwner] = useState<string>('');
    const [companyTelnumber, setCompanyTelnumber] = useState<string>('');
    const [companyRule, setCompanyRule] = useState<string>('');
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);

    //                    function                     //
    const navigator = useNavigate();

    const registCompanyResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '내용을 올바르게 입력해주세요.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }
        navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
    };

    //                event handler                    //
    const onCompanyCodeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const companyCode = event.target.value;
        setCompanyCode(companyCode)
    };

    const onRentCompanyChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const rentCompany = event.target.value;
        setRentCompany(rentCompany)
    };

    const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const address = event.target.value;
        setAddress(address);
    };

    const onOwnerChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const owner = event.target.value;
        setOwner(owner);
    };

    const onCompanyTelnumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const companyTelnumber = event.target.value;
        setCompanyTelnumber(companyTelnumber);
    };

    const onCompanyRuleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const companyRule = event.target.value;
        setCompanyRule(companyRule);
    };

    const onRegistButtonClickHandler = () => {
        if (!cookies.accessToken) {
            alert('권한이 없습니다.');
            return;
        }
        if (!companyCode || !rentCompany || !address || !owner || !companyTelnumber) {
            alert('필드를 채워주세요.');
            return;
        }
        const requestBody: PostCompanyRequestDto = {
            companyCode,
            rentCompany,
            address,
            owner,
            companyTelnumber,
            companyRule
        }

        postCompanyRequest(requestBody, cookies.accessToken).then(registCompanyResponse);
    };

    //                    effect                       //
        useEffect(() => {
            if (!cookies.accessToken || loginUserRole !== 'ROLE_ADMIN') return navigator(MAIN_ABSOLUTE_PATH);

        }, []);

    //                    Render                        //
    return (
        <div id="admin-detail-wrapper">
        <div className="my-info-title">업체 정보 등록</div>
            <div className='admin-detail-main-box company'>
                <div className='admin-datail-contents'>
                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap'>
                                <div className='admin-detail-title'>업체 고유번호</div>
                            </div>
                            <div className='admin-content-wrap company'>
                                <InputBox 
                                    type="text" 
                                    value={companyCode} 
                                    onChangeHandler={onCompanyCodeChangeHandler} 
                                />
                            </div>
                        </div>
                        
                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap'>
                                <div className='admin-detail-title'>업체명</div>
                            </div>
                            <div className='admin-content-wrap company'>
                                <InputBox 
                                    type="text"
                                    value={rentCompany} 
                                    onChangeHandler={onRentCompanyChangeHandler} 
                                />
                            </div>
                        </div>

                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap'>
                                <div className='admin-detail-title'>업체 주소</div>
                            </div>
                            <div className='admin-content-wrap company'>
                            <InputBox 
                                type="text" 
                                value={address} 
                                onChangeHandler={onAddressChangeHandler} 
                            />

                            </div>
                        </div>

                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap'>
                                <div className='admin-detail-title'>담당자명</div>
                            </div>
                            <div className='admin-content-wrap company'>
                            <InputBox
                                type="text" 
                                value={owner} 
                                onChangeHandler={onOwnerChangeHandler} 
                            />

                            </div>
                        </div>

                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap'>
                                <div className='admin-detail-title'>업체 전화번호</div>
                            </div>
                            <div className='admin-content-wrap company'>
                            <InputBox 
                                type="text" 
                                value={companyTelnumber} 
                                onChangeHandler={onCompanyTelnumberChangeHandler} 
                            />
                            
                            </div>
                        </div>

                        <div className='admin-contents-wrap rule'>
                            <div className='admin-title-wrap rule'>
                                <div className='admin-detail-title'>영업 방침</div>
                            </div>
                            <div className="company-rule-box-wrap">
                                <div className='company-rule-box'>
                                <textarea 
                                        ref={contentsRef}
                                        className='company-textarea'
                                        rows={10} 
                                        placeholder='내용을 입력해주세요/ 1000자' 
                                        maxLength={1000}
                                        onChange={onCompanyRuleChangeHandler} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            
            <div className="company-update-button-box">
            <div className="primary-button comup" onClick={onRegistButtonClickHandler}>등록</div>
            </div>
        </div>
    );
}