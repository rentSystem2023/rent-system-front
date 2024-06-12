import { getYYYYMMDD } from 'src/utils';
import { create } from 'zustand';

interface ReservationStore {
    address: string;
    reservationStart: string;
    reservationEnd: string;
    setAddress: (address: string) => void;
    setReservationStart: (reservationStart: string) => void;
    setReservationEnd: (reservationEnd: string) => void;
};

const useReservationStore = create<ReservationStore>(set => ({
    address: '제주국제공항',
    reservationStart: getYYYYMMDD(new Date()),
    reservationEnd: getYYYYMMDD(new Date()),
    setAddress: (address: string) => set(state => ({ ...state, address })),
    setReservationStart: (reservationStart: string) => set(state => ({ ...state, reservationStart })),
    setReservationEnd: (reservationEnd: string) => set(state => ({ ...state, reservationEnd })),
}));

export default useReservationStore;