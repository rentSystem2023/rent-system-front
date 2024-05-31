import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { ADMIN_COMPANY_LIST_ABSOLUTE_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';
// import { getCompanyDetailRequest, updateCompanyRequest } from 'src/apis/company';
import { GetCompanyDetailResponseDto } from 'src/apis/company/dto/response';
import { PostCompanyRequestDto } from 'src/apis/company/dto/request';
import InputBox from 'src/components/Inputbox';

export default function CompanyDetail() {

//     //                    state                    //
//     const contentsRef = useRef<HTMLTextAreaElement | null>(null);
//     const { loginUserRole } = useUserStore();
//     const [cookies] = useCookies();
//     const [companyCode, setCompanyCode] = useState<number | string>('');
//     const [rentCompany, setRentCompany] = useState<string>('');
//     const [address, setAddress] = useState<string>('');
//     const [owner, setOwner] = useState<string>('');
//     const [companyTelnumber, setCompanyTelnumber] = useState<string>('');
//     const [companyRule, setCompanyRule] = useState<string>('');
//     const { companyId } = useParams<{ companyId: string }>();
//     const navigator = useNavigate();

//     //                    function                    //
//     const getCompanyDetailResponse = (result: GetCompanyDetailResponseDto | ResponseDto | null) => {
//         if (!result || result.code !== 'SU') {
//         alert(result ? result.message : '서버에 문제가 있습니다.');
//         return;
//         }
//     const { company } = result as GetCompanyDetailResponseDto;
//     setCompanyCode(company.companyCode);
//     setRentCompany(company.rentCompany);
//     setAddress(company.address);
//     setOwner(company.owner);
//     setCompanyTelnumber(company.companyTelnumber);
//     setCompanyRule(company.companyRule);
//     };

//     const updateCompanyResponse = (result: ResponseDto | null) => {
//         const message =
//         !result ? '서버에 문제가 있습니다.' :
//             result.code === 'VF' ? '내용을 모두 입력해주세요.' :
//             result.code === 'AF' ? '권한이 없습니다.' :
//                 result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

//     if (!result || result.code !== 'SU') {
//         alert(message);
//         return;
//     }
//     navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
//     };

//     //                    event handler                    //
//     const onCompanyCodeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//         const companyCode = event.target.value;
//         setCompanyCode(companyCode);
//     };

//     const onRentCompanyChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//         const rentCompany = event.target.value;
//         setRentCompany(rentCompany);
//     };

//     const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//         const address = event.target.value;
//         setAddress(address);
//     };

//     const onOwnerChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//         const owner = event.target.value;
//         setOwner(owner);
//     };

//     const onCompanyTelnumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//         const companyTelnumber = event.target.value;
//         setCompanyTelnumber(companyTelnumber);
//     };

//     const onCompanyRuleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
//         const companyRule = event.target.value;
//         setCompanyRule(companyRule);
//     };

//     const onUpdateButtonClickHandler = () => {
//         if (!cookies.accessToken) {
//         alert('권한이 없습니다.');
//         return;
//         }
//         if (!companyCode || !rentCompany || !address || !owner || !companyTelnumber) {
//         alert('필드를 채워주세요.');
//         return;
//         }
//         const requestBody: PostCompanyRequestDto = {
//         companyCode,
//         rentCompany,
//         address,
//         owner,
//         companyTelnumber,
//         companyRule
//         };

//         updateCompanyRequest(companyId, requestBody, cookies.accessToken).then(updateCompanyResponse);
//     };

//   // Effect
//   useEffect(() => {
//     if (!cookies.accessToken || !companyId) return;
//     getCompanyDetailRequest(companyId, cookies.accessToken).then(getCompanyDetailResponse);
//   }, [companyId]);

  // Render
  return (
    <div id="registration-wrapper">
      <div className='registration-container'>
        <h2>업체 상세</h2>
        {/* <div className="registration-form-box">
                    <InputBox label="업체코드" type="text" value={companyCode} onChangeHandler={onCompanyCodeChangeHandler} />
                    <InputBox label="업체명" type="text" value={rentCompany} onChangeHandler={onRentCompanyChangeHandler} />
                    <InputBox label="주소" type="text" value={address} onChangeHandler={onAddressChangeHandler} />
                    <InputBox label="담당자" type="text" value={owner} onChangeHandler={onOwnerChangeHandler} />
                    <InputBox label="연락처" type="text" value={companyTelnumber} onChangeHandler={onCompanyTelnumberChangeHandler} />
                </div>
        <button type="submit" className="submit-button" onClick={onUpdateButtonClickHandler}>수정</button> */}
      </div>
    </div>
  );
}