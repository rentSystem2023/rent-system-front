// description : 도메인 URL
export const SERVER_DOMAIN_DOMAIN = 'http://localhost:4000';

// description: API URL PATH 
export const SERVER_API_URL = `${SERVER_DOMAIN_DOMAIN}/api/rentcar/auth`;
export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;

export const SIGN_IN_REQUEST_URL = `${SERVER_API_URL}/sign-in`;
export const ID_CHECK_REQUEST_URL = `${SERVER_API_URL}/id-check`;
export const EMAIL_AUTH_REQUEST_URL = `${SERVER_API_URL}/email-auth`;
export const EMAIL_AUTH_CHECK_REQUEST_URL = `${SERVER_API_URL}/email-auth-check`;
export const SIGN_UP_REQUEST_URL = `${SERVER_API_URL}/sign-up`;

export const GET_USER_INFO_URL = `${SERVER_API_URL}/`;
export const GET_MY_INFO_URL = `${SERVER_API_URL}/information`;
export const MODIFY_MY_INFO_URL = `${SERVER_API_URL}/information/modify`;
export const DELETE_MY_ACCOUNT_URL = `${SERVER_API_URL}/information/{userId}`;

// description: User URL
export const GET_USER_LIST_URL = `${SERVER_API_URL}/list`;
export const DELETE_USER_URL = `${SERVER_API_URL}/list/{userId}`;

// description: NOTICE URL
export const GET_NOTICE_LIST_URL = `${SERVER_API_URL}/list`;
export const SEARCH_NOTICE_LIST_URL = `${SERVER_API_URL}/list/search`;
export const GET_NOTICE_URL = `${SERVER_API_URL}/list/{registNumber}`;
export const INCREASE_NOTICE_VIEW_COUNT_URL = `${SERVER_API_URL}/{registNumber}/increase-view-count`;

export const POST_REGIST_NOTICE_URL = `${SERVER_API_URL}/regist`;
export const POST_MODIFY_NOTICE_URL = `${SERVER_API_URL}/list/{registNumber}`;
export const DELETE_NOTICE_URL = `${SERVER_API_URL}/{registNumber}`;

// description: Q&A URL
export const GET_QNA_LIST_URL = `${SERVER_API_URL}/list`;
export const SEARCH_QNA_LIST_URL = `${SERVER_API_URL}/list/search`;
export const GET_QNA_URL = `${SERVER_API_URL}/list/{receptionNumber}`;
export const WRITE_QNA_URL = `${SERVER_API_URL}/regist`;
export const INCREASE_QNA_VIEW_COUNT_URL = `${SERVER_API_URL}/{receptionNumber}/increase-view-count`;
export const DELETE_QNA_URL = `${SERVER_API_URL}/list/{receptionNumber}`;
export const MODIFY_QNA_URL = `${SERVER_API_URL}/list/{receptionNumber}`;
export const WRITE_QNA_COMMENT_URL = `${SERVER_API_URL}/{receptionNumber}/admin-comment`;

// description: MYPAGE URL

export const GET_MY_QNA_LIST_URL = `${SERVER_API_URL}/mylist`;
export const SEARCH_MY_QNA_LIST_URL = `${SERVER_API_URL}/mylist/search`;

// description: RESERVATION URL
export const GET_RESERVATION_LIST_URL = `${SERVER_API_URL}/mylist`;
export const GET_RESERVATION_DETAIL_URL = `${SERVER_API_URL}/mylist/{reservationCode}`;
export const CANCEL_RESERVATION_URL = `${SERVER_API_URL}/mylist/{reservationCode}`;
export const GET_POPULAR_CAR_LIST_URL = `${SERVER_API_URL}/popularcar-list`;
export const SEARCH_CAR_RESULT_URL = `${SERVER_API_URL}/search`;
export const SEARCH_INSURANCE_RESULT_URL = `${SERVER_API_URL}/search/{carCode}`;
export const SEARCH_INSURANCE_DETAIL_URL = `${SERVER_API_URL}/search/{companyCarCode}`;
export const MAKE_RESERVATION_URL = `${SERVER_API_URL}/search/{companyCarCode}`;

