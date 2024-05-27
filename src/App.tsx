import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  ADMIN_BOARD_NOTICE_ABSOLUTE_PATH,
  ADMIN_BOARD_NOTICE_PATH,
  ADMIN_BOARD_NOTICE_UPDATE_PATH,
  ADMIN_BOARD_NOTICE_WRITE_PATH,
  ADMIN_BOARD_PATH,
  ADMIN_BOARD_QNA_PATH,
  ADMIN_COMPANY_PATH,
  ADMIN_COMPANY_REGIST_PATH,
  ADMIN_COMPANY_UPDATE_PATH,
  ADMIN_PATH,
  ADMIN_RESERVATION_PATH,
  ADMIN_RESERVATION_UPDATE_PATH,
  ADMIN_USER_DETAIL_PATH,
  ADMIN_USER_LIST_ABSOLUTE_PATH,
  ADMIN_USER_PATH,
  AUTH_PATH,
  COMPANY_LIST_PATH,
  COMPANY_PATH,
  COMPANY_REGIST_PATH,
  COMPANY_UPDATE_PATH,
  MAIN_ABSOLUTE_PATH,
  MAIN_PATH,
  NOTICE_DETAIL_PATH,
  NOTICE_LIST,
  NOTICE_PATH,
  NOTICE_REGIST_PATH,
  NOTICE_UPDATE_PATH,
  QNA_DETAIL_ABSOLUTE_PATH,
  QNA_DETAIL_PATH,
  QNA_LIST_ABSOLUTE_PATH,
  QNA_LIST_PATH,
  QNA_MY_LIST_PATH,
  QNA_PATH,
  QNA_REGIST_PATH,
  QNA_UPDATE_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  USER_DETAIL_PATH,
  USER_INFO_PATH,
  USER_PATH,
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
import QnaDetail from "./views/Board/qna/QnaDetail";
import MyInfo from "./views/MyInfo/Information";
import MyInfoModify from "./views/MyInfo/Modify";
import AdminContainer from "./layouts/AdminContainer";

function Index() {
  // state
  const [cookies] = useCookies();

  // function
  const navigator = useNavigate();

  // effect
  useEffect(() => {
    const accessToken = cookies.accessToken;

    if (!accessToken) {
      // 로그인이 안되어있는 상태
      navigator(MAIN_ABSOLUTE_PATH);
    }
  }, []);

  // render
  return <></>;
}

function AdminUserIndex() {

  // function
  const navigator = useNavigate();

  // effect
  useEffect(() => navigator(ADMIN_USER_LIST_ABSOLUTE_PATH), []);

  // render
  return <></>;
}

function AdminBoardIndex() {
  // function
  const navigator = useNavigate();

  // effect
  useEffect(() => navigator(ADMIN_BOARD_NOTICE_ABSOLUTE_PATH), []);

  // render
  return <></>;
}

function App() {
  return (
    <Routes>
      <Route index element={<Index />} />

      {/* // route : 메인 페이지 */}
      <Route path={MAIN_PATH} element={<ServiceContainer />}>
        <Route index element={<Main />} />

        {/* // route : 인증 페이지 */}
        <Route path={AUTH_PATH}>
          <Route path={SIGN_IN_PATH} element={<SignIn />} />
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
        </Route>

        {/* // route : 마이 페이지 */}
        <Route path={USER_PATH}>
          <Route path={USER_INFO_PATH}>
            <Route index element={<MyInfo />} />
            <Route path={USER_UPDATE_PATH} element={<MyInfoModify />} />
          </Route>
          {/* <Route path={USER_LIST_PATH}>
          <Route index path={USER_DETAIL_PATH}/>
        </Route> */}
        </Route>

        {/* // route : 공지사항 페이지 */}
        <Route path={NOTICE_PATH}>
          <Route path={NOTICE_LIST}>
            <Route path={NOTICE_DETAIL_PATH} />
          </Route>
          <Route path={NOTICE_REGIST_PATH} />
          <Route path={NOTICE_UPDATE_PATH} />
        </Route>

        {/* // route : Q&A 페이지 */}
        <Route path={QNA_PATH} element={<QnAContainer />}>
          <Route path={QNA_LIST_PATH}>
            <Route index element={<QnaList />} />
            <Route path={QNA_DETAIL_PATH} element={<QnaDetail />} />
            <Route path={QNA_UPDATE_PATH} />
          </Route>
          <Route path={QNA_REGIST_PATH} />
          <Route path={QNA_MY_LIST_PATH} />
        </Route>

        {/* <Route path={COMPANY_PATH}>
        <Route path={COMPANY_LIST_PATH}/>
        <Route path={COMPANY_REGIST_PATH}/>
        <Route path={COMPANY_UPDATE_PATH}/>
      </Route> */}

        {/* // route : 관리자 페이지 */}
        <Route path={ADMIN_PATH} element={<AdminContainer />}>
          <Route index element={<AdminUserIndex />} />
          {/* // route : 관리자 - 회원관리 페이지 */}
          <Route path={ADMIN_USER_PATH}>
            <Route index element={<div style={{ backgroundColor: 'red' }}>asdasd</div>} />
            <Route path={ADMIN_USER_DETAIL_PATH} element={<>회원 상세 보기</>} />
          </Route>

          {/* // route : 관리자 - 업체관리 페이지 */}
          <Route path={ADMIN_COMPANY_PATH}>
            <Route index element={<>업체 리스트</>} />
            <Route path={ADMIN_COMPANY_REGIST_PATH} element={<>업체 등록</>} />
            <Route path={ADMIN_COMPANY_UPDATE_PATH} element={<>업체 수정</>} />
          </Route>

          {/* // route : 관리자 - 예약관리 페이지 */}
          <Route path={ADMIN_RESERVATION_PATH}>
            <Route index element={<>예약 리스트</>} />
            <Route path={ADMIN_RESERVATION_UPDATE_PATH} element={<>예약 수정</>} />
          </Route>

          {/* // route : 관리자 - 게시물관리 페이지 */}
          <Route path={ADMIN_BOARD_PATH}>
            <Route index element={<AdminBoardIndex />} />
            {/* // route : 관리자 - 게시물 (공지사항) 관리 페이지 */}
            <Route path={ADMIN_BOARD_NOTICE_PATH}>
              <Route index element={<>공지사항 관리 리스트 페이지</>} />
              <Route path={ADMIN_BOARD_NOTICE_WRITE_PATH} element={<>공지사항 작성 페이지</>} />
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
