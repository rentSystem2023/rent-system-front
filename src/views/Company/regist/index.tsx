import React, { ChangeEvent, useRef, useState } from 'react'
import './style.css';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { ADMIN_COMPANY_REGIST_ABSOLUTE_PATH } from 'src/constant';
import { Cookies, useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';
import { postCompanyRequest } from 'src/apis/company';
import { PostCompanyRequestDto } from 'src/apis/company/dto/request';

export default function CompanyRegist() {

    //                              state                              //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [rentCompany, setRentCompany] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [owner, setOwner] = useState<string>('');
    const [companyTelnumber, setCompanyTelnumber] = useState<string>('');
    const [companyRule, setCompanyRule] = useState<string>('');

    //                              function                              //
    const navigator = useNavigate();

    const registCompanyResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'VF' ? '내용을 모두 입력해주세요.' :
                    result.code === 'AF' ? '권한이 없습니다.' :
                        result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }
        navigator(ADMIN_COMPANY_REGIST_ABSOLUTE_PATH);
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

    // const onRegistButtonClickHandler = () => {
    //     if (!Cookies.accessToken) return;

        // const requestBody: PostCompanyRequestDto = {
        //      companyCode,
        //     rentCompany,
        //     address,
        //     owner,
        //     companyTelnumber,
        //     companyRule
        // }

    //     postCompanyRequest(requestBody, cookies.accessToken).then(registCompanyResponse);
    // };


    // Render
    return (
        <div className="registration-container">
            <h2>업체 등록</h2>
            <form className="registration-form" >
                <div className="form-group">
                    <label htmlFor="rentCompany">업체명:</label>
                    <input
                      type="text"
                      id="rentCompany"
                      value={rentCompany}
                      onChange={onRentCompanyChangeHandler}
                      required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">주소:</label>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={onAddressChangeHandler}
                      required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="owner">담당자:</label>
                    <input
                      type="text"
                      id="owner"
                      value={owner}
                      onChange={onOwnerChangeHandler}
                      required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="companyTelnumber">연락처:</label>
                    <input
                      type="tel"
                      id="companyTelnumber"
                      value={companyTelnumber}
                      onChange={onCompanyTelnumberChangeHandler}
                      required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="companyRule">영업방침:</label>
                    <textarea
                      id="companyRule"
                      value={companyRule}
                      onChange={onCompanyRuleChangeHandler}
                      required
                    />
                </div>
                <button type="submit" className="submit-button">등록</button>
            </form>
        </div>
    );
  }