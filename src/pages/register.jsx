import React, { useState, useEffect, useCallback, useRef } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import ManageJob from "../components/ManageJob";
import Map from "../components/Map";
// import "./styles/register.css";
import { LuCalendarDays } from "react-icons/lu";

function Register() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  //const [jobchoices, setJobchoices] = useState({ job_id: "", job_name: "" });
  const [user, setUser] = useState({
    user_role: "",
    user_gender: "",
    user_pic: null,
    firstname: "",
    lastname: "",
    birthday: "",
    tel: "",
    email: "",
    pass: "",
    description: "",
    jobs: [],
    latitude: "",
    longitude: "",
    minfo: "",
  });
  const userImg = useRef(null);
  const [cfpw, setCfpw] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setMessage] = useState("");
  const [showMap, setShowMap] = useState(false);
  const isMatch = user.pass === cfpw;

  const handleChange = useCallback((e) => {
    const { name, value, files, checked } = e.target;

    if (name === "user_pic") {
      const file = files[0];
      setUser((prevUser) => ({ ...prevUser, user_pic: file }));
    } else if (name === "jobs") {
      const [valueId, valueName] = value.split("-");
      const jobsId = parseInt(valueId, 10);
      setUser((prevUser) => ({
        ...prevUser,
        jobs: checked
          ? [...prevUser.jobs, { job_id: jobsId, job_name: valueName }]
          : prevUser.jobs.filter((job) => job.job_id !== jobsId),
      }));
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result1 = await api.post("/api/v1/account/register", {
        user_role: user.user_role,
        user_gender: user.user_gender,
        firstname: user.firstname,
        lastname: user.lastname,
        birthday: user.birthday,
        tel: user.tel,
        description: user.description,
        email: user.email,
        pass: user.pass,
      });

      const result2 = await api.post("/api/v1/address/addAddress", {
        email: user.email,
        latitude: user.latitude,
        longitude: user.longitude,
        minfo: user.minfo,
      });
      if (user.user_role === "maid") {
        const result3 = await api.post("/api/v1/userJob/addUserjobs", {
          email: user.email,
          jobs: user.jobs,
        });

        const result4 = await api.post("/api/v1/rating/addRatings", {
          email: user.email,
        });
      }

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const nextPage = () => {
    setPage(1);
  };

  const SelectLocation = () => {
    setShowMap(!showMap);
  };

  const handleLocation = (latitude, longitude) => {
    setUser((prevState) => ({
      ...prevState,
      latitude: latitude,
      longitude: longitude,
    }));
    setShowMap(!showMap);
  };

  console.log(user)

  return (
    <div className="register bg-background-color h-dvh" >
      <Popup
        alert={alert}
        message={alertMessage}
        clickCancel={() => {
          setAlert(false);
        }}
      />
      {showMap && (
        <div className="map-container">
          <Map handleLocation={handleLocation} show={showMap}/>
        </div>
      )}

      <main className="grid grid-cols-3 w-full h-full ">
        <form className={showMap ? "blurred col-span-2 bg-white p-10" : "col-span-2 bg-white p-10"}>
          <h1 className="text-green-darkness text-xl sm:text-2xl md:text-3l lg:text-4xl xl:text-5xl"> ลงทะเบียน </h1>
          {page === 0 && (
            <section className="signup-form grid grid-cols-2 gap-1 gap-x-5 space-y-2">
              <section>
                <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">สมัครเป็น</b>
                <section className="grid grid-cols-2 w-fit gap-5">
                  <label className="input-radio-label">
                    <input
                      name="user_role"
                      type="radio"
                      onChange={handleChange}
                      autoComplete="off"
                      value="customer"
                      className="input-radio before:content[''] peer"
                    />
                    <span>ผู้ใช้ทั่วไป</span>
                  </label>
                  <label className="input-radio-label">
                    <input
                      name="user_role"
                      type="radio"
                      onChange={handleChange}
                      autoComplete="off"
                      value="maid"
                      className="input-radio before:content[''] peer"
                    />
                    <span>แม่บ้าน</span>
                  </label>
                </section>
              </section>

              <section>
                <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">เพศ</b>
                <section className="grid grid-cols-3 w-fit gap-5">
                  <label className="input-radio-label">
                    <input
                      name="user_gender"
                      type="radio"
                      onChange={handleChange}
                      autoComplete="off"
                      value="male"
                      className="input-radio before:content[''] peer"
                    />
                    <span>เพศชาย</span>
                  </label>
                  <label className="input-radio-label">
                    <input
                      name="user_gender"
                      type="radio"
                      onChange={handleChange}
                      autoComplete="off"
                      value="female"
                      className="input-radio before:content[''] peer"
                    />
                    <span>เพศหญิง</span>
                  </label>
                  <label className="input-radio-label">
                    <input
                      name="user_gender"
                      type="radio"
                      onChange={handleChange}
                      autoComplete="off"
                      value="lgbtq"
                      className="input-radio before:content[''] peer"
                    />
                    <span>LGBTQ+</span>
                  </label>
                </section>
              </section>

              <label className="label-text-form group">
                <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">ชื่อ</b>
                <input
                  name="firstname"
                  type="text"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.firstname}
                  className="input-text-form peer sm:text-sm md:text-base"
                />
              </label>
              
                {/* <div class="relative w-full min-w-[200px] h-10">
                  <input
                    class="peer w-full h-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " 
                  />
                  <label
                    class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                  >
                    ชื่อ
                  </label>
                </div> */}
              

              <label className="label-text-form group" >
                <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">นามสกุล</b>
                <input
                  name="lastname"
                  type="text"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.lastname}
                  className="input-text-form peer sm:text-sm md:text-base"
                />
              </label>

              <label className="label-text-form group col-span-2" >
                <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">วันเกิด</b>
                <section className="grid grid-cols-2">
                  {/* <LuCalendarDays /> */}
                  <input
                    className="birthday input-text-form peer sm:text-sm md:text-base"
                    name="birthday"
                    type="date"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.birthday}
                    // required
                  />
                </section>
              </label>
              <label className="label-text-form group col-span-2" >
                <b className="span-head-form sm:text-sm md:text-base lg:text-basexl resize-none">เกี่ยวกับฉัน</b>
                <textarea
                  name="description"
                  type="text"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.description}
                  className="input-text-form peer sm:text-sm md:text-base resize-none"
                />
              </label>

              <label className="label-text-form group" >
                <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">เบอร์โทรศัพท์</b>
                <input
                  name="tel"
                  type="text"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.tel}
                  maxLength={10}
                  className="input-text-form peer sm:text-sm md:text-base"
                />
              </label>

              <label className="label-text-form group" >
                <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">อีเมล</b>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.email}
                  className="input-text-form peer sm:text-sm md:text-base"
                />
              </label>

              <label className="label-text-form group" >
                <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">ที่อยู่</b>
                <label> ละติจูด : {user.latitude}</label>
                <label> ลองจิจูด : {user.longitude}</label>
                <button
                  className="select-map"
                  type="button"
                  onClick={SelectLocation}
                >
                  กดที่นี่
                </button>
              </label>

              <label className="label-text-form group" >
                <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">รายละเอียดที่อยู่เพิ่มเติม</b>
                <input
                  name="minfo"
                  type="text"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.minfo}
                  className="input-text-form peer sm:text-sm md:text-base"
                />
              </label>

              <label className="label-text-form group" >
                <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">รหัสผ่าน</b>
                <input
                  name="pass"
                  type="password"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.pass}
                  className="input-text-form peer sm:text-sm md:text-base"
                />
              </label>

              <label className="label-text-form group" >
                <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">ยืนยันรหัสผ่าน</b>
                <input
                  name="cfpw"
                  type="password"
                  onChange={(e) => setCfpw(e.target.value)}
                  autoComplete="off"
                  value={cfpw}
                  className="input-text-form peer sm:text-sm md:text-base"
                />
                <p
                  className="text-form-alert sm:text-sx md:text-sm lg:text-base"
                  style={
                    isMatch
                      ? { display: "none" }
                      : { color: "red" }
                  }
                >
                  {" "}
                  รหัสผ่านไม่ตรงกัน
                </p>
              </label>
              {/* {page === 0 && user.user_role === "maid" && (
                <button type="button" onClick={nextPage}>
                  {" "}
                  หน้าถัดไป{" "}
                </button>
              )}
              {((page === 0 && user.user_role === "customer") ||
                page === 1) && (
                <button type="submit" onClick={handleSubmit}>
                  {" "}
                  ลงทะเบียน{" "}
                </button>
              )} */}
            </section>
          )}
          <footer className={page === 0 ? "grid grid-cols-2 mt-10" : "grid grid-cols-2"}>
            {page === 1 && (
              <section className="addjob-form col-span-2 mb-10">
                <ManageJob user={user} handleChange={handleChange} />
              </section>
            )}
            <label className="back-to-login flex grid content-center">
              <a href="/login" className="text-dark-pink">กลับหน้าสู่หน้าลงชื่อเข้าใช้งาน</a>
            </label>
            {page === 1 && (
              <button 
                className="button-2 btn-ok sm:text-sm md:text-base lg:text-xl" 
                type="submit" onClick={handleSubmit}
              >
                {" "}
                ลงทะเบียน{" "}
              </button>
            )}
            { page === 0 && 
              <button 
                    type="button" 
                    onClick={page === 0 && user.user_role === "maid" ? nextPage : handleSubmit}
                    disabled={user.user_role === ""}
                    className={user.user_role === "" ? "btn-disable justify-self-end w-full sm:text-sm md:text-base lg:text-xl" : "btn-ok sm:text-sm md:text-base lg:text-xl"}
                  >
                    {" "}
                    {page === 0 && (user.user_role === "customer" || user.user_role === "") ? "ลงทะเบียน" : "หน้าถัดไป"}
                    {" "}
              </button>
            }
          </footer>
        </form>
        <div className="bg-no-repeat bg-contain bg-center pb-4 mx-10" style={{ backgroundImage: "url(/graphic/register.svg)"}}></div>
      </main>
    </div>
  );
}

export default Register;
