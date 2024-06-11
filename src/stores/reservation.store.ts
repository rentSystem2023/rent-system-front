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
    address: '제주특별자치도 제주시 공항로 2 (용담2동)',
    reservationStart: getYYYYMMDD(new Date()),
    reservationEnd: getYYYYMMDD(new Date()),
    setAddress: (address: string) => set(state => ({ ...state, address })),
    setReservationStart: (reservationStart: string) => set(state => ({ ...state, reservationStart })),
    setReservationEnd: (reservationEnd: string) => set(state => ({ ...state, reservationEnd })),
}));

export default useReservationStore;