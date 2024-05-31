export interface UserListItem {
    userId: string;
    userName: string;
    userEmail: string;
    joinDate: string;
}

export interface CompanyListItem{
    companyCode : number;
    rentCompany : string;
    address : string;
    owner : string;
    companyTelnumber : string;
    registDate : string;
}

export interface noticeListItem{
    registNumber : number;
    title : string;
    writeDatetime : string;
    viewCount : number;
}

export interface QnaListItem {
    receptionNumber: number;
    writeDatetime : string;
    title : string;
    writerId : string;
    viewCount : number;
    category : string;
    publicState : boolean;
    status : string;
    contents : string;
};

export interface QnaMyListItem {
    receptionNumber: number;
    status: boolean;
    title: string;
    writerId:string;
    writeDatetime: string;
    viewCount: number;
};

export interface PopularCarListItem {
    carImageUrl: string;
    carName: string;
}

export interface PriceListItem {
    carImageUrl : string;
    carName : string;
    fuelType : string;
    insuranceType : string;
    normalPrice : number;
    luxuryPrice : number;
    superPrice : number;
    carRentCompany : string;
    reservationCount : string;
    carYear : string;
}

export interface ReservationListItem{
    carImageUrl : string;
    userId : string;
    userName : string;
    companyCode : string;
    carNumber : string;
    reservationDate : string;
    reservationState : string;
    reservationPeriod : string;
}