import { ChangeEvent, useEffect, useRef, useState } from "react";
import './style.css';
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { PutCompanyRequest, getCompanyDetailRequest } from "src/apis/company";
import { PutCompanyRequestDto } from "src/apis/company/dto/request";
import { GetCompanyDetailResponseDto, GetCompanyListResponseDto } from "src/apis/company/dto/response";
import ResponseDto from "src/apis/response.dto";
import InputBox from "src/components/Inputbox";
import { ADMIN_COMPANY_DETAIL_ABSOLUTE_PATH, ADMIN_COMPANY_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH } from "src/constant";
import { useUserStore } from "src/stores";

    //                    component                    //
export default function CompanyUpdate() {
    //                      state                      //
    const { loginUserRole } = useUserStore();
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const [cookies] = useCookies();
    const { companyCode } = useParams();
    const [rentCompany, setRentCompany] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [owner, setOwner] = useState<string>('');
    const [companyTelnumber, setCompanyTelnumber] = useState<string>('');
    const [registDate, setRegistDate] = useState<string>('');
    const [companyRule, setCompanyRule] = useState<string>('');

    //                    function                     //
    const navigator = useNavigate();

    const registCompanyResponse = (result: GetCompanyListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '내용을 올바르게 입력해주세요.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'NC' ? '존재하지 않는 업체입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
            return;
        }

        const { rentCompany, address, owner, companyTelnumber, registDate, companyRule } = result as GetCompanyDetailResponseDto;
        if (loginUserRole !== 'ROLE_ADMIN') {
            alert('권한이 없습니다.');
            navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
            return;
        }

        setRentCompany(rentCompany);
        setAddress(address);
        setOwner(owner);
        setCompanyTelnumber(companyTelnumber);
        setRegistDate(registDate);
        setCompanyRule(companyRule);
    };

    const putCompanyResponse = (result: ResponseDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '내용을 올바르게 입력해주세요.' :
        result.code === 'AF' ? '권한이 없습니다.' :
        result.code === 'NC' ? '존재하지 않는 업체입니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!companyCode) return;
        navigator(ADMIN_COMPANY_DETAIL_ABSOLUTE_PATH(companyCode));
    };

    //                event handler                    //
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

    const onUpdateButtonClickHandler = () => {
        if (!cookies.accessToken || !companyCode) return;
    
        const requestBody: PutCompanyRequestDto = { companyCode, rentCompany, address, owner, companyTelnumber, companyRule  };
        PutCompanyRequest(companyCode, requestBody, cookies.accessToken).then(putCompanyResponse); 
        
    };

    //                    effect                       //
    useEffect(() => {
        if (!companyCode || !cookies.accessToken) return navigator(MAIN_ABSOLUTE_PATH) ;
        if (!loginUserRole) return;
        if (loginUserRole !== 'ROLE_ADMIN') {
            navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);

            return;
        }
        getCompanyDetailRequest(companyCode, cookies.accessToken).then(registCompanyResponse);
    }, [companyCode, cookies.accessToken, loginUserRole]);

    //                    Render                        //
    return (
        <div id="admin-detail-wrapper">
        <div className="my-info-title">업체 정보 수정</div>
            <div className='admin-detail-main-box company'>
                <div className='admin-datail-contents'>
                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap comnum'>
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
                            <div className='admin-content-wrap company'>
                                <InputBox 
                                    type="text" 
                                    value={rentCompany} 
                                    onChangeHandler={onAddressChangeHandler} 
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

                        <div className='admin-contents-wrap'>
                            <div className='admin-title-wrap'>
                                <div className='admin-detail-title'>업체 등록일</div>
                            </div>
                            <div className='admin-content-wrap'>
                                <div className='admin-detail-content'>{registDate}</div>
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
                                        value={companyRule} 
                                        onChange={onCompanyRuleChangeHandler} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            
            <div className="company-update-button-box">
                <div className="primary-button comup" onClick={onUpdateButtonClickHandler}>수정</div>
            </div>
        </div>
    );
}