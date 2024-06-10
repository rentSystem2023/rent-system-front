// constant : URL PATH //
// description: 메인 페이지 URL //
export const MAIN_PATH = '/rentcar';

// description: 인증 페이지 URL //
export const AUTH_PATH = 'auth';
export const AUTH_SIGN_IN_PATH = 'sign-in';
export const AUTH_SIGN_UP_PATH = 'sign-up';
export const AUTH_FIND_ID_PATH = 'find-id';
export const AUTH_FIND_PASSWORD_PATH = 'find-password';
export const AUTH_FIND_PW_RESET_PATH = 'find-password/:userId';

// description: 예약 페이지 URL //
export const RESERVATION_PATH = 'reservation';
export const RESERVATION_CAR_PATH = 'car';
export const RESERVATION_COMPANY_PATH = 'company';
export const RESERVATION_REQUEST_PATH = 'request';

// description: 마이 페이지 URL //
export const USER_PATH = 'user';
export const USER_PW_UPDATE_PATH = 'password-update';
export const USER_EMAIL_UPDATE_PATH = 'email-update';
export const USER_RESERVATION_PATH = 'reservation';
export const USER_QNA_PATH = 'qna';

// description: 공지사항 페이지 URL //
export const NOTICE_PATH = 'notice';
export const NOTICE_LIST = 'list'
export const NOTICE_DETAIL_PATH = ':registNumber';

// description: Q&A 페이지 URL //
export const QNA_PATH = 'qna';
export const QNA_LIST_PATH = 'list';
export const QNA_DETAIL_PATH = ':receptionNumber';
export const QNA_REGIST_PATH = 'regist';
export const QNA_UPDATE_PATH = 'update/:receptionNumber';

// description: ADMIN URL //
export const ADMIN_PATH = 'admin';

export const ADMIN_USER_PATH = 'user/list';
export const ADMIN_USER_DETAIL_PATH = ':userId';

export const ADMIN_COMPANY_PATH = 'company';
export const ADMIN_COMPANY_DETAIL_PATH = ':companyCode';
export const ADMIN_COMPANY_REGIST_PATH = 'regist';
export const ADMIN_COMPANY_UPDATE_PATH = 'update/:companyCode';

export const ADMIN_RESERVATION_PATH = 'reservation';
export const ADMIN_RESERVATION_UPDATE_PATH = ':reservationCode';

export const ADMIN_BOARD_PATH = 'board';
export const ADMIN_BOARD_NOTICE_PATH = 'notice';
export const ADMIN_BOARD_NOTICE_REGIST_PATH = 'regist';
export const ADMIN_BOARD_NOTICE_UPDATE_PATH = 'update/:registNumber';
export const ADMIN_BOARD_QNA_PATH = 'qna';

// constant : Navigation 절대 URL PATH //
// description: 메인 페이지 절대 URL //
export const MAIN_ABSOLUTE_PATH = MAIN_PATH;

// description: 인증 //
// description: 회원가입 페이지 절대 URL //
export const AUTH_SIGN_UP_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${AUTH_SIGN_UP_PATH}`;
// description: 로그인 페이지 절대 URL //
export const AUTH_SIGN_IN_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${AUTH_SIGN_IN_PATH}`;
// description: 아이디 찾기 페이지 절대 URL //
export const AUTH_FIND_ID_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${AUTH_FIND_ID_PATH}`;
// description: 비밀번호 찾기 페이지 절대 URL //
export const AUTH_FIND_PASSWORD_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${AUTH_FIND_PASSWORD_PATH}`;
// description: 비밀번호 찾기 비번 재설정 페이지 절대 URL //
export const AUTH_FIND_PW_RESET_ABSOLUTE_PATH =  (userId: string) => `${MAIN_PATH}/${AUTH_PATH}/${AUTH_FIND_PASSWORD_PATH}/${userId}`;

