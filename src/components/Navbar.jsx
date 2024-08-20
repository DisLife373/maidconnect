import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  BsFillHouseDoorFill,
  BsPersonFillGear,
  BsListUl,
} from "react-icons/bs";
import { GiBroom } from "react-icons/gi";
// import "./css/NewNavbar.css";
function Navbar({firstpage, secondpage, thirdpage}) {
  const isStatusActive = location.pathname.startsWith("/status");
  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const logout = () => {
    window.localStorage.clear();
  };

  console.log()

  return (
    <>
      <header>
        <nav className="relative bg-background-color grid grid-cols-2 px-5 w-full">
          <div className="w-40 content-end">
            <img src="/graphic/MaidConnect.svg" alt="" />
          </div>
          <div className="container content-center">
            <div className="logo"></div>
            <div className="menu-icon" onClick={handleShowNavbar}></div>
            <div className={`nav-elements${showNavbar && "active"}`}>
              <ul className=" flex justify-end gap-5">
                <li className="">
                  <NavLink to="main" className={"navbar-menu sm:text-basexl"}>หน้าหลัก</NavLink>
                </li>
                <li className="relative group">
                  <NavLink
                    to="status"
                    // className={({ isActive }) =>
                    //   isActive || isStatusActive ? "active navbar-menu sm:text-basexl md:text-xl" : "navbar-menu sm:text-basexl md:text-xl"
                    // }
                    className={"navbar-menu sm:text-basexl"}
                  >
                    งานของคุณ
                  </NavLink>
                  <ul className=" absolute hidden group-hover:flex flex-col gap-2 mt-5 bg-light-green p-2 shadow-lg p-10 w-40">
                    <li><NavLink to="status/wait" className="duration-500 text-smbase sm:text-base hover:text-background-color"> {firstpage} </NavLink></li>
                    <li><NavLink to="status/work" className="text-smbase sm:text-base hover:text-background-color"> {secondpage} </NavLink></li>
                    <li><NavLink to="status/end" className="text-smbase sm:text-base hover:text-background-color"> {thirdpage} </NavLink></li>
                  </ul>
                </li>
                <li>
                  <NavLink to="profile" className="navbar-menu sm:text-basexl">โปรไฟล์ของคุณ</NavLink>
                </li>
                <li>
                  <NavLink to="/login" onClick={logout} className={"navbar-menu sm:text-basexl bg-green-darkness rounded-full px-3 py-1 text-white hover:bg-light-green hover:text-green-darkness transition duration-500"}>
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

export default Navbar;
