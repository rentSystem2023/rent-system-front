import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';

import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { ADMIN_COMPANY_LIST_ABSOLUTE_PATH, ADMIN_COMPANY_UPDATE_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';
import { GetCompanyDetailResponseDto } from 'src/apis/company/dto/response';
import { PostCompanyRequestDto } from 'src/apis/company/dto/request';
import { deleteCompanyRequest, getCompanyDetailRequest } from 'src/apis/company';

//                    component                    //
export default function CompanyDetail() {

    //                    state                    //
    const { loginUserRole } = useUserStore();
    const { companyCode } = useParams();

    const [cookies] = useCookies();
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
        result.code === 'VF' ? '잘못된 업체 번호입니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'NC' ? '존재하지 않는 업체입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(MAIN_ABSOLUTE_PATH);
                return;
            }
        }

        const { companyCode, rentCompany, address, owner, companyTelnumber, registDate, companyRule } = result as GetCompanyDetailResponseDto;
        // setCompanyCode(companyCode);
        setRentCompany(rentCompany);
        setAddress(address);
        setOwner(owner);
        setCompanyTelnumber(companyTelnumber);
        setRegistDate(registDate);
        setCompanyRule(companyRule);
    };

    const deleteBoardResponse = (result: ResponseDto | null) => {

        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'VF' ? '올바르지 않은 업체입니다.' :
        result.code === 'NC' ? '존재하지 않는 업체입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU'){
            alert(message);
            return;
        }

        navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
    };

    //                    event handler                    //
    const onListClickHandler = () => {
        navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
    }

    const onUpdateClickHandler = () => {
        if (!companyCode || loginUserRole !== 'ROLE_ADMIN' ) return;
        navigator(ADMIN_COMPANY_UPDATE_ABSOLUTE_PATH(companyCode));
    }

    const onDeleteClickHandler = () => {
        if (!companyCode || loginUserRole !== 'ROLE_ADMIN' || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteCompanyRequest(companyCode, cookies.accessToken) 
        .then(deleteBoardResponse)
    }


    //                    effect                    //
    useEffect(() => {
        if (!companyCode || !cookies.accessToken) return;

        getCompanyDetailRequest(companyCode, cookies.accessToken).then(getCompanyDetailResponse);
    }, []);


    //                    render                    //
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
                <div className='primary-button' onClick={onListClickHandler}>목록보기</div>
                <div className='second-button'onClick={onUpdateClickHandler}>수정</div>
                <div className='error-button' onClick={onDeleteClickHandler}>삭제</div>
        </div>
    </div>
    );
}