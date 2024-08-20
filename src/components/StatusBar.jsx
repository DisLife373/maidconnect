import { useEffect } from "react";
import { NavLink, Outlet, redirect, useNavigate } from "react-router-dom";
// import "./css/StatusBar.css";
function StatusBar({ firstpage, secondpage, thirdpage }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('wait')
  }, [])
  return (
    <>
      <header className="statusbar-container">
        <nav className="space-x-2 m-10 py-3 px-5 bg-light-green gap-2 rounded-full">
          <NavLink to="wait" className="py-1 px-2 border rounded-full sm:text-base lg:text-basexl"> {firstpage} </NavLink>
          <NavLink to="work" className="py-1 px-2 border rounded-full sm:text-base lg:text-basexl"> {secondpage} </NavLink>
          <NavLink to="end" className="py-1 px-2 border rounded-full sm:text-base lg:text-basexl"> {thirdpage} </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      {/* <footer className="statusbar-container">
        <nav className="statusbar-nav">
          <NavLink to="wait"> {firstpage} </NavLink>
          <NavLink to="work"> {secondpage} </NavLink>
          <NavLink to="end"> {thirdpage} </NavLink>
        </nav>
      </footer> */}
    </>
  );
}

export default StatusBar;