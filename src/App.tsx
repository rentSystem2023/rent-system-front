import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
ADMIN_BOARD_NOTICE_PATH,
ADMIN_BOARD_NOTICE_REGIST_PATH,
ADMIN_BOARD_NOTICE_UPDATE_PATH,
ADMIN_BOARD_PATH,
ADMIN_BOARD_QNA_PATH,
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
MAIN_ABSOLUTE_PATH,
MAIN_PATH,
NOTICE_DETAIL_PATH,
NOTICE_LIST,
NOTICE_PATH,
QNA_DETAIL_PATH,
QNA_LIST_PATH,
QNA_PATH,
QNA_REGIST_PATH,
QNA_UPDATE_PATH,
RESERVATION_CAR_ABSOLUTE_PATH,
RESERVATION_CAR_PATH,
RESERVATION_COMPANY_PATH,
RESERVATION_PATH,
RESERVATION_REQUEST_PATH,
USER_PATH,
USER_QNA_PATH,
USER_RESERVATION_PATH,
USER_UPDATE_PATH,
} from "./constant";
import ServiceContainer from "./layouts/ServiceContainer";
import UserList from "./views/User/List";
import QnaList from "./views/Board/qna/QnaList";
import QnAContainer from "./layouts/QnAContainer";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import Main from "./views/Main";
import SignIn from "./views/Authentication/SignIn";
import SignUp from "./views/Authentication/SignUp";
import MyInfo from "./views/MyPage/MyInfo/Information";
import MyInfoModify from "./views/MyPage/MyInfo/Modify";
import AdminContainer from "./layouts/AdminContainer";
import UserContainer from "./layouts/UserContainer";
import NoticeList from "./views/Board/notice/NoticeList";
import CompanyList from "./views/Admin/Company/list";
import FindId from "./views/Authentication/FindId";
import CompanyRegist from "./views/Admin/Company/regist";
import QnaDetail from "./views/Board/qna/QnaDetail";
import QnAWrite from "./views/Board/qna/QnaWrite";
import QnaUpdate from "./views/Board/qna/QnaUpdate";
import CompanyDetail from "./views/Admin/Company/CompanyDetail";
import MyReservation from "./views/MyPage/Reservation";
import MyQna from "./views/MyPage/Qna";
import FindPassword from "./views/Authentication/FindPassword";
import FindPasswordReset from "./views/Authentication/FindPasswordReset";
import CompanyUpdate from "./views/Admin/Company/CompanyUpdate";
import ReservationList from "./views/Admin/Reservation";

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

        {/* // route : 인증 페이지 */}
        <Route path={AUTH_PATH}>
        <Route path={AUTH_SIGN_IN_PATH} element={<SignIn />} />
        <Route path={AUTH_SIGN_UP_PATH} element={<SignUp />} />
        <Route path={AUTH_FIND_ID_PATH} element={<FindId />} />
        <Route path={AUTH_FIND_PASSWORD_PATH} element={<FindPassword />} />
        <Route path={AUTH_FIND_PW_RESET_PATH} element={<FindPasswordReset />} />
        </Route>

        {/* // route : 예약 페이지 */}
        <Route path={RESERVATION_PATH}>
        <Route index element={<ReservationIndex />} />
        <Route path={RESERVATION_CAR_PATH} element={<>차량 선택</>} />
        <Route path={RESERVATION_COMPANY_PATH} element={<>업체 선택</>} />
        <Route path={RESERVATION_REQUEST_PATH} element={<>예약 신청</>} />
        </Route>

        {/* // route : 마이 페이지 */}
        <Route path={USER_PATH} element={<UserContainer />}>
        <Route index element={<MyInfo />} />
        <Route path={USER_UPDATE_PATH} element={<MyInfoModify />} />
        <Route path={USER_RESERVATION_PATH} element={<MyReservation/>} />
        <Route path={USER_QNA_PATH} element={<MyQna/>} />
        </Route>

        {/* // route : 공지사항 페이지 */}
        <Route path={NOTICE_PATH}>
        <Route index element={<NoticeList/>} />
        <Route path={NOTICE_DETAIL_PATH} element={<>공지사항 상세보기</>}/>
        </Route>

        {/* // route : Q&A 페이지 */}
        <Route path={QNA_PATH} element={<QnAContainer />}>
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
            <Route index element={<>회원관리 리스트</>} />
            <Route path={ADMIN_USER_DETAIL_PATH} element={<>회원 상세 보기</>} />
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
            <Route path={ADMIN_RESERVATION_UPDATE_PATH} element={<>예약 상세</>} />
        </Route>

        {/* // route : 관리자 - 게시물관리 페이지 */}
        <Route path={ADMIN_BOARD_PATH}>
            <Route index element={<AdminBoardIndex />} />
            {/* // route : 관리자 - 게시물 (공지사항) 관리 페이지 */}
            <Route path={ADMIN_BOARD_NOTICE_PATH}>
            <Route index element={<>공지사항 관리 리스트 페이지</>} />
            <Route path={ADMIN_BOARD_NOTICE_REGIST_PATH} element={<>공지사항 작성 페이지</>} />
            <Route path={ADMIN_BOARD_NOTICE_UPDATE_PATH} element={<>공지사항 수정 페이지</>} />
            </Route>

            {/* // route : 관리자 - 게시물 (Q&A) 관리 페이지 */}
            <Route path={ADMIN_BOARD_QNA_PATH} element={<>관리자 Q&A 리스트 페이지</>} />
        </Route>
        </Route>
    </Route>
    </Routes>
);
}

export default App;