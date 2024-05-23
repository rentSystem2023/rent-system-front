import { Outlet } from "react-router-dom";
import "./style.css";

function TopBar() {
    return (
        <>
        <div className="logo-container">로고</div>
        <div className="top-bar-container">
            <div className="top-bar-button">
            <div className="board-button">공지사항</div>
            <div className="board-button">문의사항</div>
            </div>
            <div className="top-bar-button">
            <div className="board-button">로그인</div>
            <div className="board-button">회원가입</div>
            </div>
        </div>
        </>
    );
    }

    export default function ServiceContainer() {
    return (
        <div id="wrapper">
        <TopBar />
        <div className="main-container">
            <Outlet />
        </div>
        </div>
    );
}
