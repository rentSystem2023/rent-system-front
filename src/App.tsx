import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MAIN_PATH, QNA_LIST_ABSOLUTE_PATH, QNA_LIST_PATH, QNA_PATH, USER_LIST_ABSOLUTE_PATH, USER_LIST_PATH } from './constant';
import ServiceContainer from './layouts/ServiceContainer';
import UserList from './views/User/List';
import QnaList from './views/Board/qna';
import QnAContainer from './layouts/QnAContainer';


function App() {
  return (
  <Routes>
    <Route path={MAIN_PATH} element={<ServiceContainer/>} />
    <Route path={QNA_PATH} element={<QnAContainer />}>
      <Route path={QNA_LIST_PATH} element={<QnaList/>} />
    </Route>
  </Routes>
  );
}

export default App;