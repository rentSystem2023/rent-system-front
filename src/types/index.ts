export interface BoardListItem {
    receptionNumber: number;
    status: boolean;
    title: string;
    writerId:string;
    writeDatetime: string;
    viewCount: number;
};

export interface UserListItem {
    userId: string;
    userName: string;
    userEmail: string;
    joinDate: string;
}

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

export interface CompanyListItem{
    companyCode : string;
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