// description: 예약 //
// description: 차량 선택 페이지 절대 URL //
export const RESERVATION_CAR_ABSOLUTE_PATH = `${MAIN_PATH}/${RESERVATION_PATH}/${RESERVATION_CAR_PATH}`;
// description: 업체 선택 페이지 절대 URL //
export const RESERVATION_COMPANY_ABSOLUTE_PATH = `${MAIN_PATH}/${RESERVATION_PATH}/${RESERVATION_COMPANY_PATH}`;
// description: 예약 신청 페이지 절대 URL //
export const RESERVATION_REQUEST_ABSOLUTE_PATH = `${MAIN_PATH}/${RESERVATION_PATH}/${RESERVATION_REQUEST_PATH}`;

// description: 유저 //
// description: 내 정보 페이지 절대 URL //
export const USER_INFO_ABSOLUTE_PATH = `${MAIN_PATH}/${USER_PATH}`;
// description: 내 정보 비밀번호 수정 페이지 절대 URL //
export const USER_PW_UPDATE_ABSOLUTE_PATH = `${MAIN_PATH}/${USER_PATH}/${USER_PW_UPDATE_PATH}`;
// description: 내 정보 이메일 수정 페이지 절대 URL //
export const USER_EMAIL_UPDATE_ABSOLUTE_PATH = `${MAIN_PATH}/${USER_PATH}/${USER_EMAIL_UPDATE_PATH}`;
// description: 내 정보 삭제 페이지 절대 URL //
export const USER_INFO_DELETE_ABSOLUTE_PATH = (userId: string) => `${MAIN_PATH}/${USER_PATH}/${userId}`;
// description: 예약 내역 페이지 절대 URL //
export const USER_RESERVATION_ABSOLUTE_PATH = `${MAIN_PATH}/${USER_PATH}/${USER_RESERVATION_PATH}`;
// description: 문의 내역 페이지 절대 URL //
export const USER_QNA_ABSOLUTE_PATH = `${MAIN_PATH}/${USER_PATH}/${USER_QNA_PATH}`;

// description: 공지사항 //
// description: 공지사항 리스트 페이지 절대 URL //
export const NOTICE_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${NOTICE_PATH}`;
// description: 공지사항 상세 페이지 절대 URL //
export const NOTICE_DETAIL_ABSOLUTE_PATH = (registNumber: string | number) => `${MAIN_PATH}/${NOTICE_PATH}/${registNumber}`;

// description: Q&A //
// description: Q&A 리스트 페이지 절대 URL //
export const QNA_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${QNA_PATH}`;
// description: Q&A 작성 페이지 절대 URL //
export const QNA_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${QNA_PATH}/${QNA_REGIST_PATH}`;
// description: Q&A 상세 페이지 절대 URL //
export const QNA_DETAIL_ABSOLUTE_PATH = (receptionNumber: string | number) => `${MAIN_PATH}/${QNA_PATH}/${receptionNumber}`;
// description: Q&A 수정 페이지 절대 URL //
export const QNA_UPDATE_ABSOLUTE_PATH = (receptionNumber: string | number) => `${MAIN_PATH}/${QNA_PATH}/update/${receptionNumber}`;


// description: 관리자 - 회원 관리 //
// description: 회원 리스트 페이지 절대 URL //
export const ADMIN_USER_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_USER_PATH}`;
// description: 회원 상세보기 페이지 절대 URL //
export const ADMIN_USER_DETAIL_ABSOLUTE_PATH = (userId: string) => `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_USER_PATH}/${userId}`;

