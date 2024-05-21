// description : URL PATH
export const MAIN_PATH = '/main';
export const SNS_PATH = '/sns/:accessToken/:expires';

export const AUTH_PATH = '/authentication';
export const SIGN_IN_PATH = 'sign-in';
export const SIGN_UP_PATH = 'sign-up';

export const USER_PATH = '/user';
export const USER_INFO_PATH = 'information';
export const USER_UPDATE_PATH = 'modify';
export const USER_LIST_PATH = 'list';
export const USER_DETAIL_PATH = ':userId';

export const RESERVATION_PATH = '/reservation';
export const RESERVATION_MY_LIST_PATH = 'mylist';
export const RESERVATION_MY_DETAIL_PATH = ':reservationCode';
export const RESERVATION_LIST_PATH = 'list';

export const RESERVATION_INQURY_PATH = 'inqury';
export const RESERVATION_INQURY_DETAIL_PATH = 'inqury-detail';

export const NOTICE_PATH = '/notice';
export const NOTICE_WRITE_PATH = 'regist';
export const NOTICE_DETAIL_PATH = ':registNumber';
export const NOTICE_UPDATE_PATH = 'update/:registNumber';

export const QNA_PATH = '/qna';
export const QNA_LIST_PATH = 'list';
export const QNA_WRITE_PATH = 'regist';
export const QNA_DETAIL_PATH = ':receptionNumber';
export const QNA_UPDATE_PATH = 'update/:receptionNumber';
export const QNA_MY_LIST_PATH = 'myList';

//description : Navigation 절대 URL PATH
export const MAIN_ABSOLUTE_PATH = MAIN_PATH;

export const SIGN_IN_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_IN_PATH}`;
export const SIGN_UP_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_UP_PATH}`;

export const USER_INFO_ABSOLUTE_PATH = `${USER_PATH}/${USER_INFO_PATH}`;
export const USER_INFO_MODIFY_ABSOLUTE_PATH = `${USER_INFO_ABSOLUTE_PATH}/${USER_UPDATE_PATH}`;
export const USER_LIST_ABSOLUTE_PATH = `${USER_PATH}/${USER_LIST_PATH}`;
export const USER_DETAIL_ABSOLUTE_PATH = (userId : number) => `${USER_LIST_ABSOLUTE_PATH}/${userId}`;

export const RESERVATION_MY_LIST_ABSOLUTE_PATH = `${RESERVATION_PATH}/${RESERVATION_MY_LIST_PATH}`;
export const RESERVATION_MY_DETAIL_ABSOLUTE_PATH = (reservationCode : string) => `${RESERVATION_MY_LIST_ABSOLUTE_PATH}/${reservationCode}`;
export const RESERVATION_LIST_ABSOLUTE_PATH = `${RESERVATION_PATH}/${RESERVATION_LIST_PATH}`;

export const RESERVATION_SEARCH_ABSOLUTE_PATH = `${MAIN_PATH}`;
export const RESERVATION_INQURY_ABSOLUTE_PATH = `${RESERVATION_SEARCH_ABSOLUTE_PATH}/${RESERVATION_INQURY_PATH}`;
export const RESERVATION_INQURY_DETAIL_ABSOLUTE_PATH = `${RESERVATION_SEARCH_ABSOLUTE_PATH}/${RESERVATION_INQURY_DETAIL_PATH}`;

export const NOTICE_WRITE_ABSOLUTE_PATH = `${NOTICE_PATH}/${NOTICE_WRITE_PATH}`;
export const NOTICE_ABSOLUTE_DETAIL_PATH = (registNumber : number) => `${NOTICE_WRITE_ABSOLUTE_PATH}/${registNumber}`;
export const NOTICE_ABSOLUTE_UPDATE_PATH = (registNumber : number) => `${NOTICE_WRITE_ABSOLUTE_PATH}/update/${registNumber}`;

export const QNA_LIST_ABSOLUTE_PATH = `${QNA_PATH}/${QNA_LIST_PATH}`;
export const QNA_WRITE_ABSOLUTE_PATH = `${QNA_PATH}/${QNA_WRITE_PATH}`;
export const QNA_DETAIL_ABSOLUTE_PATH = (receptionNumber : number) => `${QNA_LIST_ABSOLUTE_PATH}/${receptionNumber}`
export const QNA_UPDATE_ABSOLUTE_PATH = (receptionNumber : number) => `${QNA_LIST_ABSOLUTE_PATH}/update/${receptionNumber}`;

// description : 도메인 URL
export const SERVER_DOMAIN_URL = 'http://localhost:4000';