// description: COMPANY URL
export const GET_COMPANY_LIST_URL = `${SERVER_API_URL}/list`;
export const SEARCH_COMPANY_LIST_URL = `${SERVER_API_URL}/list/search`;
export const POST_REGISTER_COMPANY_URL = `${SERVER_API_URL}/regist`;
export const PATCH_MODIFY_COMPANY_URL = `${SERVER_API_URL}/list/{companyCode}`;


// description : Navigation URL PATH 
// export const SNS_PATH = '/sns/:accessToken/:expires';
// export const AUTH_PATH = '/authentication';
// export const SERVICE_PATH = '/service';
// export const LOCAL_PATH = 'local';
// export const RATIO_PATH = 'ratio';
// export const QNA_PATH = 'qna';
// export const QNA_WRITE_PATH = 'write';
// export const QNA_DEATIL_PATH = ':receptionNumber';
// export const QNA_UPDATE_PATH = 'update/:receptionNumber';

// // description: Navigation 절대 URL PATH 
// export const AUTH_ABSOLUTE_PATH = AUTH_PATH;
// export const LOCAL_ABSOLUTE_PATH = `${SERVICE_PATH}/${LOCAL_PATH}`;
// export const RATIO_ABSOLUTE_PATH = `${SERVICE_PATH}/${RATIO_PATH}`;
// export const QNA_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${QNA_PATH}`;
// export const QNA_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${QNA_PATH}/${QNA_WRITE_PATH}`;
// export const QNA_DEATIL_ABSOLUTE_PATH = (receptionNumber: number | string) => `${SERVICE_PATH}/${QNA_PATH}/${receptionNumber}`;
// export const QNA_UPDATE_ABSOLUTE_PATH = (receptionNumber: number | string) => `${SERVICE_PATH}/${QNA_PATH}/update/${receptionNumber}`;

// // description: API URL PATH 
// export const SERVER_DOMAIN_URL = 'http://localhost:4000';
// export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/api/v1`;
// export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;

// export const SIGN_IN_REUQEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-in`;
// export const ID_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/id-check`;
// export const EMAIL_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth`;
// export const EMAIL_AUTH_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth-check`;
// export const SIGN_UP_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-up`;

// export const SERVER_USER_MODULE_URL = `${SERVER_API_URL}/user`;

// export const GET_SIGN_IN_USER_REQUEST_URL = `${SERVER_USER_MODULE_URL}/`;

// export const SERVER_BOARD_MODULE_URL = `${SERVER_API_URL}/board`;

// export const POST_BOARD_REQUEST_URL = `${SERVER_BOARD_MODULE_URL}/`;

// export const POST_COMMENT_REQUEST_URL = (receptionNumber:number | string) => `${SERVER_BOARD_MODULE_URL}/${receptionNumber}/comment`;

// export const GET_BOARD_LIST_URL = `${SERVER_BOARD_MODULE_URL}/list`;
// export const GET_SEARCH_BOARD_LIST_URL =`${SERVER_BOARD_MODULE_URL}/list/search`;
// export const GET_BOARD_URL =(receptionNumber: number|string)=> `${SERVER_BOARD_MODULE_URL}/${receptionNumber}`;

// export const INCREASE_VIEW_COUNT_URL = (receptionNumber: number|string)=>`${SERVER_BOARD_MODULE_URL}/${receptionNumber}/increase-view-count`;

// export const DELETE_BOARD_URL = (receptionNumber: number | string) => `${SERVER_BOARD_MODULE_URL}/${receptionNumber}`;

// export const PUT_BOARD_URL = (receptionNumber : number | string) => `${SERVER_BOARD_MODULE_URL}/${receptionNumber}`;

// export const SERVER_ESTATE_MODULE_URL = `${SERVER_API_URL}/estate`;




// // 화살표 함수로 로컬 받아와줌
// export const GET_LOCAL_DATA_URL =(local : string) => `${SERVER_ESTATE_MODULE_URL}/local/${local}`;
// export const GET_RATIO_DATA_URL =(local : string)=> `${SERVER_ESTATE_MODULE_URL}/ratio/${local}`;



// // description : 게시물 상수 
// export const COUNT_PER_PAGE = 10; 
// export const COUNT_PER_SECTION = 10; 