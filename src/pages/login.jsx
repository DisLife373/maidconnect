import { useState, useCallback, useContext } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
// import "./styles/login.css";
import Alert from "../components/Alert";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    account: "",
    password: "",
  });
  const [alert, setAlert] = useState("");

  const login = async (value) => await api.post("/api/v1/account/login", value);

  const handleChange = useCallback(
    (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    },
    [user]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email: user.account, pass: user.password })
      .then((res) => {
        window.localStorage.setItem("authtoken", res.data.token);
        navigate("/" + res.data.payload.user.role + "/main");
      })
      .catch((err) => {
        setAlert(err.response.data.err);
        toast.error("กรุณาลองใหม่อีกครั้ง");
      });
  };

  return (
    <div className="bg-background-color flex justify-center items-center h-dvh" >
      <Alert />
      <main className="grid grid-cols-3 w-full h-full" >
        <div className="bg-no-repeat bg-contain bg-center col-span-2 pb-4 m-20" style={{ backgroundImage: "url(/graphic/login.svg)"}}></div>
        {/* <img src="/public/graphic/login.svg" alt="login background" className="z-01 " /> */}
        <form onSubmit={handleSubmit} className="login-container bg-white  p-10 flex flex-col justify-center space-y-10">
          <h1 className="text-green-darkness text-xl sm:text-2xl md:text-3l lg:text-4xl xl:text-5xl"> ลงชื่อเข้าใช้ </h1>
          <label
            onClick={() => {
              setAlert("");
            }}
            className="label-text-form group" 
          >
            <span className="span-head-form sm:text-sm md:text-base lg:text-basexl">อีเมล</span>
            <input
              name="account"
              type="text"
              onChange={handleChange}
              autoComplete="off"
              value={user.account}
              required
              placeholder="example@mail.com"
              className="input-text-form peer sm:text-sm md:text-base"
            />
            <span
              className="text-form-alert sm:text-sx md:text-sm lg:text-base"
              style={
                alert === "acc"
                  ? { color: "red", "font-size": "14px" }
                  : { display: "none" }
              }
            >
              ไม่พบบัญชีผู้ใช้
            </span>
          </label>

          <label
            onClick={() => {
              setAlert("");
            }}
              className="label-text-form group"
          >
            <span className="span-head-form sm:text-sm md:text-base lg:text-basexl">รหัสผ่าน</span>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              autoComplete="off"
              value={user.password}
              required
              className="input-text-form peer sm:text-sm md:text-base"
            />
            <span
              className="text-form-alert sm:text-sx md:text-sm lg:text-base"
              style={
                alert === "pass"
                  ? { color: "red" }
                  : { display: "none" }
              }
            >
              รหัสผ่านไม่ถูกต้อง
            </span>
          </label>
          <label className=" flex flex-col pt-4">
            <button type="submit" className="btn-ok sm:text-sm md:text-base lg:text-basexl"> เข้าสู่ระบบ </button>
            <span className="mt-4">
              ยังไม่มีบัญชีผู้ใช้&nbsp; <a href="/register" className="text-dark-pink">สร้างบัญชี</a>
            </span>
          </label>
        </form>
      </main>
    </div>
  );
}

export default Login;
