import ResponseDto from "src/apis/response.dto";
import { CompanyListItem } from "src/types";

// description: 업체 전체 리스트 불러오기 Response Body DTO
export interface GetCompanyListResponseDto extends ResponseDto{
    companyList : CompanyListItem[];
}

// description: 업체 상세 불러오기 Response Body DTO
export interface GetCompanyDetailResponseDto extends ResponseDto{
    companyCode : number | string;
    rentCompany : string;
    address : string;
    owner : string;
    companyTelnumber : string;
    registDate : string;
    companyRule : string;
}

// description: 업체 검색 리스트 불러오기 Response Body DTO
export interface GetSearchCompanyListResponseDto extends ResponseDto {
    companyList : CompanyListItem[];
}