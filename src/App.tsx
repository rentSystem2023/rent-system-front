import {  Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
ADMIN_BOARD_NOTICE_PATH,
ADMIN_BOARD_NOTICE_REGIST_PATH,
ADMIN_BOARD_NOTICE_UPDATE_PATH,
ADMIN_BOARD_PATH,
ADMIN_COMPANY_DETAIL_PATH,
ADMIN_COMPANY_PATH,
ADMIN_COMPANY_REGIST_PATH,
ADMIN_COMPANY_UPDATE_PATH,
ADMIN_NOTICE_LIST_ABSOLUTE_PATH,
ADMIN_PATH,
ADMIN_RESERVATION_PATH,
ADMIN_RESERVATION_UPDATE_PATH,
ADMIN_USER_DETAIL_PATH,
ADMIN_USER_LIST_ABSOLUTE_PATH,
ADMIN_USER_PATH,
AUTH_FIND_ID_PATH,
AUTH_FIND_PASSWORD_PATH,
AUTH_FIND_PW_RESET_PATH,
AUTH_PATH,
AUTH_SIGN_IN_PATH,
AUTH_SIGN_UP_PATH,
GUIDE_OF_USE,
MAIN_ABSOLUTE_PATH,
MAIN_PATH,
NOTICE_DETAIL_PATH,
NOTICE_PATH,
PERSONAL_INFORMATION_POLICY,
QNA_DETAIL_PATH,
QNA_PATH,
QNA_REGIST_PATH,
QNA_UPDATE_PATH,
RESERVATION_CAR_ABSOLUTE_PATH,
RESERVATION_CAR_PATH,
RESERVATION_COMPANY_PATH,
RESERVATION_PATH,
RESERVATION_REQUEST_PATH,
SNS_PATH,
TERMS_OF_USE,
USER_EMAIL_UPDATE_PATH,
USER_INFO_PATH,
USER_PATH,
USER_PW_UPDATE_PATH,
USER_QNA_PATH,
USER_RESERVATION_DETAIL_PATH,
USER_RESERVATION_PATH
} from "./constant";
import ServiceContainer from "./layouts/ServiceContainer";
import UserList from "./views/Admin/User/UserList";
import QnaList from "./views/Board/qna/QnaList";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import Main from "./views/Main";
import SignIn, { Sns } from "./views/Authentication/SignIn";
import SignUp from "./views/Authentication/SignUp";
import MyInfo from "./views/MyPage/MyInfo/Information";
import AdminContainer from "./layouts/AdminContainer";
import UserContainer from "./layouts/UserContainer";
import NoticeList from "./views/Board/notice/NoticeList";
import CompanyList from "./views/Admin/Company/CompanyList";
import FindId from "./views/Authentication/FindId";
import CompanyRegist from "./views/Admin/Company/CompanyRegist";
import QnaDetail from "./views/Board/qna/QnaDetail";
import QnAWrite from "./views/Board/qna/QnaWrite";
import QnaUpdate from "./views/Board/qna/QnaUpdate";
import CompanyDetail from "./views/Admin/Company/CompanyDetail";
import MyReservation from "./views/MyPage/Reservation/ReservationList";
import FindPassword from "./views/Authentication/FindPassword";
import FindPasswordReset from "./views/Authentication/FindPasswordReset";
import CompanyUpdate from "./views/Admin/Company/CompanyUpdate";
import ReservationList from "./views/Admin/Reservation/ReservationList";
import NoticeWrite from "./views/Board/notice/NoticeWrite";
import NoticeUpdate from "./views/Board/notice/NoticeUpdate";
import NoticeDetail from "./views/Board/notice/NoticeDetail";
import CarSelect from "./views/Reservation/CarSelect";
import InsuranceSelect from "./views/Reservation/InsuranceSelect";
import MyInfoPwModify from "./views/MyPage/MyInfo/PasswordModify";
import MyInfoEmailModify from "./views/MyPage/MyInfo/EmailModify";
import DetailUserList from "./views/Admin/User/UserDetail";
import ReservationDetail from "./views/Admin/Reservation/ReservationDetail";
import SearchDetail from "./views/Reservation/SearchDetail";
import MyInfoQnaList from "./views/MyPage/Qna/list";
import MyReservationDetail from "./views/MyPage/Reservation/ReservationDetail";
import TermsOfUse from "./views/MainBottom/TermsOfUse";
import GuideOfUse from "./views/MainBottom/GuideOfUse";
import PersonalInformationPolicy from "./views/MainBottom/Policy";

//          component: root 경로 컴포넌트          //
function Index() {
// state
const [cookies] = useCookies();

// function
const navigator = useNavigate();

// effect
useEffect(() => {
    const accessToken = cookies.accessToken;

    if (!accessToken) {
    navigator(MAIN_ABSOLUTE_PATH);
    } else {
    navigator(MAIN_ABSOLUTE_PATH);
    }
}, []);

// render
return <></>;
}

//          component: 관리자 페이지 인덱스 컴포넌트          //
function AdminUserIndex() {

// function
const navigator = useNavigate();

// effect
useEffect(() => navigator(ADMIN_USER_LIST_ABSOLUTE_PATH), []);

// render
return <></>;
}

//          component: 관리자 페이지 게시물 관리 인덱스 컴포넌트          //
function AdminBoardIndex() {

// function
const navigator = useNavigate();

// effect
useEffect(() => navigator(ADMIN_NOTICE_LIST_ABSOLUTE_PATH), []);

// render
return <></>;
}

