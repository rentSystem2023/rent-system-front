import { useEffect, useState } from 'react'
import "./style.css";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_COMPANY_LIST_ABSOLUTE_PATH, ADMIN_RESERVATION_LIST_ABSOLUTE_PATH, ADMIN_USER_LIST_ABSOLUTE_PATH } from 'src/constant';

type Path = '회원 관리' | '업체 관리' | '예약 관리' | '' ;
interface Props {
    path: Path;
}

//                    component                    //
function SideBar ({ path } : Props) {

    const userClass = `admin-side-navigation-item${path === '회원 관리' ? ' active' : ''}`;
    const companyClass = `admin-side-navigation-item${path === '업체 관리' ? ' active' : ''}`;
    const reservationClass = `admin-side-navigation-item${path === '예약 관리' ? ' active' : ''}`;

    //                    function                    //
    const navigator = useNavigate(); 

    //                event handler                    //
    const onUserClickHandler = () => navigator(ADMIN_USER_LIST_ABSOLUTE_PATH);
    const onCompanyClickHandler = () => navigator(ADMIN_COMPANY_LIST_ABSOLUTE_PATH);
    const onReservationClickHandler = () => navigator(ADMIN_RESERVATION_LIST_ABSOLUTE_PATH);

    //                    Render                       //
    return (
        <div className="admin-side-navigation-container">
            <div className={userClass} onClick={onUserClickHandler}>
                <div className="admin-side-navigation-icon person"></div>
                <div className="admin-side-navigation-item-title">회원 관리</div>
            </div>
            <div className={companyClass} onClick={onCompanyClickHandler}>
                <div className="admin-side-navigation-icon office"></div>
                <div className="admin-side-navigation-item-title">업체 관리</div>
            </div>
            <div className={reservationClass} onClick={onReservationClickHandler}>
                <div className="admin-side-navigation-icon check"></div>
                <div className="admin-side-navigation-item-title">예약 관리</div>
            </div>
        </div>
    );
}

//                    component                    //
export default function AdminContainer() {

    //                      state                      //
    const { pathname } = useLocation();

    const [path, setPath] = useState<Path>('');

    //                    effect                       //
    useEffect(() => {
        const path = 
            pathname.startsWith(ADMIN_USER_LIST_ABSOLUTE_PATH) ? '회원 관리' :
            pathname.startsWith(ADMIN_COMPANY_LIST_ABSOLUTE_PATH) ? '업체 관리' :
            pathname.startsWith(ADMIN_RESERVATION_LIST_ABSOLUTE_PATH) ? '예약 관리' : '';

        setPath(path);
    }, [pathname]);

    //                    Render                       //
    return (
        <div id='admin-wrapper'>
            <SideBar path={path}/>
            <div className='admin-main'>
                <Outlet />
            </div>
        </div>
    );
}
