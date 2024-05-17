import ResponseDto from "src/apis/response.dto";

// description: 업체 등록하기 Response Body DTO
export interface PostRegistcompanyRequestDto {
    rentCompany : string;
    address : string;
    owner : string;
    companyTelnumber : string;
    companyRule : string;
}

// description: 업체 수정하기 Response Body DTO
export interface PatchcompanyRequestDto {
    rentCompany : string;
    address : string;
    owner : string;
    companyTelnumber : string;
    companyRule : string;
}