//          component: 예약 페이지 인덱스 컴포넌트          //
function ReservationIndex() {

// function
const navigator = useNavigate();

// effect
useEffect(() => navigator(RESERVATION_CAR_ABSOLUTE_PATH), []);

// render
return <></>;
}

//          component: Application 컴포넌트 //
function App() {
return (
    <Routes>
    <Route index element={<Index />} />

    {/* // route : 메인 페이지 */}
    <Route path={MAIN_PATH} element={<ServiceContainer />}>
        <Route index element={<Main />} />

        {/* // route : 이용약관, 이용안내, 개인정보방침 페이지 */}
        <Route path={TERMS_OF_USE} element={<TermsOfUse />} />
        <Route path={GUIDE_OF_USE} element={<GuideOfUse />} />
        <Route path={PERSONAL_INFORMATION_POLICY} element={<PersonalInformationPolicy />} />

        {/* // route : 인증 페이지 */}
        <Route path={AUTH_PATH}>
        <Route path={AUTH_SIGN_IN_PATH} element={<SignIn />} />
        <Route path={SNS_PATH} element={<Sns />} />
        <Route path={AUTH_SIGN_UP_PATH} element={<SignUp />} />
        <Route path={AUTH_FIND_ID_PATH} element={<FindId />} />
        <Route path={AUTH_FIND_PASSWORD_PATH} element={<FindPassword />} />
        <Route path={AUTH_FIND_PW_RESET_PATH} element={<FindPasswordReset />} />
        </Route>

        {/* // route : 예약 페이지 */}
        <Route path={RESERVATION_PATH}>
        <Route index element={<ReservationIndex />} />
        <Route path={RESERVATION_CAR_PATH} element={<CarSelect/>} />
        <Route path={RESERVATION_COMPANY_PATH} element={<InsuranceSelect/>} />
        <Route path={RESERVATION_REQUEST_PATH} element={<SearchDetail/>} />
        </Route>

        {/* // route : 마이 페이지 */}
        <Route path={USER_PATH} element={<UserContainer />}>

        <Route path={USER_INFO_PATH}>
            <Route index element={<MyInfo/>}/>
            <Route path={USER_PW_UPDATE_PATH} element={<MyInfoPwModify/>} />
            <Route path={USER_EMAIL_UPDATE_PATH} element={<MyInfoEmailModify/>} />
        </Route>

        <Route path={USER_RESERVATION_PATH} element={<MyReservation/>} />
        <Route path={USER_RESERVATION_DETAIL_PATH} element={<MyReservationDetail/>} />

        <Route path={USER_QNA_PATH} element={<MyInfoQnaList />} />
        </Route>

        {/* // route : 공지사항 페이지 */}
        <Route path={NOTICE_PATH}>
        <Route index element={<NoticeList/>} />
        <Route path={NOTICE_DETAIL_PATH} element={<NoticeDetail/>}/>
        </Route>

        {/* // route : Q&A 페이지 */}
        <Route path={QNA_PATH}>
        <Route index element={<QnaList/>} />
        <Route path={QNA_DETAIL_PATH} element={<QnaDetail/>} />
        <Route path={QNA_REGIST_PATH} element={<QnAWrite/>} />
        <Route path={QNA_UPDATE_PATH} element={<QnaUpdate/>} />
        </Route>

        {/* // route : 관리자 페이지 */}
        <Route path={ADMIN_PATH} element={<AdminContainer />}>
        <Route index element={<AdminUserIndex />} />
        {/* // route : 관리자 - 회원관리 페이지 */}
        <Route path={ADMIN_USER_PATH}>
            <Route index element={<UserList />} />
            <Route path={ADMIN_USER_DETAIL_PATH} element={<DetailUserList />} />
        </Route>


        {/* // route : 관리자 - 업체관리 페이지 */}
        <Route path={ADMIN_COMPANY_PATH}>
            <Route index element={<CompanyList />} />
            <Route path={ADMIN_COMPANY_DETAIL_PATH} element={<CompanyDetail />} />
            <Route path={ADMIN_COMPANY_REGIST_PATH} element={<CompanyRegist />} />
            <Route path={ADMIN_COMPANY_UPDATE_PATH} element={<CompanyUpdate/>} />
        </Route>.

        {/* // route : 관리자 - 예약관리 페이지 */}
        <Route path={ADMIN_RESERVATION_PATH}>
            <Route index element={<ReservationList/>} />
            <Route path={ADMIN_RESERVATION_UPDATE_PATH} element={<ReservationDetail/>} />
        </Route>

        {/* // route : 관리자 - 게시물관리 페이지 */}
        <Route path={ADMIN_BOARD_PATH}>
            <Route index element={<AdminBoardIndex />} />
            
            {/* // route : 관리자 - 게시물 (공지사항) 관리 페이지 */}
            <Route path={ADMIN_BOARD_NOTICE_PATH}>
            <Route index element={<NoticeDetail/>} />
            <Route path={ADMIN_BOARD_NOTICE_REGIST_PATH} element={<NoticeWrite/>} />
            <Route path={ADMIN_BOARD_NOTICE_UPDATE_PATH} element={<NoticeUpdate/>} />
            </Route>

        </Route>
        </Route>
    </Route>
    </Routes>
);
}

export default App;