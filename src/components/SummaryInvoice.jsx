import { useEffect, useState } from "react";
import api from "../axios";
// import "./css/SummaryInvoice.css";
import { MdCancel, MdCall, MdMail } from "react-icons/md";
import moment from "moment";

function SummaryInvoice({ invoice_id, role, clickCancel, main=false }) {
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
      {!main ?
        <div className="invoice-summary">
        <div className="content-invoice-summary">
          <span onClick={() => clickCancel(null)} className="cancel-icon">
            <MdCancel color="#00897B" />
          </span>
          <header>
            <header>โปรไฟล์</header>
            <section className="profile-descript">
              {invoice.user_pic ? (
                <img
                  src={"../../public/imageGalleries/" + invoice.user_pic}
                  alt="User"
                />
              ) : (
                <img
                  src={
                    "../../public/imageGalleries/1716567567852no_account.png"
                  }
                  alt="Default User"
                />
              )}
              <header>
                {invoice.firstname} {invoice.lastname}
              </header>
            </section>
            <article className="user-profile">
              <section className="personal-info">
                <header>ข้อมูลทั่วไป</header>
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
              <section className="contact-info">
                <header>ช่องทางติดต่อ</header>
                <section>
                  <b>{!main ? "เบอร์โทร:" : <MdCall />}</b>
                  <span>{invoice.tel}</span>
                </section>
                <section>
                  <b>{!main ? "อีเมล:" : <MdMail />}</b>
                  <span>{invoice.email}</span>
                </section>
              </section>
              <section className="address-info">
                <header>ที่อยู่</header>
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
          <main className="invoice-profile">
            <header> รายละเอียดงาน </header>
            <article className="dateroom-info">
              <section>
                <b>ชนิดห้อง:</b>
                <section>
                  <span>{invoice.room_size}</span>
                </section>
                <span>{invoice.room_type}</span>
              </section>
              <section>
                <b>วันที่-เวลา:</b>
                <span>{dateFormat}</span>
                <span>
                  {invoice.start_time?.split(":", 1)[0]}.00 น. -{" "}
                  {invoice.end_time?.split(":", 1)[0]}.00 น.
                </span>
              </section>
              <section>
                <b>ค่าจ้าง:</b>
                <span>{invoice.amount} ฿</span>
              </section>
            </article>
            <article className="job-chips">
              <b>งานที่ต้องทำ</b>
              <section>
                {invoice.jobs?.map((job, jobindex) => (
                  <span key={jobindex}>{job.job_name}</span>
                ))}
              </section>
            </article>
          </main>
        </div>
      </div>
      :
        <div className="content-invoice-summary text-normal p-2 rounded-r-3xl border-l-0 border-4 border-background-color">
            <article className="user-profile">
              <section className="contact-info">
                <header className="bg-light-green">ช่องทางติดต่อ</header>
                <section className="flex items-center gap-x-2">
                  <b className="text-dark-green"><MdCall /></b>
                  <span>{invoice.tel}</span>
                </section>
                <section className="flex items-center gap-x-2">
                  <b className="text-dark-green"><MdMail /></b>
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
              <section className="bg-light-green rounded-xl p-1">
                <b>ชนิดห้อง:</b>
                <section>
                  <span>{invoice.room_size}</span>
                </section>
                <span>{invoice.room_type}</span>
              </section>
              <section className="bg-light-green rounded-xl p-1">
                <b>ค่าจ้าง:</b>
                <span>{invoice.amount} ฿</span>
              </section>
            </article>
        </div>
      }
    </>
  );
}

export default SummaryInvoice;
{/* <div className={main ? "nonoverlay" : "overlay"} onClick={() => clickCancel(null)}></div> */}
