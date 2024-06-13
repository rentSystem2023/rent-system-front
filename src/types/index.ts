export interface UserListItem {
    userId: string;
    nickName: string;
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
    companyRule : string | null;
}

export interface noticeListItem{
    registNumber : number;
    title : string;
    writeDatetime : string;
    viewCount : number;
    writerId : string;
    imageUrl : string;
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

export interface ReservationCarPriceListItem {
    carName : string;
    carImageUrl : string;
    fuelType : string;
    rentCompany : string;
    reservationCount : number;
    address : string;
    normalPrice : number;
    luxuryPrice : number;
    superPrice : number;
}

// 나의 문의내역
export interface MyReservationListItem{
    carImageUrl : string;
    nickName : string;
    reservationDate : string;
    reservationCode : string;
    rentCompany : string;
    reservationStart: string;
    reservationEnd: string;
    reservationState: string;
}

export interface ReservationCancelListItem{
    userId : string;
    reservationState : string;
}

export interface ReservationCarListItem{
    carName : string;
    carImageUrl : string;
    normalPrice : number;
    luxuryPrice : number;
    superPrice : number;
}

export interface ReservationCarViewListItem{
    carName : string;
    carImageUrl : string;
    highNormalPrice : number;
    lowNormalPrice : number;
    highLuxuryPrice : number;
    lowLuxuryPrice : number;
    highSuperPrice : number;
    lowSuperPrice : number;
}


export interface ReservationCarPriceListItem{
    carName : string;
    carImageUrl : string;
    fuelType : string;
    rentCompany : string;
    reservationCount : number;
    carYear : string;
    normalPrice : number;
    luxuryPrice : number;
    superPrice : number;
}

export interface ReservationUserListItem{
    reservationCode : number;
    rentCompany : string;
    carName : string;
    carNumber : string;
    reservationStart : string;
    reservationEnd : string;
    userId : string;
    nickName : string;
    reservationState : string;
}