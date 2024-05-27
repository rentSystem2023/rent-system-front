// description : URL PATH
export const MAIN_PATH = '/rentcar';
export const SNS_PATH = '/sns/:accessToken/:expires';

export const AUTH_PATH = 'auth';
export const SIGN_IN_PATH = 'sign-in';
export const SIGN_UP_PATH = 'sign-up';

export const USER_PATH = 'user';
export const USER_INFO_PATH = 'information';
export const USER_UPDATE_PATH = 'modify';
export const USER_LIST_PATH = 'list';
export const USER_DETAIL_PATH = ':userId';

export const RESERVATION_PATH = 'reservation';
export const RESERVATION_MY_LIST_PATH = 'mylist';
export const RESERVATION_MY_DETAIL_PATH = ':reservationCode';
export const RESERVATION_LIST_PATH = 'list';

export const RESERVATION_INSURANCE_PATH = 'insurance';
export const RESERVATION_INQURY_INSURANCE_PATH = 'insurance-detail';

export const NOTICE_PATH = 'notice';
export const NOTICE_LIST = 'list'
export const NOTICE_REGIST_PATH = 'regist';
export const NOTICE_DETAIL_PATH = ':registNumber';
export const NOTICE_UPDATE_PATH = 'update/:registNumber';

export const QNA_PATH = 'qna';
export const QNA_LIST_PATH = 'list';
export const QNA_REGIST_PATH = 'regist';
export const QNA_DETAIL_PATH = ':receptionNumber';
export const QNA_UPDATE_PATH = 'update/:receptionNumber';
export const QNA_MY_LIST_PATH = 'myList';

export const COMPANY_PATH = 'company';
export const COMPANY_LIST_PATH = 'list';
export const COMPANY_REGIST_PATH = 'regist';
export const COMPANY_UPDATE_PATH = 'update/:companyCode';

//description : Navigation 절대 URL PATH
// rentcar 메인 URL
export const MAIN_ABSOLUTE_PATH = MAIN_PATH;

// 로그인 URL
export const SIGN_IN_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${SIGN_IN_PATH}`;
// 회원가입 URL
export const SIGN_UP_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${SIGN_UP_PATH}`;

// 마이페이지 내 정보보기 URL
export const USER_INFO_ABSOLUTE_PATH = `${MAIN_PATH}/${USER_PATH}/${USER_INFO_PATH}`;
// 마이페이지 내 정보 수정, 탈퇴 URL
export const USER_INFO_MODIFY_ABSOLUTE_PATH = `${USER_INFO_ABSOLUTE_PATH}/${USER_UPDATE_PATH}`;
// 관리자페이지 회원 정보 불러오기 URL
export const USER_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${USER_PATH}/${USER_LIST_PATH}`;
// 관리자페이지 회원 상세 정보 불러오기, 회원 정보 삭제 URL
export const USER_DETAIL_ABSOLUTE_PATH = (userId : number) => `${USER_LIST_ABSOLUTE_PATH}/${userId}`;

// 마이페이지 예약 내역 보기 URL
export const RESERVATION_MY_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${RESERVATION_PATH}/${RESERVATION_MY_LIST_PATH}`;
// 마이페이지 예약 상세 내역 보기, 예약 취소하기 URL
export const RESERVATION_MY_DETAIL_ABSOLUTE_PATH = (reservationCode : number) => `${RESERVATION_MY_LIST_ABSOLUTE_PATH}/${reservationCode}`;
// 관리자페이지 예약 목록 리스트 불러오기 URL
export const RESERVATION_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${RESERVATION_PATH}/${RESERVATION_LIST_PATH}`;

// 차량 검색, 예약과 관련된 URL 페이지 구현 시, 다시 점검해야함
// 인기 차량 리스트, 차량 검색 결과 불러오기 URL 
export const RESERVATION_SEARCH_ABSOLUTE_PATH = `${MAIN_PATH}/`;
// 보험별 가격 검색 결과 불러오기 URL
export const RESERVATION_INQURY_ABSOLUTE_PATH = `${MAIN_PATH}/${RESERVATION_INSURANCE_PATH}`;
// 보험별 가격 검색 결과 상세 불러오기 URL
export const RESERVATION_INQURY_DETAIL_ABSOLUTE_PATH = `${MAIN_PATH}/${RESERVATION_INQURY_INSURANCE_PATH}`;
// 예약하기 URL ..........??
export const RESERVATION_ABSOLUTE_PATH = ``;
// 예약 목록 리스트 불러오기 URL
export const RESERVATION_LIST_ABSOLUTE_URL = `${MAIN_PATH}/${RESERVATION_PATH}/${RESERVATION_LIST_PATH}`;

// 공지사항 리스트 불러오기 URL
export const NOTICE_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${NOTICE_PATH}/${NOTICE_LIST}`
// 공지사항 게시물 불러오기 URL
export const NOTICE_ABSOLUTE_DETAIL_PATH = (registNumber : number) => `${MAIN_PATH}/${NOTICE_LIST_ABSOLUTE_PATH}/${registNumber}`;
// 관리자페이지 공지사항 작성하기 URL
export const NOTICE_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${NOTICE_PATH}/${NOTICE_REGIST_PATH}`;
// 공지사항 게시물 수정하기 URL
export const NOTICE_ABSOLUTE_UPDATE_PATH = (registNumber : number) => `${MAIN_PATH}/${NOTICE_PATH}/update/${registNumber}`;

// Q&A 리스트 불러오기 URL
export const QNA_LIST_ABSOLUTE_PATH = `${QNA_PATH}/${QNA_LIST_PATH}`;
// Q&A 게시물 작성하기 URL
export const QNA_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${QNA_PATH}/${QNA_REGIST_PATH}`;
// Q&A 게시물 상세보기 URL
export const QNA_DETAIL_ABSOLUTE_PATH = (receptionNumber : number|string) => `${MAIN_PATH}/${QNA_LIST_ABSOLUTE_PATH}/${receptionNumber}`
// Q&A 게시물 수정하기 URL
export const QNA_UPDATE_ABSOLUTE_PATH = (receptionNumber : number | string) => `${MAIN_PATH}/${QNA_LIST_ABSOLUTE_PATH}/update/${receptionNumber}`;
// 마이페이지 Q&A 리스트 불러오기 URL
export const QNA_MY_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${QNA_PATH}/${QNA_MY_LIST_PATH}`;

// 업체 리스트 불러오기 URL
export const COMPANY_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${COMPANY_PATH}/${COMPANY_LIST_PATH}`;
// 업체 등록하기 URL
export const COMPANY_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${COMPANY_PATH}/${COMPANY_REGIST_PATH}`;
// 업체 정보 수정하기 URL
export const COMPANY_UPDATE_ABSOLUTE_PATH = (companyCode : number) => `${MAIN_PATH}/${COMPANY_PATH}/update/${companyCode}`;

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

// description: USER MODULE
export const SERVER_USER_MODULE_URL = `${SERVER_API_URL}/user`;

// 사용자 정보 반환 URL
export const GET_SIGN_IN_USER_REQUEST_URL = `${SERVER_USER_MODULE_URL}/`;
// 사용자 마이페이지 내 정보 URL
export const GET_MY_INFO_URL = `${SERVER_USER_MODULE_URL}/information`;
// 사용자 마이페이지 내 정보 수정 URL
export const PATCH_MODIFY_MY_INFO_URL = `${SERVER_USER_MODULE_URL}/information/modify`;
// 사용자 마이페이지 내 정보 삭제 URL
export const DELETE_MY_INFO_URL = `${SERVER_USER_MODULE_URL}/information/modify`;

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

// 마이페이지 예약 내역 URL
export const GET_MY_RESERVATION_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/mylist`;
// 마이페이지 예약 상세 내역 URL
export const GET_MY_RESERVATION_DETAIL_URL = (reservationCode : number) => `${GET_MY_RESERVATION_LIST_URL}/${reservationCode}`;
// 마이페이지 예약 취소 URL
export const PATCH_MY_RESERVATION_DETAIL_URL = (reservationCode : number) => `${GET_MY_RESERVATION_LIST_URL}/${reservationCode}`;

