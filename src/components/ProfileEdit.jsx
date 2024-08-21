import { useRef, useState, useEffect } from "react";
import ManageJob from "./ManageJob";
// import "./css/ProfileEdit.css";
import moment from "moment/moment";

function ProfileEdit({
  user,
  checkPass,
  userPass,
  handleChange,
  handleImageChange,
  manageJob = null,
  clickSubmit,
  clickCancle,
}) {
  const userImg = useRef(null);
  const [cfpw, setCfpw] = useState("");

  const isMatch = userPass !== "" ? userPass === cfpw : false;

  // useEffect(() => {
  //   console.log(userPass);
  // }, [userPass]);

  return (
    <main className="editprofile-wrapper grid grid-cols-5 p-10 gap-5">
      <header className="flex items-center">
        <figure>
          <label>
            {user.user_pic ? (
              <img 
                src={"../../public/imageGalleries/" + user.user_pic} 
                className="w-full h-full max-w-48 max-h-48 aspect-square rounded-full place-self-center object-cover cursor-pointer outline outline-offset-2 outline-4 outline-background-color"
              />
            ) : (
              <img
                src={"../../public/imageGalleries/1716567567852no_account.png"}
                className="w-full h-full max-w-48 max-h-48 aspect-square rounded-full place-self-center object-cover cursor-pointer outline outline-offset-2 outline-4 outline-background-color"
              />
            )}
            <input
              name="user_pic"
              type="file"
              ref={userImg}
              style={{ display: "none" }}
              onChange={handleImageChange}
            ></input>
          </label>
        </figure>
      </header>
      <main className={"text-normal col-span-4 grid" + `${ManageJob ? "grid-cols-subgrid" : "grid-cols-2"}`}>
        <main className={"col-span-2 grid grid-cols-subgrid " + `${ManageJob && " gap-x-5"}`}>
          <section className="radio-wrapper col-span-2">
            <b className="span-head-form sm:text-sm md:text-base lg:text-basexl"> Role </b>
            <section className="grid grid-cols-2 w-fit gap-5">
              <label className="input-radio-label">
                <input
                  name="role"
                  type="radio"
                  onChange={handleChange}
                  autoComplete="off"
                  value="user"
                  checked={user.user_role === "customer"}
                  disabled={true}
                  className="input-radio"
                />
                <span className="checkmark">ผู้ใช้ทั่วไป</span>
              </label>
              <label className="input-radio-label">
                <input
                  type="radio"
                  name="role"
                  onChange={handleChange}
                  autoComplete="off"
                  value="maid"
                  checked={user.user_role === "maid"}
                  disabled={true}
                  className="input-radio"
                />
                <span className="checkmark">แม่บ้าน</span>
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
              value={user.firstname || ""}
              required
              className="input-text-form peer sm:text-sm md:text-base"
            />
          </label>

          <label className="label-text-form group">
            <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">นามสกุล</b>
            <input
              name="lastname"
              type="text"
              onChange={handleChange}
              autoComplete="off"
              value={user.lastname || ""}
              required
              className="input-text-form peer sm:text-sm md:text-base"
            />
          </label>

          <label className="label-text-form group">
            <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">วันเกิด</b>
            <input
              name="birthday"
              type="date"
              onChange={handleChange}
              autoComplete="off"
              value={moment(user.birthday).format("YYYY-MM-DD")}
              required
              className="birthday input-text-form peer sm:text-sm md:text-base"
            />
          </label>

          <label className="label-text-form group">
            <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">เบอร์โทร</b>
            <input
              name="telephone"
              type="text"
              onChange={handleChange}
              autoComplete="off"
              value={user.tel || ""}
              maxLength={10}
              required
              className="input-text-form peer sm:text-sm md:text-base"
            />
          </label>

          <label className="label-text-form group">
            <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">อีเมล</b>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              autoComplete="off"
              value={user.email || ""}
              required
              className="input-text-form peer sm:text-sm md:text-base"
            />
          </label>

          <label className="label-text-form group col-span-2 h-full">
            <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">เกี่ยวกับฉัน</b>
            <textarea
              name="description"
              type="text"
              onChange={handleChange}
              autoComplete="off"
              value={user.description || ""}
              className="input-text-form peer sm:text-sm md:text-base resize-none"
            />
          </label>
          <label className="label-text-form group">
            <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">รหัสผ่านเก่า</b>
            <input
              name="oldpass"
              type="password"
              onChange={handleChange}
              autoComplete="off"
              value={user.oldpass || ""}
              required
              className="input-text-form peer sm:text-sm md:text-base"
            />
          </label>
          <label className="label-text-form group">
            <b className="span-head-form sm:text-sm md:text-base lg:text-basexl">รหัสผ่านใหม่</b>
            <input
              name="pass"
              type="password"
              onChange={handleChange}
              autoComplete="off"
              value={userPass || ""}
              required
              className="input-text-form peer sm:text-sm md:text-base"
            />
          </label>

          <label className="label-text-form group">
            <b className="span-head-form sm:text-sm md:text-base lg:text-basexl"> ยืนยันรหัสผ่าน </b>
            <input
              name="cfpw"
              type="password"
              onChange={(e) => setCfpw(e.target.value)}
              autoComplete="off"
              value={cfpw}
              required
              className="input-text-form peer sm:text-sm md:text-base"
            />
          </label>

          {checkPass ? (
            <p 
              style={isMatch ? { display: "none" } : {}}
              className="text-form-alert sm:text-sx md:text-sm lg:text-base"
            > รหัสผ่านไม่ตรงกัน</p>
          ) : user.oldpass != undefined ? (
            <p
              className="text-form-alert sm:text-sx md:text-sm lg:text-base"
            >รหัสผ่านเก่าผิด</p>
          ) : (
            ""
          )}
        </main>
        {manageJob && 
          <footer class="col-start-3 col-span-2">
            <ManageJob user={user} handleChange={handleChange} />
          </footer>
        }
      </main>
      <footer className="profile-footer col-span-5 flex justify-center gap-5">
          <button onClick={clickSubmit} className="text-white text-sx sm:text-sm md:text-base lg:text-basexl bg-green-darkness px-3 py-1 rounded-full hover:bg-background-color active:bg-green-darkness transition duration-500"> บันทึก </button>
          <button onClick={clickCancle} className="text-green-darkness text-sx sm:text-sm md:text-base lg:text-basexl px-3 py-1 rounded-full border-2 border-green-darkness hover:border-background-color hover:bg-background-color hover:text-white active:bg-green-darkness">
            {" "}
            ยกเลิก{" "}
          </button>
        </footer>
    </main>
  );
}

export default ProfileEdit;
