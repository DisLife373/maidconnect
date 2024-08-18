import { NavLink, Outlet } from "react-router-dom";
// import "./css/StatusBar.css";
function StatusBar() {
  return (
    <>
      {/* <main>
        <nav className="statusbar-nav bg-light-green pt-5">
          <NavLink to="wait"> {firstpage} </NavLink>
          <NavLink to="work"> {secondpage} </NavLink>
          <NavLink to="end"> {thirdpage} </NavLink>
        </nav>
      </main> */}
      <main className="statusbar-container">
        <Outlet />
      </main>
    </>
  );
}

export default StatusBar;