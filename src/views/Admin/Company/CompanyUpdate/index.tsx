import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { PutCompanyRequest, getCompanyDetailRequest } from "src/apis/company";
import { PutCompanyRequestDto } from "src/apis/company/dto/request";
import { GetCompanyDetailResponseDto, GetCompanyListResponseDto } from "src/apis/company/dto/response";
import ResponseDto from "src/apis/response.dto";
import InputBox from "src/components/Inputbox";
import { ADMIN_COMPANY_DETAIL_ABSOLUTE_PATH, ADMIN_COMPANY_LIST_ABSOLUTE_PATH } from "src/constant";
import { useUserStore } from "src/stores";


//                    component                    //
export default function CompanyUpdate() {

    //                              state                              //
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const { companyCode} = useParams();
    const [rentCompany, setRentCompany] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [owner, setOwner] = useState<string>('');
    const [companyTelnumber, setCompanyTelnumber] = useState<string>('');
    const [companyRule, setCompanyRule] = useState<string>('');

    //                    function                    //
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

        const { companyCode, rentCompany, address, owner, companyTelnumber, companyRule } = result as GetCompanyDetailResponseDto;
        if (loginUserRole !== 'ROLE_ADMIN') {
            alert('권한이 없습니다.');
            navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
            return;
        }


        setRentCompany(rentCompany);
        setAddress(address);
        setOwner(owner);
        setCompanyTelnumber(companyTelnumber);
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

    //                              event Handler                              //
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


    //                    effect                    //
    useEffect(() => {
        if (!companyCode || !cookies.accessToken) return;
        if (!loginUserRole) return;
        if (loginUserRole !== 'ROLE_ADMIN') {
            navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
            return;
        }
        getCompanyDetailRequest(companyCode, cookies.accessToken).then(registCompanyResponse);
    }, [companyCode, cookies.accessToken, loginUserRole]);


    //                    render                    //
    return (
        <div id="registration-wrapper">
            <div className='registration-container'>
                <h2>업체 등록</h2>
                <div className="registration-form-box">
                    <div>업체코드</div>
                    <div>{companyCode}</div>
                    <InputBox label="업체명" type="text" value={rentCompany} onChangeHandler={onRentCompanyChangeHandler} />
                    <InputBox label="주소" type="text" value={address} onChangeHandler={onAddressChangeHandler} />
                    <InputBox label="담당자" type="text" value={owner} onChangeHandler={onOwnerChangeHandler} />
                    <InputBox label="연락처" type="text" value={companyTelnumber} onChangeHandler={onCompanyTelnumberChangeHandler} />
                </div>
                <div className="registration-form-box">
                    <label className='registration-label'>영업방침:</label>
                    <textarea className="companyRule" value={companyRule} onChange={onCompanyRuleChangeHandler} />
                </div>
                <button type="submit" className="submit-button" onClick={onUpdateButtonClickHandler} >수정</button>
            </div>
        </div>
    );
}