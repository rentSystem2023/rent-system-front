import React from 'react'
import { Outlet } from 'react-router-dom';
import useUserStore from 'src/stores/user.store'

export default function QnAContainer() {

    const { loginUserRole } = useUserStore();

  return (
    <div>
        {/* { loginUserRole === 'ROLE_ADMIN' ?
        <div>관리자</div> :
        <div>사용자</div>
        } */}
        <Outlet />
    </div>
  )
}
