import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { AUTH_PATH, COMPANY_LIST_PATH, COMPANY_PATH, COMPANY_REGIST_PATH, COMPANY_UPDATE_PATH, MAIN_ABSOLUTE_PATH, MAIN_PATH, NOTICE_DETAIL_PATH, NOTICE_LIST, NOTICE_PATH, NOTICE_REGIST_PATH, NOTICE_UPDATE_PATH, QNA_DETAIL_PATH, QNA_LIST_ABSOLUTE_PATH, QNA_LIST_PATH, QNA_MY_LIST_PATH, QNA_PATH, QNA_REGIST_PATH, QNA_UPDATE_PATH, SIGN_IN_PATH, SIGN_UP_PATH, USER_DETAIL_PATH, USER_INFO_PATH, USER_LIST_ABSOLUTE_PATH, USER_LIST_PATH, USER_PATH, USER_UPDATE_PATH } from './constant';
import ServiceContainer from './layouts/ServiceContainer';
import UserList from './views/User/List';
import QnaList from './views/Board/qna/QnaList';
import QnAContainer from './layouts/QnAContainer';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import Main from './views/Main';
import SignIn from './views/Authentication/SignIn';
import SignUp from './views/Authentication/SignUp';
import QnaDetail from './views/Board/qna/QnaDetail';

function Index() {
  
  // state
  const [cookies] = useCookies();

  // function
  const navigator = useNavigate();

  // effect
  useEffect(() => {
    const accessToken = cookies.accessToken;

    if(!accessToken) { // 로그인이 안되어있는 상태
      navigator(MAIN_ABSOLUTE_PATH);
    } 

  }, []);
  
  // render
  return<></>;
}

function App() {
  return (
  <Routes>
    <Route index element={<Index/>}/>
    <Route path={MAIN_PATH} element={<ServiceContainer/>}>
      <Route index element={<Main/>}/>

      <Route path={AUTH_PATH}>
        <Route path={SIGN_IN_PATH} element={<SignIn/>}/>
        <Route path={SIGN_UP_PATH} element={<SignUp/>}/>
      </Route>

      <Route path={USER_PATH}>
        <Route path={USER_INFO_PATH}>
          <Route path={USER_UPDATE_PATH}/>
        </Route>
        <Route path={USER_LIST_PATH}>
          <Route path={USER_DETAIL_PATH}/>
        </Route>
      </Route>

      <Route path={NOTICE_PATH}>
        <Route path={NOTICE_LIST}>
          <Route path={NOTICE_DETAIL_PATH}/>
        </Route>
        <Route path={NOTICE_REGIST_PATH}/>
        <Route path={NOTICE_UPDATE_PATH}/>
      </Route>

      <Route path={QNA_PATH} element={<QnAContainer />}>
        <Route path={QNA_LIST_PATH} element={<QnaList/>}>
          <Route path={QNA_DETAIL_PATH} element={<QnaDetail/>}/>
          <Route path={QNA_UPDATE_PATH}/>
        </Route>
        <Route path={QNA_REGIST_PATH}/>
        <Route path={QNA_MY_LIST_PATH}/>
      </Route>

      <Route path={COMPANY_PATH}>
        <Route path={COMPANY_LIST_PATH}/>
        <Route path={COMPANY_REGIST_PATH}/>
        <Route path={COMPANY_UPDATE_PATH}/>
      </Route>
    </Route>
  </Routes>
  );
}

export default App;