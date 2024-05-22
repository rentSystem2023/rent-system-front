import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MAIN_PATH } from './constant';
import ServiceContainer from './layouts/ServiceContainer';

function App() {
  return (
  <Routes>
    <Route path={MAIN_PATH} element={<ServiceContainer/>} />  
  </Routes>);
}

export default App;