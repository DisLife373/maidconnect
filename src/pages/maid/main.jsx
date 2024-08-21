import { useEffect, useState } from "react";
import { th } from "date-fns/locale";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
// import './styles/main.css'
import api from "../../axios";
import toast from "react-hot-toast";
import SummaryInvoice from "../../components/SummaryInvoice";
import ProfileBox from "../../components/ProfileBox";

function MaidMain() {
  const today = new Date();
  const [invoice_id, setInvoiceId] = useState(null);
  const [selected, setSelected] = useState(today);
  const [invoices, setInvoices] = useState([
    {
      invoice_id: 1,
      user_id: 1,
      user_pic: "",
      firstname: "atchi",
      lastname: "nate",
      jobs: [
        { job_id: 1, job_name: "กวาดบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
      ],
      start_time: "13:00:00",
    },
    {
      invoice_id: 2,
      user_id: 2,
      user_pic: "",
      firstname: "atchi",
      lastname: "nate",
      jobs: [
        { job_id: 1, job_name: "กวาดบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
      ],
      start_time: "13:00:00",
    },
    {
      invoice_id: 3,
      user_id: 3,
      user_pic: "",
      firstname: "atchi",
      lastname: "nate",
      jobs: [
        { job_id: 1, job_name: "กวาดบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
      ],
      start_time: "13:00:00",
    },
    {
      invoice_id: 4,
      user_id: 4,
      user_pic: "",
      firstname: "atchi",
      lastname: "nate",
      jobs: [
        { job_id: 1, job_name: "กวาดบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
      ],
      start_time: "13:00:00",
    },
    {
      invoice_id: 5,
      user_id: 5,
      user_pic: "",
      firstname: "atchi",
      lastname: "nate",
      jobs: [
        { job_id: 1, job_name: "กวาดบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
      ],
      start_time: "13:00:00",
    },
  ]);

  useEffect(() => {
    const handleDateChange = async () => {
      try {
        // const getInvoiceByDay = api.post(`/api/v1/invoice/maid/main`, {date: format(selected, 'yyyy-MM-dd')})
        const getInvoiceByDay = await api.post("/api/v1/invoice/maid/main", {
          date: format(selected, "yyyy-MM-dd"),
          token: window.localStorage.getItem("authtoken"),
        });
        if (getInvoiceByDay.status !== 200) {
          console.log(getInvoiceByDay.data.error);
          toast.error("มีปัญหาบางอย่างเกิดขึ้น กรุณารีเฟรชหน้าจออีกครั้ง");
        } else {
          setInvoices(getInvoiceByDay.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleDateChange();
  }, [selected]);

  /*const formatCaption: DateFormatter = (date, options) => {
      const y = date.getFullYear().toLocaleString(th);
      const m = format(date, 'LLLL', { locale: options?.locale });
      return `${m} ${y}`;
      };*/

  const handleClickSummary = (invId) => () => {
    setInvoiceId(invId);
  };

  return (
    <main className="main-maid grid grid-cols-3">
      <header className="calendar grid content-center bg-light-green h-screen px-10 py-5">
            <section className="">
                  <DayPicker
                        captionLayout="dropdown"
                        classNames={{
                              caption_label: "text-dark-green text-basexl sm:text-xl md:text-2xl",
                              nav_button: "text-dark-green bg-transparent hover:text-white p-3 transition-colors duration-300",
                              head_row: "text-dark-green text-base sm:text-basexl md:text-xl border-t-4 border-b-2 border-green-darkness",
                              // tbody: "justify-self-end",
                              day_selected: "text-white bg-dark-pink rounded-full transition duration-20",
                              day_today: "border-2 border-dark-pink rounded-full",
                              nav: "gap-x-2 grid grid-cols-2",
                              month: "grid gap-y-5",
                              table: "w-full",
                              caption_end: "w-full",
                              caption_start: "w-full",
                              button: "hover:bg-light-pink",
                              button_reset: "hover:light-pink rounded-full",
                        }}
                        mode="single"
                        showOutsideDays
                        required
                        selected={selected}
                        onSelect={setSelected}
                        locale={th}
                  />
            </section>
      </header>
      <main className={"profile-box px-10 py-5 gap-y-2 flex flex-wrap overscroll-contain h-screen overflow-y-auto col-span-2 w-full"}>
        {invoices.map((invoice, invoiceid) => (
            <section key={invoiceid} className="grid grid-cols-2 group">
                        {invoice.user_id && (
                              <ProfileBox
                                    user={invoice}
                                    // buttonName="รับงานนี้"
                                    // clickConfirm={() => handleClickConfirm(customer.invoice_id)}
                                    // clickCancel={() => handleClickCancel(customer.invoice_id)}
                                    // handleClickSummary={handleClickSummary}
                                    canClick={false}
                                    maidmain={true}
                              />
                        )}
                        <SummaryInvoice
                              role={"maid"}
                              invoice_id={invoice.invoice_id}
                              main={true}
                        />
            </section>

          // <article key={customid} className='customer-box' onClick={handleClickSummary(custom.invoice_id)}>
          //       <section>
          //             <p> { custom.start_time.split(':')[0]}:00 </p>
          //       </section>
          //       <section className='user-inform'>
          //                   {custom.user_pic ? (
          //                         <img src={"../../public/imageGalleries/" + custom.user_pic} />
          //                         ) : (
          //                         <img
          //                               src={"../../public/imageGalleries/1716567567852no_account.png"}
          //                         />
          //                   )}
          //             <article>
          //                   <header>{custom.firstname} {custom.lastname}</header>
          //                   <section>
          //                         {custom.jobs.slice(0, 5).map((job, jobid) => (

          //                                     <span key={jobid}>{job.job_name}</span>
          //                         ))}
          //                         {custom.jobs.length > 5 && <span> more... </span>}
          //                   </section>
          //             </article>
          //       </section>
          // </article>
        ))}
      </main>
    </main>
  );
}

export default MaidMain;