// description: 관리자 - 업체 관리 //
// description: 업체 리스트 페이지 절대 URL //
export const ADMIN_COMPANY_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_COMPANY_PATH}`;
// description: 업체 상세 페이지 절대 URL //
export const ADMIN_COMPANY_DETAIL_ABSOLUTE_PATH = (companyCode: string | number) => `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_COMPANY_PATH}/${companyCode}`;
// description: 업체 등록 페이지 절대 URL //
export const ADMIN_COMPANY_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_COMPANY_PATH}/${ADMIN_COMPANY_REGIST_PATH}`;
// description: 업체 수정 페이지 절대 URL //
export const ADMIN_COMPANY_UPDATE_ABSOLUTE_PATH = (companyCode: string | number) => `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_COMPANY_PATH}/update/${companyCode}`;

// description: 관리자 - 예약 관리 //
// description: 예약 리스트 페이지 절대 URL //
export const ADMIN_RESERVATION_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_RESERVATION_PATH}`;
// description: 예약 수정 페이지 절대 URL //
export const ADMIN_RESERVATION_UPDATE_ABSOLUTE_PATH = (reservationCode: string | number) => `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_RESERVATION_PATH}/update/${reservationCode}`;

// description: 관리자 - 게시물 관리 - 공지사항 //
// description: 공지사항 리스트 페이지 절대 URL //
export const ADMIN_NOTICE_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_BOARD_PATH}/${ADMIN_BOARD_NOTICE_PATH}`;
// description: 공지사항 작성 페이지 절대 URL //
export const ADMIN_NOTICE_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_BOARD_PATH}/${ADMIN_BOARD_NOTICE_PATH}/${ADMIN_BOARD_NOTICE_REGIST_PATH}`;
// description: 공지사항 수정 페이지 절대 URL //
export const ADMIN_NOTICE_UPDATE_ABSOLUTE_PATH = (registNumber: string | number) => `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_BOARD_PATH}/${ADMIN_BOARD_NOTICE_PATH}/update/${registNumber}`;

// description: 관리자 - 게시물 관리 - Q&A //
export const ADMIN_QNA_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_BOARD_PATH}/${ADMIN_BOARD_QNA_PATH}`;

// constant : SERVER URL //
// description : 도메인 URL
export const SERVER_DOMAIN_URL = 'http://localhost:4000';

