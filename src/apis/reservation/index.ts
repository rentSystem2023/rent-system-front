import axios from "axios";
import { GET_RESERVATION_LIST_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { GetReservationListResponseDto } from "./dto/response";


// function : 예약 전체 리스트 불러오기 API 함수
export const getQnaListRequest = async(accessToken: string) => { // 토큰을 포함해서 가져와야 함
    const result = await axios.get(GET_RESERVATION_LIST_URL,bearerAuthorization(accessToken))
    .then(requestHandler<GetReservationListResponseDto>) //위에 코드가 성공한다면 <GetBoardListResponseDto> 받을 것이고
    .catch(requestErrorHandler); // 실패한다면 에러
    return result;
}