// description: API URL PATH 
export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/api/rentcar`;

// description: AUTH MODULE
export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;

export const SIGN_IN_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-in`;
export const ID_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/id-check`;
export const EMAIL_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth`;
export const EMAIL_AUTH_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth-check`;
export const SIGN_UP_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-up`;

// description: USER MODULE
export const SERVER_USER_MODULE_URL = `${SERVER_API_URL}/user`;

export const GET_SIGN_IN_USER_REQUEST_URL = `${SERVER_USER_MODULE_URL}/`;
export const GET_MY_INFO_URL = `${SERVER_USER_MODULE_URL}/information`;
export const MODIFY_MY_INFO_URL = `${SERVER_USER_MODULE_URL}/information/modify`;

export const GET_USER_LIST_URL = `${SERVER_USER_MODULE_URL}/list`;
export const GET_USER_DETAIL_URL = (userId: string) => `${SERVER_USER_MODULE_URL}/list/${userId}`;
export const USER_LIST_SEARCH_URL = `${SERVER_USER_MODULE_URL}/liser/search`;

// description: RESERVATION MODULE
export const SERVER_RESERVATION_MODULE_URL = `${SERVER_API_URL}/reservation`;

export const GET_USER_RESERVATION_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/mylist`;
export const GET_USER_RESERVATION_DETAIL_URL = (reservationCode : string) => `${SERVER_RESERVATION_MODULE_URL}/mylist/${reservationCode}`;

export const GET_CAR_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}`;
export const GET_INSURANCE_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/inqury`;
export const GET_INSURANCE_DETAIL_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/inqury-detail`;

export const GET_RESERVATION_LIST_URL = `${SERVER_RESERVATION_MODULE_URL}/list`;

// description: NOTICE MODULE
export const SERVER_NOTICE_MODULE_URL = `${SERVER_API_URL}/notice`;

export const GET_NOTICE_LIST_URL = `${SERVER_NOTICE_MODULE_URL}/list`;
export const NOTICE_LIST_SEARCH_URL = `${SERVER_NOTICE_MODULE_URL}/list/search`;
export const GET_NOTICE_DETAIL_URL = (registNumber : number) => `${SERVER_NOTICE_MODULE_URL}/list/${registNumber}`;
export const INCREASE_NOTICE_VIEW_COUNT_URL = (registNumber : number ) => `${SERVER_API_URL}/${registNumber}/increase-view-count`;

export const REGIST_NOTICE_URL = `${SERVER_NOTICE_MODULE_URL}/regist`;
export const REGIST_NOTICE_DETAIL_URL = (registNumber : number) => `${SERVER_NOTICE_MODULE_URL}/list/${registNumber}`;

// description: Q&A MODULE
export const SERVER_QNA_MODULE_URL = `${SERVER_API_URL}/qna`;

export const GET_USER_QNA_LIST_URL = `${SERVER_QNA_MODULE_URL}/myList`;
export const GET_USER_QNA_LIST_SEARCH_URL = `${SERVER_QNA_MODULE_URL}/myList/search`;

export const GET_QNA_LIST_URL = `${SERVER_QNA_MODULE_URL}/list`;
export const GET_QNA_LIST_SEARCH_URL = `${SERVER_API_URL}/list/search`;
export const GET_QNA_DETAIL_URL = (receptionNumber : number) => `${SERVER_QNA_MODULE_URL}/list/${receptionNumber}`;
export const QNA_REGIST_URL = `${SERVER_QNA_MODULE_URL}/regist`;
export const QNA_REGIST_DETAIL_URL = (receptionNumber : number) => `${SERVER_QNA_MODULE_URL}/regist/${receptionNumber}`;
export const INCREASE_QNA_VIEW_COUNT_URL = (receptionNumber: number) => `${SERVER_QNA_MODULE_URL}/${receptionNumber}/increase-view-count`;

export const POST_COMMENT_REQUEST_URL = (receptionNumber : number) => `${SERVER_QNA_MODULE_URL}/${receptionNumber}/admin-comment`;

// description: COMPANY MODULE
export const SERVER_COMPANY_MODULE = `${SERVER_API_URL}/company'`;

export const GET_COMPANY_LIST_URL = `${SERVER_COMPANY_MODULE}/list`;
export const GET_COMPANY_LIST_SEARCH_URL = `${SERVER_COMPANY_MODULE}/list/search`;
export const REGIST_COMPANY_URL = `${SERVER_COMPANY_MODULE}/regist`;
export const REGIST_COMPANY_DETAIL_URL = (companyCode : number) => `${SERVER_API_URL}/list/${companyCode}`;