// 차량 검색, 예약 모듈 URL 다시 점검 필요함
// 인기 차량 리스트, 차량 검색 결과 URL
export const GET_CAR_LIST_URL = `${SERVER_API_URL}/`
// 보험별 가격 검색 결과 URL
export const GET_INSURANCE_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/insurance`;
// 보험별 가격 상세 검색 결과 URL
export const GET_INSURANCE_DETAIL_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/insurance-detail`;
// 예약 URL ...........??
export const POST_RESERVATION_URL = `${SERVER_RESERVATION_MODULE_URL}/list/search`;

// 예약 목록 리스트 URL
export const GET_RESERVATION_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/list`;
// 예약 목록 삭제 URL .........??
// export const DELETE_RESERVATION_LIST_URL = `${GET_RESERVATION_LIST_URL}`

// description: NOTICE MODULE
export const SERVER_NOTICE_MODULE_URL = `${SERVER_API_URL}/notice`;

// 공지사항 목록 URL
export const GET_NOTICE_LIST_URL = `${SERVER_NOTICE_MODULE_URL}/list`;
// 공지사항 검색 목록 URL
export const NOTICE_LIST_SEARCH_URL = `${SERVER_NOTICE_MODULE_URL}/list/search`;
// 공지사항 게시물 상세 URL
export const GET_NOTICE_DETAIL_URL = (registNumber : number) => `${GET_NOTICE_LIST_URL}/${registNumber}`;
// 공지사항 게시물 조회수 증가 URL
export const INCREASE_NOTICE_VIEW_COUNT_URL = (registNumber : number ) => `${SERVER_NOTICE_MODULE_URL}/${registNumber}/increase-view-count`;
// 공지사항 게시물 작성 URL
export const POST_NOTICE_REQUESURL = `${SERVER_NOTICE_MODULE_URL}/regist`;
// 공지사항 게시물 수정 URL
export const PUT_NOTICE_REGIST_URL = (registNumber : number) => `${SERVER_NOTICE_MODULE_URL}/${registNumber}/modify`;
// 공지사항 게시물 삭제 URL
export const DELETE_NOTICE_URL = (registNumber : number) => `${SERVER_NOTICE_MODULE_URL}/${registNumber}/delete`;

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
// 업체 정보 검색 리스트 URL
export const GET_COMPANY_LIST_SEARCH_URL = `${GET_COMPANY_LIST_URL}/search`;
// 업체 정보 등록 URL
export const POST_COMPANY_REGIST_URL = `${SERVER_COMPANY_MODULE}/regist`;
// 업체 정보 수정 URL
export const PATCH_COMPANY_DETAIL_REGIST_URL = (companyCode : number) => `${SERVER_COMPANY_MODULE}/${companyCode}`;
// 업체 정보 삭제 URL
export const DELETE_COMPANY_LIST_URL = (companyCode : number) => `${SERVER_COMPANY_MODULE}/${companyCode}`;

//description: PAGE
export const COUNT_PER_PAGE = 10; 
export const COUNT_PER_SECTION = 10;