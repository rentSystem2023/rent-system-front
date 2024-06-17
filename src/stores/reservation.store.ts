import { create } from 'zustand';
import { getYYYYMMDD } from 'src/utils';
import { ReservationCarViewListItem } from 'src/types';

interface ReservationStore {
    address: string;
    reservationStart: string;
    reservationEnd: string;
    selectedCar: ReservationCarViewListItem | null;
    selectedInsurance: string;
    selectedRentCompany: string;
    selectedAddress: string;

    setAddress: (address: string) => void;
    setReservationStart: (reservationStart: string) => void;
    setReservationEnd: (reservationEnd: string) => void;
    setSelectedCar: (selectedCar: ReservationCarViewListItem) => void;
    setSelectedInsurance: (selectedInsurance: string) => void;
    setSelectedRentCompany: (selectedRentCompany: string) => void;
    setSelectedAddress: (selectedAddress: string) => void;
}

const useReservationStore = create<ReservationStore>(set => ({
    address: '',
    reservationStart: getYYYYMMDD(new Date(new Date().setDate(new Date().getDate() + 1))),
    reservationEnd: getYYYYMMDD(new Date(new Date().setDate(new Date().getDate() + 2))),
    selectedCar: null,
    selectedInsurance: '',
    selectedRentCompany: '',
    selectedAddress: '',

    setAddress: (address: string) => set(state => ({ ...state, address })),
    setReservationStart: (reservationStart: string) => set(state => ({ ...state, reservationStart })),
    setReservationEnd: (reservationEnd: string) => set(state => ({ ...state, reservationEnd })),
    setSelectedCar: (selectedCar: ReservationCarViewListItem) => set(state => ({ ...state, selectedCar })),
    setSelectedInsurance: (selectedInsurance: string) => set(state => ({ ...state, selectedInsurance })),
    setSelectedRentCompany: (selectedRentCompany: string) => set(state => ({ ...state, selectedRentCompany })),
    setSelectedAddress: (selectedAddress: string) => set(state => ({ ...state, selectedAddress })),
}));

export default useReservationStore;