import React, { useState, useEffect, useCallback, useRef } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import ManageJob from "../components/ManageJob";
import Map from "../components/Map";
import "./styles/register.css";
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
  };

  return (
    <div className="register">
      <Popup
        alert={alert}
        message={alertMessage}
        clickCancel={() => {
          setAlert(false);
        }}
      />
      {showMap && (
        <div className="map-container">
          <Map handleLocation={handleLocation} show={showMap} />
        </div>
      )}

      <main>
        <h1> ลงทะเบียน </h1>
        <form className={showMap ? "blurred" : ""}>
          {page === 0 && (
            <section className="signup-form">
              <section>
                <b>สมัครเป็น</b>
                <section>
                  <label>
                    <input
                      name="user_role"
                      type="radio"
                      onChange={handleChange}
                      autoComplete="off"
                      value="customer"
                    />
                    <span>ผู้ใช้ทั่วไป</span>
                  </label>
                  <label>
                    <input
                      name="user_role"
                      type="radio"
                      onChange={handleChange}
                      autoComplete="off"
                      value="maid"
                    />
                    <span>แม่บ้าน</span>
                  </label>
                </section>
              </section>

              <section>
                <b>เพศ</b>
                <section>
                  <label>
                    <input
                      name="user_gender"
                      type="radio"
                      onChange={handleChange}
                      autoComplete="off"
                      value="male"
                    />
                    <span>เพศชาย</span>
                  </label>
                  <label>
                    <input
                      name="user_gender"
                      type="radio"
                      onChange={handleChange}
                      autoComplete="off"
                      value="female"
                    />
                    <span>เพศหญิง</span>
                  </label>
                  <label>
                    <input
                      name="user_gender"
                      type="radio"
                      onChange={handleChange}
                      autoComplete="off"
                      value="lgbtq"
                    />
                    <span>LGBTQ+</span>
                  </label>
                </section>
              </section>

              <label>
                <b>ชื่อ</b>
                <input
                  name="firstname"
                  type="text"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.firstname}
                  // required
                />
              </label>

              <label>
                <b>นามสกุล</b>
                <input
                  name="lastname"
                  type="text"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.lastname}
                  // required
                />
              </label>

              <label className="birthday-label">
                <b>วันเกิด</b>
                <section>
                  <LuCalendarDays />
                  <input
                    className="birthday"
                    name="birthday"
                    type="date"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.birthday}
                    // required
                  />
                </section>
              </label>
              <label>
                <b>เกี่ยวกับฉัน</b>
                <textarea
                  name="description"
                  type="text"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.description}
                />
              </label>

              <label>
                <b>เบอร์โทรศัพท์</b>
                <input
                  name="tel"
                  type="text"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.tel}
                  maxLength={10}
                  // required
                />
              </label>

              <label>
                <b>อีเมล</b>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.email}
                  //required
                />
              </label>

              <label>
                <b>ที่อยู่</b>
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

              <label>
                <b>รายละเอียดที่อยู่เพิ่มเติม</b>
                <input
                  name="minfo"
                  type="text"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.minfo}
                />
              </label>

              <label>
                <b>รหัสผ่าน</b>
                <input
                  name="pass"
                  type="password"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.pass}
                  //required
                />
              </label>

              <label>
                <b>ยืนยันรหัสผ่าน</b>
                <input
                  name="cfpw"
                  type="password"
                  onChange={(e) => setCfpw(e.target.value)}
                  autoComplete="off"
                  value={cfpw}
                  //required
                />
                <p
                  style={
                    isMatch
                      ? { display: "none" }
                      : { color: "red", "font-size": "14px" }
                  }
                >
                  {" "}
                  รหัสผ่านไม่ตรงกัน
                </p>
              </label>

              {page === 0 && user.user_role === "maid" && (
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
              )}
            </section>
          )}
          <footer className="footer-2">
            {page === 1 && (
              <section className="addjob-form">
                <ManageJob user={user} handleChange={handleChange} />
              </section>
            )}
            {page === 1 && (
              <button className="button-2" type="submit" onClick={handleSubmit}>
                {" "}
                ลงทะเบียน{" "}
              </button>
            )}
            <label className="back-to-login">
              <a href="/login">กลับหน้าสู่หน้าลงชื่อเข้าใช้งาน</a>
            </label>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Register;