// description: API URL PATH 
export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/api/rentcar`;

// description: AUTH MODULE
export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;

// 로그인 URL
export const POST_SIGN_IN_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-in`;
// 아이디 중복 확인 URL
export const POST_ID_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/id-check`;
// 닉네임 중복 확인 URL
export const POST_NICKNAME_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/nickname-check`;
// 이메일 인증 번호 URL
export const POST_EMAIL_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth`;
// 이메일 인증 확인 URL
export const POST_EMAIL_AUTH_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth-check`;
// 회원가입 URL
export const POST_SIGN_UP_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-up`;
// 아이디 찾기 URL
export const POST_FIND_ID_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/find-id`;
// 비밀번호 찾기 URL
export const POST_FIND_PASSWORD_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/find-password`;
// 비밀번호 찾기 비번 재설정 URL
export const PUT_FIND_PW_RESET_REQUEST_URL = (userId: string) => `${POST_FIND_PASSWORD_REQUEST_URL}/${userId}`;

// description: USER MODULE
export const SERVER_USER_MODULE_URL = `${SERVER_API_URL}/user`;

// 사용자 정보 반환 URL
export const GET_SIGN_IN_USER_REQUEST_URL = `${SERVER_USER_MODULE_URL}/`;
// 사용자 마이페이지 내 정보 URL
export const GET_MY_INFO_URL = `${SERVER_USER_MODULE_URL}/information`;
// 사용자 마이페이지 비밀번호 수정 URL
export const PUT_MY_INFO_PW_MODIFY_URL = `${SERVER_USER_MODULE_URL}/information/password-modify`;
// 사용자 마이페이지 이메일 수정 URL
export const PUT_MY_INFO_EMAIL_MODIFY_URL = `${SERVER_USER_MODULE_URL}/information/email-modify`;
// 사용자 마이페이지 내 정보 삭제 URL
export const DELETE_MY_INFO_URL = (userId: string) => `${GET_MY_INFO_URL}/${userId}`;


// 관리자페이지 회원 목록 리스트 URL
export const GET_USER_LIST_URL = `${SERVER_USER_MODULE_URL}/list`;
// 관리자페이지 회원 목록 상세 URL
export const GET_USER_DETAIL_URL = (userId: string) => `${GET_USER_LIST_URL}/${userId}`;
// 관리자페이지 회원 정보 삭제 URL
export const DELETE_USER_LIST_URL = (userId: string) => `${GET_USER_LIST_URL}/${userId}`;
// 관리자 페이지 회원 목록 검색 결과 URL
export const GET_USER_LIST_SEARCH_URL = `${GET_USER_LIST_URL}/search`;

// description: RESERVATION MODULE
export const SERVER_RESERVATION_MODULE_URL = `${SERVER_API_URL}/reservation`;

// 예약 하기 URL
export const POST_RESERVATION_URL = `${SERVER_RESERVATION_MODULE_URL}/regist`;
// 마이페이지 예약 내역 리스트 URL
export const GET_MY_RESERVATION_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/mylist`;
// 마이페이지 예약 상세 내역 URL
export const GET_MY_RESERVATION_DETAIL_URL = (reservationCode : string | number) => `${GET_MY_RESERVATION_LIST_URL}/${reservationCode}`;
// 마이페이지 예약 취소 URL
export const PATCH_MY_RESERVATION_DETAIL_URL = (reservationCode : string | number) => `${GET_MY_RESERVATION_LIST_URL}/${reservationCode}/cancel`;
// 취소 신청 예약 리스트 URL
export const GET_RESERVATION_CANCEL_LIST_URL = (reservationState: string) => `${SERVER_RESERVATION_MODULE_URL}/cancel/${reservationState}`;
// 예약 취소 신청 승인 URL
export const DELETE_RESERVATION_URL = (reservationCode : string | number) => `${GET_MY_RESERVATION_LIST_URL}/cancel/${reservationCode}`;
// 예약 전체 리스트 URL
export const GET_RESERVATION_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/list`;
// 예약 검색 리스트 URL
export const GET_RESERVATION_LIST_SEARCH_URL = `${GET_RESERVATION_LIST_URL}/search`;
// 예약 목록 리스트 삭제 URL
export const DELETE_RESERVATION_LIST_URL = (reservationCode : string | number) => `${GET_RESERVATION_LIST_URL}/${reservationCode}`;
// 인기 차량 리스트 URL
export const GET_POPULAR_CAR_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/polular`;
// 차량 검색 결과 URL
export const GET_CAR_SEARCH_LIST_URL = (address : string, reservationStart : string, reservationEnd : string) =>  `${SERVER_RESERVATION_MODULE_URL}/search/${address}/${reservationStart}/${reservationEnd}`;
// 보험별 가격 검색 결과 URL
export const GET_CAR_PRICE_SEARCH_LIST_URL = (carName : string) => `${GET_CAR_SEARCH_LIST_URL}/${carName}`;
// 보험별 가격 상세 검색 결과 URL
export const GET_CAR_PRICE_SEARCH_DETAIL_LIST_URL = (rentCompany : string) =>  `${GET_CAR_PRICE_SEARCH_LIST_URL}/${rentCompany}`;

// description: NOTICE MODULE
export const SERVER_NOTICE_MODULE_URL = `${SERVER_API_URL}/notice`;

