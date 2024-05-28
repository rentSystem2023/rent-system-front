import React from 'react';
import './style.css';
import { Outlet } from 'react-router-dom';

export default function UserContainer() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}
