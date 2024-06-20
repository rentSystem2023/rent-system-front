import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { ADMIN_COMPANY_LIST_ABSOLUTE_PATH, ADMIN_COMPANY_UPDATE_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';
import { GetCompanyDetailResponseDto } from 'src/apis/company/dto/response';
import { deleteCompanyRequest, getCompanyDetailRequest } from 'src/apis/company';

    //                    component                    //
export default function CompanyDetail() {
    //                      state                      //
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

        const { rentCompany, address, owner, companyTelnumber, registDate, companyRule } = result as GetCompanyDetailResponseDto;

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

    //                event handler                    //
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

    //                    effect                       //
    useEffect(() => {
        if (!companyCode || !cookies.accessToken || loginUserRole !== 'ROLE_ADMIN') return navigator(MAIN_ABSOLUTE_PATH);

        getCompanyDetailRequest(companyCode, cookies.accessToken).then(getCompanyDetailResponse);
    }, []);

    //                    Render                        //
    return (
        <div id="admin-detail-wrapper">
        <div className="my-info-title">업체 정보 상세</div>
            <div className='admin-detail-main-box'>
                <div className='admin-datail-contents'>
                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap'>
                                <div className='admin-detail-title'>업체 고유번호</div>
                            </div>
                            <div className='admin-content-wrap'>
                                <div className='admin-detail-content'>{companyCode}</div>
                            </div>
                        </div>
                        
                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap'>
                                <div className='admin-detail-title'>업체명</div>
                            </div>
                            <div className='admin-content-wrap'>
                                <div className='admin-detail-content'>{rentCompany}</div>
                            </div>
                        </div>

                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap'>
                                <div className='admin-detail-title'>업체 주소</div>
                            </div>
                            <div className='admin-content-wrap'>
                                <div className='admin-detail-content'>{address}</div>
                            </div>
                        </div>

                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap'>
                                <div className='admin-detail-title'>담당자명</div>
                            </div>
                            <div className='admin-content-wrap'>
                                <div className='admin-detail-content'>{owner}</div>
                            </div>
                        </div>

                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap'>
                                <div className='admin-detail-title'>업체 전화번호</div>
                            </div>
                            <div className='admin-content-wrap'>
                                <div className='admin-detail-content'>{companyTelnumber}</div>
                            </div>
                        </div>

                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap'>
                                <div className='admin-detail-title'>업체 등록일</div>
                            </div>
                            <div className='admin-content-wrap'>
                                <div className='admin-detail-content'>{registDate}</div>
                            </div>
                        </div>

                        <div className='admin-contents-wrap date'>
                            <div className='admin-title-wrap rule'>
                                <div className='admin-detail-title'>업체 방침</div>
                            </div>
                            <div className='admin-content-wrap'>
                                <div className='admin-detail-content'>{companyRule}</div>
                            </div>
                        </div>
                    </div>
            </div>

            <div className='admin-button-box company'>
                <div className='primary-button list' onClick={onListClickHandler}>목록</div>
                <div className='admin-button-active'>
                    <div className='second-button update'onClick={onUpdateClickHandler}>수정</div>
                    <div className='error-button delete' onClick={onDeleteClickHandler}>삭제</div>
                </div>
            </div>
        </div>
    );
}