// 공지사항 목록 URL
export const GET_NOTICE_LIST_URL = `${SERVER_NOTICE_MODULE_URL}/list`;
// 공지사항 검색 목록 URL
export const NOTICE_LIST_SEARCH_URL = `${SERVER_NOTICE_MODULE_URL}/list/search`;
// 공지사항 게시물 상세 URL
export const GET_NOTICE_DETAIL_URL = (registNumber : number | string ) => `${GET_NOTICE_LIST_URL}/${registNumber}`;
// 공지사항 게시물 조회수 증가 URL
export const INCREASE_NOTICE_VIEW_COUNT_URL = (registNumber : number | string  ) => `${SERVER_NOTICE_MODULE_URL}/${registNumber}/increase-view-count`;
// 공지사항 게시물 작성 URL
export const POST_NOTICE_REQUESURL = `${SERVER_NOTICE_MODULE_URL}/regist`;
// 공지사항 게시물 수정 URL
export const PUT_NOTICE_REGIST_URL = (registNumber : number | string ) => `${SERVER_NOTICE_MODULE_URL}/${registNumber}/modify`;
// 공지사항 게시물 삭제 URL
export const DELETE_NOTICE_URL = (registNumber : number | string ) => `${SERVER_NOTICE_MODULE_URL}/${registNumber}/delete`;

// description: Q&A MODULE
export const SERVER_QNA_MODULE_URL = `${SERVER_API_URL}/qna`;

// 마이페이지 Q&A 목록 URL
export const GET_MY_QNA_LIST_URL = `${SERVER_QNA_MODULE_URL}/myList`;
// 마이페이지 Q&A 목록 검색 URL
export const GET_MY_QNA_LIST_SEARCH_URL = `${GET_MY_QNA_LIST_URL}/search`;
// 마이페이지 Q&A 게시물 삭제 URL
export const DELETE_QNA_LIST_URL = (receptionNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${receptionNumber}/delete`;
// Q&A 게시물 수정 URL
export const PUT_QNA_REGIST_URL = (receptionNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${receptionNumber}/modify`;

// Q&A 전체 게시물 리스트 URL
export const GET_QNA_LIST_URL = `${SERVER_QNA_MODULE_URL}/list`;
// Q&A 게시물 검색 리스트 URL
export const GET_QNA_LIST_SEARCH_URL = `${GET_QNA_LIST_URL}/search`;
// Q&A 게시물 상세 URL
export const GET_QNA_DETAIL_URL = (receptionNumber : number | string) => `${GET_QNA_LIST_URL}/${receptionNumber}`;
// Q&A 게시물 작성 URL
export const POST_QNA_REGIST_URL = `${SERVER_QNA_MODULE_URL}/regist`;
// Q&A 게시물 조회수 증가 URL
export const INCREASE_QNA_VIEW_COUNT_URL = (receptionNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${receptionNumber}/increase-view-count`;

// Q&A 답변 URL
export const POST_COMMENT_REQUEST_URL = (receptionNumber : number | string) => `${SERVER_QNA_MODULE_URL}/${receptionNumber}/comment`;

// description: COMPANY MODULE
export const SERVER_COMPANY_MODULE = `${SERVER_API_URL}/company`;

// 업체 정보 전체 리스트 URL
export const GET_COMPANY_LIST_URL = `${SERVER_COMPANY_MODULE}/list`;
// 업체 정보 상세 URL
export const GET_COMPANY_DETAIL_URL = (companyCode : string | number) => `${GET_COMPANY_LIST_URL}/${companyCode}`;
// 업체 정보 검색 리스트 URL
export const GET_COMPANY_LIST_SEARCH_URL = `${GET_COMPANY_LIST_URL}/search`;
// 업체 정보 등록 URL
export const POST_COMPANY_REGIST_URL = `${SERVER_COMPANY_MODULE}/regist`;
// 업체 정보 수정 URL
export const PUT_COMPANY_UPDATE_URL = (companyCode : string | number) => `${SERVER_COMPANY_MODULE}/${companyCode}`;
// 업체 정보 삭제 URL
export const DELETE_COMPANY_LIST_URL = (companyCode : string | number) => `${SERVER_COMPANY_MODULE}/${companyCode}`;

//description: PAGE
export const COUNT_PER_PAGE = 10; 
export const COUNT_PER_SECTION = 10;