import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import Popup from "../../components/Popup";
import "./styles/blurBackground.css";
import api from "../../axios";
import toast from "react-hot-toast";
import Alert from "../../components/Alert";
import SummaryInvoice from "../../components/SummaryInvoice";

function MaidStatusWait() {
  const invoiceID = useRef(null);
  const [invoice_id, setInvoiceId] = useState(null);
  const [customers, setCustomers] = useState([
    {
      invoice_id: 4,
      customer_id: 29,
      maid_id: 1,
      status: 'work',
      work_date: '2024-06-04T17:00:00.000Z',
      start_time: '13:42:41',
      work_time: 0,
      end_time: '15:42:18',
      amount: 560,
      note: 'ไม่ต้องรดต้นใหญ่',
      jobs: [ {job_id: 1, job_name: 'ถูบ้าน'},
        {job_id: 2, job_name: 'ถูบ้าน'},
        {job_id: 3, job_name: 'ถูบ้าน'},
        {job_id: 4, job_name: 'ถูบ้าน'},
        {job_id: 5, job_name: 'ถูบ้าน'},
        {job_id: 6, job_name: 'ถูบ้าน'},
        {job_id: 7, job_name: 'ถูบ้าน'}],
      user_id: 29,
      user_pic: 'Great Grey Wolf MuNew.png1716870745749',
      firstname: 'กีรตาพันธ์',
      lastname: 'มาลัยย่ะ',
    },
    {
      invoice_id: 4,
      customer_id: 29,
      maid_id: 1,
      status: 'work',
      work_date: '2024-06-04T17:00:00.000Z',
      start_time: '13:42:41',
      work_time: 0,
      end_time: '15:42:18',
      amount: 560,
      note: 'ไม่ต้องรดต้นใหญ่',
      jobs: [ {job_id: 1, job_name: 'ถูบ้าน'},
        {job_id: 2, job_name: 'ถูบ้าน'},
        {job_id: 3, job_name: 'ถูบ้าน'},
        {job_id: 4, job_name: 'ถูบ้าน'},
        {job_id: 5, job_name: 'ถูบ้าน'},
        {job_id: 6, job_name: 'ถูบ้าน'},
        {job_id: 7, job_name: 'ถูบ้าน'}],
      user_id: 29,
      user_pic: 'Great Grey Wolf MuNew.png1716870745749',
      firstname: 'กีรตาพันธ์',
      lastname: 'มาลัยย่ะ',
    },
    {
      invoice_id: 4,
      customer_id: 29,
      maid_id: 1,
      status: 'work',
      work_date: '2024-06-04T17:00:00.000Z',
      start_time: '13:42:41',
      work_time: 0,
      end_time: '15:42:18',
      amount: 560,
      note: 'ไม่ต้องรดต้นใหญ่',
      jobs: [ {job_id: 1, job_name: 'ถูบ้าน'},
        {job_id: 2, job_name: 'ถูบ้าน'},
        {job_id: 3, job_name: 'ถูบ้าน'},
        {job_id: 4, job_name: 'ถูบ้าน'},
        {job_id: 5, job_name: 'ถูบ้าน'},
        {job_id: 6, job_name: 'ถูบ้าน'},
        {job_id: 7, job_name: 'ถูบ้าน'}],
      user_id: 29,
      user_pic: 'Great Grey Wolf MuNew.png1716870745749',
      firstname: 'กีรตาพันธ์',
      lastname: 'มาลัยย่ะ',
    },
    {
      invoice_id: 4,
      customer_id: 29,
      maid_id: 1,
      status: 'work',
      work_date: '2024-06-04T17:00:00.000Z',
      start_time: '13:42:41',
      work_time: 0,
      end_time: '15:42:18',
      amount: 560,
      note: 'ไม่ต้องรดต้นใหญ่',
      jobs: [ {job_id: 1, job_name: 'ถูบ้าน'},
        {job_id: 2, job_name: 'ถูบ้าน'},
        {job_id: 3, job_name: 'ถูบ้าน'},
        {job_id: 4, job_name: 'ถูบ้าน'},
        {job_id: 5, job_name: 'ถูบ้าน'},
        {job_id: 6, job_name: 'ถูบ้าน'},
        {job_id: 7, job_name: 'ถูบ้าน'}],
      user_id: 29,
      user_pic: 'Great Grey Wolf MuNew.png1716870745749',
      firstname: 'กีรตาพันธ์',
      lastname: 'มาลัยย่ะ',
    },
    {
      invoice_id: 4,
      customer_id: 29,
      maid_id: 1,
      status: 'work',
      work_date: '2024-06-04T17:00:00.000Z',
      start_time: '13:42:41',
      work_time: 0,
      end_time: '15:42:18',
      amount: 560,
      note: 'ไม่ต้องรดต้นใหญ่',
      jobs: [ {job_id: 1, job_name: 'ถูบ้าน'},
        {job_id: 2, job_name: 'ถูบ้าน'},
        {job_id: 3, job_name: 'ถูบ้าน'},
        {job_id: 4, job_name: 'ถูบ้าน'},
        {job_id: 5, job_name: 'ถูบ้าน'},
        {job_id: 6, job_name: 'ถูบ้าน'},
        {job_id: 7, job_name: 'ถูบ้าน'}],
      user_id: 29,
      user_pic: 'Great Grey Wolf MuNew.png1716870745749',
      firstname: 'กีรตาพันธ์',
      lastname: 'มาลัยย่ะ',
    },
    {
      invoice_id: 4,
      customer_id: 29,
      maid_id: 1,
      status: 'work',
      work_date: '2024-06-04T17:00:00.000Z',
      start_time: '13:42:41',
      work_time: 0,
      end_time: '15:42:18',
      amount: 560,
      note: 'ไม่ต้องรดต้นใหญ่',
      jobs: [ {job_id: 1, job_name: 'ถูบ้าน'},
        {job_id: 2, job_name: 'ถูบ้าน'},
        {job_id: 3, job_name: 'ถูบ้าน'},
        {job_id: 4, job_name: 'ถูบ้าน'},
        {job_id: 5, job_name: 'ถูบ้าน'},
        {job_id: 6, job_name: 'ถูบ้าน'},
        {job_id: 7, job_name: 'ถูบ้าน'}],
      user_id: 29,
      user_pic: 'Great Grey Wolf MuNew.png1716870745749',
      firstname: 'กีรตาพันธ์',
      lastname: 'มาลัยย่ะ',
    },
    {
      invoice_id: 4,
      customer_id: 29,
      maid_id: 1,
      status: 'work',
      work_date: '2024-06-04T17:00:00.000Z',
      start_time: '13:42:41',
      work_time: 0,
      end_time: '15:42:18',
      amount: 560,
      note: 'ไม่ต้องรดต้นใหญ่',
      jobs: [ {job_id: 1, job_name: 'ถูบ้าน'},
        {job_id: 2, job_name: 'ถูบ้าน'},
        {job_id: 3, job_name: 'ถูบ้าน'},
        {job_id: 4, job_name: 'ถูบ้าน'},
        {job_id: 5, job_name: 'ถูบ้าน'},
        {job_id: 6, job_name: 'ถูบ้าน'},
        {job_id: 7, job_name: 'ถูบ้าน'}],
      user_id: 29,
      user_pic: 'Great Grey Wolf MuNew.png1716870745749',
      firstname: 'กีรตาพันธ์',
      lastname: 'มาลัยย่ะ',
    }
  ]);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [alertCancel, setAlertCancel] = useState(false);

  // useEffect(() => {
  //   const fetchCustomer = async () => {
  //     try {
  //       const res = await api.post("/api/v1/invoice/maid/status/wait", {
  //         token: window.localStorage.getItem("authtoken"),
  //       });
  //       setCustomers(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchCustomer();
  // }, []);

  const handleClickConfirmOK = async () => {
    try {
      const changestatus = await api.put(
        `/api/v1/invoice/${invoiceID.current}/${"work"}`
      );
      if (changestatus.status !== 200) {
        console.log(changestatus.data.error);
      } else {
        toast.success("ยืนยันรับงานแล้วเรียบร้อย");
        setCustomers((prevInvoice) =>
          prevInvoice.filter((item) => item.invoice_id !== invoiceID.current)
        );
      }
      setAlertConfirm(false);
    } catch (err) {
      console.log(err);
      toast.error("คุณมีงานในวันและเวลานี้อยู่แล้ว");
    }
  };

  const handleClickCancelOK = async (e) => {
    setAlertCancel(false);
    try {
      const cancleJob = await api.put(
        `/api/v1/invoice/${invoiceID.current}/${"cancel"}`
      );
      if (cancleJob.status !== 200) {
        toast.error("กรุณาลองอีกครั้ง");
        console.log(cancleJob.data.error);
      } else {
        toast.success("ยกเลิกงานแล้วเรียบร้อย");
        setCustomers((prevInvoice) =>
          prevInvoice.filter((item) => item.invoice_id !== invoiceID.current)
        );
        console.log(cancleJob.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickConfirm = (id) => {
    setAlertConfirm(true);
    invoiceID.current = id;
  };

  const handleClickCancel = (id) => {
    setAlertCancel(true);
    console.log(id);
    invoiceID.current = id;
  };

  const handleClickSummary = (invId) => {
    setInvoiceId(invId);
    console.log(invId);
  };

  return (
    <>
      <Alert />
      <Popup
        alert={alertConfirm}
        message={"ต้องการทำงานนี้ ใช่ หรือ ไม่"}
        clickCancel={() => {
          setAlertConfirm(false);
        }}
        clickOK={handleClickConfirmOK}
      />
      <Popup
        alert={alertCancel}
        message={"ต้องการยกเลิกงานนี้ ใช่ หรือ ไม่"}
        clickCancel={() => {
          setAlertCancel(false);
        }}
        clickOK={handleClickCancelOK}
      />
      {invoice_id && (
        <SummaryInvoice
          role={"maid"}
          invoice_id={invoice_id}
          clickCancel={() => setInvoiceId(null)}
        />
      )}
      <div
        // className={`page-container ${
        //   alertConfirm || alertCancel ? "blurred" : ""
        // }`}
        // style={{ marginBottom: "10vw" }}
        className={"px-10 grid grid-cols-3 gap-5 row-auto" + `${alertCancel || alertConfirm ? " backdrop-blur-xl" : ""}`}
        // className={alertConfirm === true ? "px-10 grid grid-cols-3 gap-5 row-auto backdrop-grayscale-0 bg-white/30" : "px-10 grid grid-cols-3 gap-5 row-auto"}
        // className="bg-light-pink h-screen"
      >
        {customers.map((customer, customerid) => (
          <section key={customerid}>
            {customer.user_id && (
              <ProfileBox
                user={customer}
                buttonName="รับงานนี้"
                clickConfirm={() => handleClickConfirm(customer.invoice_id)}
                clickCancel={() => handleClickCancel(customer.invoice_id)}
                handleClickSummary={handleClickSummary}
              />
            )}
          </section>
        ))}
      </div>
    </>
  );
}

export default MaidStatusWait;
