import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { MAIN_ABSOLUTE_PATH, MAIN_PATH, QNA_LIST_ABSOLUTE_PATH, QNA_LIST_PATH, QNA_PATH, USER_LIST_ABSOLUTE_PATH, USER_LIST_PATH } from './constant';
import ServiceContainer from './layouts/ServiceContainer';
import UserList from './views/User/List';
import QnaList from './views/Board/qna';
import QnAContainer from './layouts/QnAContainer';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function Index() {
  
  // state
  const [cookies] = useCookies();

  // function
  const navigator = useNavigate();

  // effect
  useEffect(() => {
    const accessToken = cookies.accessToken;

    if(accessToken) { // 로그인이 되어있는 상태
      navigator(MAIN_ABSOLUTE_PATH);
    } else { // 로그인이 안되어있는 상태
      navigator(MAIN_ABSOLUTE_PATH);
    }

  }, []);
  
  // render
  return<></>;
}

function App() {
  return (
  <Routes>
    <Route index element={<Index/>} />
    <Route path={MAIN_PATH} element={<ServiceContainer/>}/>
    <Route path={QNA_PATH} element={<QnAContainer />}>
      <Route path={QNA_LIST_PATH} element={<QnaList/>} />
    </Route>
  </Routes>
  );
}

export default App;