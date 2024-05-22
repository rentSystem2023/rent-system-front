import ResponseDto from "src/apis/response.dto";

// description: 업체 등록하기 Response Body DTO
export interface PostCompanyRequestDto {
    companyCode : number;
    rentCompany : string;
    address : string;
    owner : string;
    companyTelnumber : string;
    companyRule : string;
}

// description: 업체 수정하기 Response Body DTO
export interface PutCompanyRequestDto {
    companyCode : number;
    rentCompany : string;
    address : string;
    owner : string;
    companyTelnumber : string;
    companyRule : string;
}
