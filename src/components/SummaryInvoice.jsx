import { useEffect, useState } from "react";
import api from "../axios";
// import "./css/SummaryInvoice.css";
import { MdCancel, MdCall, MdMail } from "react-icons/md";
import moment from "moment";

function SummaryInvoice({ invoice_id, role, clickCancel, main = false }) {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await api.get(
          `/api/v1/invoice/${role}/summary/${invoice_id}`
        );
        setInvoice(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInvoice();
  }, [invoice_id, role]);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  const date = new Date(invoice.work_date);
  const dateFormat = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const gender = () => {
    if (invoice.user_gender === "male") {
      return "ชาย";
    } else if (invoice.user_gender === "female") {
      return "หญิง";
    } else {
      return invoice.user_gender;
    }
  };

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

  const birthday = moment(invoice.birthday);
  const bdate = birthday.date();
  const bmonth = thai_months[birthday.month()];
  const byear = birthday.year() + 543;

  const birthday_thai = bdate + " " + bmonth + " " + byear;
  const age = moment().diff(birthday, "years");

  return (
    <>
      {!main ? (
        <div className="invoice-summary text-normal rounded-2xl border-4 border-green-darkness">
          <div className="content-invoice-summary grid grid-cols-2 p-5 gap-x-5">
            <span onClick={() => clickCancel(null)} className="cancel-icon col-span-2 justify-self-end text-xl sm:text-2xl md:text-3xl">
              <MdCancel color="#00897B" />
            </span>
            <header className="">
            <header className="text-center self-center text-basexl sm:text-xl">โปรไฟล์</header>
              <section className="profile-descript flex flex-col items-center">
                {invoice.user_pic ? (
                  <img
                    src={"../../public/imageGalleries/" + invoice.user_pic}
                    alt="User"
                    className="w-full h-full max-w-48 max-h-48 aspect-square rounded-full place-self-center object-cover"
                  />
                ) : (
                  <img
                    src={
                      "../../public/imageGalleries/1716567567852no_account.png"
                    }
                    alt="Default User"
                    className="w-full h-full max-w-xs max-h-xs aspect-square rounded-full place-self-center object-cover"
                  />
                )}
                <header className="text-dark-green justify-self-center text-basexl sm:text-xl">
                  {invoice.firstname} {invoice.lastname}
                </header>
              </section>
              <article className="user-profile grid grid-cols-2 gap-3">
                <section className="personal-info p-2">
                  <header className="bg-light-green">ข้อมูลทั่วไป</header>
                  <section>
                    <b>เพศ:</b>
                    <span>{gender()}</span>
                  </section>
                  <section>
                    <b>วันเกิด:</b>
                    <span>{birthday_thai}</span>
                  </section>
                  <section>
                    <b>อายุ:</b>
                    <span>{age}</span>
                  </section>
                </section>
                <section className="contact-info p-2">
                  <header className="bg-light-green">ช่องทางติดต่อ</header>
                  <section>
                    <b>{!main ? "เบอร์โทร:" : <MdCall />}</b>
                    <span>{invoice.tel}</span>
                  </section>
                  <section>
                    <b>{!main ? "อีเมล:" : <MdMail />}</b>
                    <span>{invoice.email}</span>
                  </section>
                </section>
                <section className="address-info col-span-2 p-2">
                  <header className="bg-light-green">ที่อยู่</header>
                  <section>
                    <section>
                      <b>ละติจูด:</b>
                      <span>{invoice.latitude}</span>
                    </section>
                    <section>
                      <b>ลองจิจูด:</b>
                      <span>{invoice.longitude}</span>
                    </section>
                  </section>
                  <section>
                    <b>รายละเอียดเพิ่มเติม:</b>
                    <span>{invoice.address}</span>
                  </section>
                </section>
              </article>
            </header>
            <main className="invoice-profile flex flex-col gap-3 ">
            <header className="text-center self-center text-basexl sm:text-xl">รายละเอียดงาน</header>
              <article className="dateroom-info grid grid-cols-2 gap-3">
                <section className="bg-light-green rounded-2xl grid grid-rows-3 p-2">
                  <b>ชนิดห้อง:</b>
                  <section className="justify-self-center text-base sm:text-basexl md:text-xl text-dark-pink">
                    <span>{invoice.room_size}</span>
                  </section>
                  <span className="justify-self-center">{invoice.room_type}</span>
                </section>
                <section className="bg-light-green rounded-2xl grid grid-rows-3 p-2">
                  <b>วันที่-เวลา:</b>
                  <span className="text-base sm:text-basexl md:text-xl text-dark-pink">{dateFormat}</span>
                  <span>
                    {invoice.start_time?.split(":", 1)[0]}.00 น. -{" "}
                    {invoice.end_time?.split(":", 1)[0]}.00 น.
                  </span>
                </section>
                <section className="bg-light-green rounded-2xl col-span-2 flex items-center gap-x-3 p-2">
                  <b>ค่าจ้าง:</b>
                  <span className="text-base sm:text-basexl md:text-xl text-dark-pink">{invoice.amount} ฿</span>
                </section>
              </article>
              <article className="job-chips rounded-2xl border-4 border-light-green relative h-full">
                  <b className="absolute -top-4 left-0 bg-white px-2">งานที่ต้องทำ</b>
                  <section className="job-chips flex flex-wrap gap-x-2 gap-y-1 mt-4 p-2">
                     {invoice.jobs?.map((job, jobindex) => (
                        <span key={jobindex} className="bg-light-pink px-2 rounded-full">
                        {job.job_name}
                        </span>
                     ))}
                  </section>
               </article>
            </main>
          </div>
        </div>
      ) : (
        <div className="content-invoice-summary text-normal p-2 rounded-r-3xl border-l-0 border-4 border-background-color">
          <article className="user-profile">
            <section className="contact-info">
              <header className="bg-light-green">ช่องทางติดต่อ</header>
              <section className="flex items-center gap-x-2">
                <b className="text-dark-green">
                  <MdCall />
                </b>
                <span>{invoice.tel}</span>
              </section>
              <section className="flex items-center gap-x-2">
                <b className="text-dark-green">
                  <MdMail />
                </b>
                <span>{invoice.email}</span>
              </section>
            </section>
            <section className="address-info grid grid-cols-4 gap-x-1 ">
              <header className="col-span-4 bg-light-green">ที่อยู่</header>
              <section className="col-span-3 border-r-4 border-light-green">
                <span>{invoice.address}</span>
              </section>
              <section>
                <section>
                  <b>ละติจูด:</b>
                  <span>{invoice.latitude}</span>
                </section>
                <section>
                  <b>ลองจิจูด:</b>
                  <span>{invoice.longitude}</span>
                </section>
              </section>
            </section>
          </article>
          <article className="dateroom-info grid grid-cols-2 gap-x-1">
            <section className="bg-light-green rounded-xl p-1 flex gap-2">
              <b>ชนิดห้อง:</b>
              <section>
                <span>{invoice.room_size}</span>
              </section>
              {/* <span>{invoice.room_type}</span> */}
            </section>
            <section className="bg-light-green rounded-xl p-1 flex gap-2">
              <b>ค่าจ้าง:</b>
              <span>{invoice.amount} ฿</span>
            </section>
          </article>
        </div>
      )}
    </>
  );
}

export default SummaryInvoice;
{
  /* <div className={main ? "nonoverlay" : "overlay"} onClick={() => clickCancel(null)}></div> */
}
