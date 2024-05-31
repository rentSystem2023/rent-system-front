import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';

import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { ADMIN_COMPANY_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';
import { GetCompanyDetailResponseDto } from 'src/apis/company/dto/response';
import { PostCompanyRequestDto } from 'src/apis/company/dto/request';
import { getCompanyDetailRequest } from 'src/apis/company';

//                    component                    //
export default function CompanyDetail() {

    //                    state                    //
    const { loginUserRole } = useUserStore();
    // const { companyCode } = useParams();

    const [cookies] = useCookies();
    const [companyCode, setCompanyCode] = useState<number | string>('');
    const [rentCompany, setRentCompany] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [owner, setOwner] = useState<string>('');
    const [companyTelnumber, setCompanyTelnumber] = useState<string>('');
    const [registDate, setRegistDate] = useState<string>('');
    const [companyRule, setCompanyRule] = useState<string | null>('');



    //                    function                    //
    const navigator = useNavigate();

    const getCompanyDetailResponse = (result: GetCompanyDetailResponseDto | ResponseDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '잘못된 고유번호입니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'NB' ? '존재하지 않는 고유번호입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(MAIN_ABSOLUTE_PATH);
                return;
            }
        }

        const { companyCode, rentCompany, address, owner, companyTelnumber, registDate, companyRule } = result as GetCompanyDetailResponseDto;

        setCompanyCode(companyCode);
        setRentCompany(rentCompany);
        setAddress(address);
        setOwner(owner);
        setCompanyTelnumber(companyTelnumber);
        setRegistDate(registDate);
        setCompanyRule(companyRule);
    };

    const updateCompanyResponse = (result: ResponseDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '내용을 모두 입력해주세요.' :
            result.code === 'AF' ? '권한이 없습니다.' :
                result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

    if (!result || result.code !== 'SU') {
        alert(message);
        return;
    }
    navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
    };

    //                    event handler                    //


    //                    effect                    //
    useEffect(() => {
        if (!cookies.accessToken) return;
        if (!loginUserRole) return;
        if (loginUserRole !== 'ROLE_ADMIN') {
            navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
            return;
        }
        getCompanyDetailRequest(cookies.accessToken).then(getCompanyDetailResponse);
    }, [loginUserRole]);


    // Render
    return (
    <div id="company-detail-wrapper">
        <div className='company-detail-container'>
            <h2>업체 현황</h2>
                <div className="company-detail-box">
                        <div>{companyCode}</div>
                        <div>{rentCompany}</div>
                        <div>{address}</div>
                        <div>{owner}</div>
                        <div>{companyTelnumber}</div>
                        <div>{registDate}</div>
                        <div>{companyRule}</div>
                </div>
                <div className='second-button'>수정</div>
                <div className='error-button'>삭제</div>
        </div>
    </div>
    );
}