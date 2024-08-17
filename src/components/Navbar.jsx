import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  BsFillHouseDoorFill,
  BsPersonFillGear,
  BsListUl,
} from "react-icons/bs";
import { GiBroom } from "react-icons/gi";
// import "./css/NewNavbar.css";
function StatusBar() {
  const isStatusActive = location.pathname.startsWith("/status");
  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const logout = () => {
    window.localStorage.clear();
  };

  return (
    <>
      <header>
        <nav className="bg-background-color grid grid-cols-2 px-5">
         <img src="/graphic/MaidConnect.svg" alt="" className="w-44" />
          <div className="container content-center">
            <div className="logo"></div>
            <div className="menu-icon" onClick={handleShowNavbar}></div>
            <div className={`nav-elements${showNavbar && "active"}`}>
              <ul className="flex border justify-end gap-5">
                <li>
                  <NavLink to="main" className={"navbar-menu sm:text-basexl md:text-xl"}>หน้าหลัก</NavLink>
                </li>
                <li>
                  <NavLink
                    to="status/wait"
                    className={({ isActive }) =>
                      isActive || isStatusActive ? "active navbar-menu sm:text-basexl md:text-xl" : "navbar-menu sm:text-basexl md:text-xl"
                    }
                  >
                    งานของคุณ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="profile" className="navbar-menu sm:text-basexl md:text-xl">โปรไฟล์ของคุณ</NavLink>
                </li>
                <li>
                  <NavLink to="/login" onClick={logout} className={"text-base sm:text-basexl md:text-xl text-dark-green"}>
                    ออกจากระบบ
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default StatusBar;
