import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MAIN_PATH, QNA_LIST_ABSOLUTE_PATH, USER_LIST_ABSOLUTE_PATH, USER_LIST_PATH } from './constant';
import ServiceContainer from './layouts/ServiceContainer';
import UserList from './views/User/List';
import QnaList from './views/Board/qna';


function App() {
  return (
  <Routes>
    <Route path={MAIN_PATH} element={<ServiceContainer/>} />    
    <Route path={USER_LIST_ABSOLUTE_PATH} element={<UserList/>} />
    <Route path={QNA_LIST_ABSOLUTE_PATH} element={<QnaList/>} />
  </Routes>
  );
}

export default App;