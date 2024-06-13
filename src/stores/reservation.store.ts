import { ReservationCarViewListItem } from 'src/types';
import { getYYYYMMDD } from 'src/utils';
import { create } from 'zustand';

interface ReservationStore {
    address: string;
    reservationStart: string;
    reservationEnd: string;
    selectedCar: ReservationCarViewListItem | null;
    selectedInsurance: string;

    selectedRentCompany: string;

    setAddress: (address: string) => void;
    setReservationStart: (reservationStart: string) => void;
    setReservationEnd: (reservationEnd: string) => void;
    setSelectedCar: (selectedCar: ReservationCarViewListItem) => void;
    setSelectedInsurance: (selectedInsurance: string) => void;

    setSelectedRentCompany:(selectedRentCompany:string)=> void;
};

const useReservationStore = create<ReservationStore>(set => ({
    address: '제주국제공항',
    reservationStart: getYYYYMMDD(new Date()),
    reservationEnd: getYYYYMMDD(new Date()),
    selectedCar: null,
    selectedInsurance: '',
    selectedRentCompany: '',
    setAddress: (address: string) => set(state => ({ ...state, address })),
    setReservationStart: (reservationStart: string) => set(state => ({ ...state, reservationStart })),
    setReservationEnd: (reservationEnd: string) => set(state => ({ ...state, reservationEnd })),
    setSelectedCar: (selectedCar: ReservationCarViewListItem) => set(state => ({ ...state, selectedCar })),
    setSelectedInsurance: (selectedInsurance: string) => set(state => ({ ...state, selectedInsurance })),
    setSelectedRentCompany: (selectedRentCompany: string) => set(state => ({ ...state, selectedRentCompany })),
}));

export default useReservationStore;
