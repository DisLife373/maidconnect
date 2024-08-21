// import "./css/NewProfile.css";
import moment from "moment";

function Profile({ user, isMaid = false, clickEdit }) {
  const thai_months = [
    "มรกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const birthday = moment(user.birthday);
  const date = birthday.date();
  const month = thai_months[birthday.month()];
  const year = birthday.year() + 543;

  const birthday_thai = date + " " + month + " " + year;
  const age = moment().diff(moment(user.birthday), "years");

  return (
    <main className="profile-wrapper p-10 flex flex-col gap-y-5">
      <header className="grid grid-cols-4 bg-light-green p-5 rounded-2xl col-span-2">
        {user.user_pic ? (
          <img 
            src={"../../public/imageGalleries/" + user.user_pic} 
            className="w-full h-full max-w-48 max-h-48 aspect-square rounded-full place-self-center object-cover"
          />
        ) : (
          <img
            src={"../../public/imageGalleries/1716567567852no_account.png"}
            className="w-full h-full max-w-48 max-h-48 aspect-square rounded-full place-self-center object-cover"
          />
        )}
        <main className="col-span-3 flex flex-col">
          <span className="text-dark-green justify-self-center text-basexl sm:text-xl">{user.firstname} {user.lastname}{" "}</span>
          <span>{user.description}</span>
        </main>
      </header>

      <main className="grid grid-cols-2 divide-x-4 divide-light-green rounded-2xl border-4 border-light-green">
        <main className="p-5 profile">
          <section>
            <b>วันเกิด</b>
            <span> {birthday_thai} </span>
          </section>
          <section>
            <b>อายุ</b>
            <span> {age} </span>
          </section>
          <section>
            <b>เบอร์โทร</b>
            <span> {user.tel} </span>
          </section>
          <section>
            <b>อีเมล</b>
            <span> {user.email} </span>
          </section>
        </main>
        {isMaid && (
          <footer className="jobs p-5">
              <b className="text-green-darkness grid">ประเภทงาน</b>
              <section className="job-chips flex flex-wrap gap-x-2 gap-y-1">
                {user.jobs &&
                  user.jobs.map((job, index) => (
                    <span key={index} className="bg-light-pink px-2 rounded-full"> {job.job_name} </span>
                  ))}
              </section>
          </footer>
        )}
      </main>
      <footer className="profile-footer self-center">
          <button onClick={clickEdit} className="text-white text-sx sm:text-sm md:text-base lg:text-basexl bg-green-darkness px-3 py-1 rounded-full hover:bg-background-color active:bg-green-darkness transition duration-500"> แก้ไข </button>
      </footer>
    </main>
  );
}

export default Profile;
