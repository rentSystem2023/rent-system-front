import { useEffect, useState } from 'react'
import './style.css'
import SelectContainer from 'src/layouts/SelectContainer';
import { ReservationCarPriceListItem } from 'src/types';
import { GetSearchReservationCarPriceListResponseDto } from 'src/apis/reservation/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { useNavigate } from 'react-router';
import { useReservationStore } from 'src/stores/car.reservation.store';
import { getSearchReservationCarPriceListRequest } from 'src/apis/reservation';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_ABSOLUTE_PATH, RESERVATION_REQUEST_ABSOLUTE_PATH } from 'src/constant';
import { usePagination } from 'src/hooks';

//                    component                    //
function ListItem({
	rentCompany,
	carYear,
	address,
	normalPrice,
	luxuryPrice,
	superPrice,
}: ReservationCarPriceListItem) {

	//                      state                      //
	const selectedInsurance = useReservationStore(state => state.selectedInsurance);
	const { reservationStart, reservationEnd } = useReservationStore();

	//                    function                     //
	const navigator = useNavigate();

	const onClickHandler = () => navigator(RESERVATION_REQUEST_ABSOLUTE_PATH(rentCompany));

	//                    Render                       //
	const krw = (price: number) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);

	const calculateDateDifference = (start: string, end: string) => {
		const startDate = new Date(start);
		const endDate = new Date(end);
		const timeDifference = endDate.getTime() - startDate.getTime();
		const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
		return dayDifference;
	};

	const daysDifference = calculateDateDifference(reservationStart, reservationEnd);

	const insurancePrice =
		selectedInsurance === 'normal' && normalPrice ? `${krw(normalPrice * daysDifference)}` :
		selectedInsurance === 'luxury' && luxuryPrice ? `${krw(luxuryPrice * daysDifference)}` :
		selectedInsurance === 'super' && superPrice ? `${krw(superPrice * daysDifference)}` : '';

	return (
		<>
			<div className='insurance-list-container' onClick={onClickHandler}>
				<div className='insurance-info-wrap'>
					<div className='insurance-info-title-container'>
						<div className='insurance-info-title'>업체명</div>
						<div className='qna-detail-info-divider'>{'\|'}</div>
						<div className='insurance-info-contents'>{rentCompany}</div>
					</div>
					<div className='insurance-info-title-container'>
						<div className='insurance-info-title'>연식</div>
						<div className='qna-detail-info-divider'>{'\|'}</div>
						<div className='insurance-info-contents'>{carYear}</div>
					</div>
				</div>
				<div style={{ border: '1px solid rgba(238, 238, 238, 1)' }}></div>
				<div className='insurance-info-wrap'>
					<div className='insurance-info-title-container'>
						<div className='insurance-info-title'>주소</div>
						<div className='qna-detail-info-divider'>{'\|'}</div>
						<div className='insurance-info-contents'>{address}</div>
					</div>
					<div className='insurance-info-title-container'>
						<div className='insurance-info-title'>가격</div>
						<div className='qna-detail-info-divider'>{'\|'}</div>
						<div className='insurance-info-contents'>{insurancePrice}</div>
					</div>
				</div>
			</div>
		</>
	);
}

//                    component                    //
export default function InsuranceSelect() {

	//                      state                      //
	const { address, reservationStart, reservationEnd, selectedCar, selectedInsurance } = useReservationStore();

	const {
		viewList,
		pageList,
		currentPage,
		setCurrentPage,
		setCurrentSection,
		changeBoardList,
		onPageClickHandler,
		onPreSectionClickHandler,
		onNextSectionClickHandler
	} = usePagination<ReservationCarPriceListItem>(COUNT_PER_PAGE, COUNT_PER_SECTION);

	//                    function                     //
	const navigator = useNavigate();

	const getCompanyListResponse = (result: GetSearchReservationCarPriceListResponseDto | ResponseDto | null) => {
		const message =
			!result ? '서버에 문제가 있습니다.' :
			result.code === 'VF' ? '잘못된 접수번호입니다.' :
			result.code === 'AF' ? '인증에 실패했습니다.' :
			result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
			result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

		if (!result || result.code !== 'SU') {
			alert(message);
		}

		const { reservationCarPriceList } = result as GetSearchReservationCarPriceListResponseDto;

		setCurrentPage(!reservationCarPriceList.length ? 0 : 1);
		setCurrentSection(!reservationCarPriceList.length ? 0 : 1);
		changeBoardList(reservationCarPriceList);
	};

	//                    effect                       //
	useEffect(() => {
		if (!selectedCar) {
			navigator(MAIN_ABSOLUTE_PATH)
			return;
		}
		getSearchReservationCarPriceListRequest(address, reservationStart, reservationEnd, selectedCar.carName).then(getCompanyListResponse);
	}, [selectedCar]);

	if (!selectedCar) return <></>;


	//                    Render                       //
	const insuranceType =
	selectedInsurance === 'normal' ? '완전자차' :
	selectedInsurance === 'luxury' ? '고급자차' :
	selectedInsurance === 'super' ? '슈퍼자차' : '';

	return (
		<div id='user-page-wrapper'>
			<div className='reservation-select-container'>{<SelectContainer />}</div>
			<div className='insurance-wrapper'>
				<div className='select-car-info'>
					<div className='select-car-info-image'>
						<img
							style={{ width: '200%', height: '120%' }}
							src={selectedCar.carImageUrl}
						/>
					</div>
					<div className='select-car-info-list'>
						<div className='select-info-wrap'>
							<div className='select-info'>차량명</div>
							<div className='qna-detail-info-divider'>{'\|'}</div>
							<div className='selecet-info-cotents'>{selectedCar.carName}</div>
						</div>
						<div className='select-info-wrap'>
							<div className='select-info'>보험</div>
							<div className='qna-detail-info-divider'>{'\|'}</div>
							<div className='selecet-info-cotents'>{insuranceType}</div>
						</div>
					</div>
				</div>
				<div className='insurance-list-wrap'>
					{viewList.map(item => <ListItem {...item} />)}
					<div className='table-list-pagenation'>
						<div className='table-list-page-left' onClick={onPreSectionClickHandler}></div>
						<div className='table-list-page-box'>
							{pageList.map(page =>
								page === currentPage ?
									<div className='table-list-page-active'>{page}</div> :
									<div className='table-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
							)}
						</div>
						<div className='table-list-page-right' onClick={onNextSectionClickHandler}></div>
					</div>
				</div>
			</div>
		</div>
	);
}