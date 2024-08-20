import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import SummaryInvoice from "../../components/SummaryInvoice";
import "../../components/Helmet.jsx";
import api from "../../axios";

function MaidStatusEnd() {
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
    }
  ]);
  const [invoice_id, setInvoiceId] = useState(null);
  // useEffect(() => {
  //   const fetchCustomer = async () => {
  //     try {
  //       const res = await api.post("/api/v1/invoice/maid/status/end", {
  //         token: window.localStorage.getItem("authtoken"),
  //       });
  //       setCustomers(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchCustomer();
  // }, []);
  const handleClickSummary = (invId) => {
    setInvoiceId(invId);
  };

  return (
    <>
      {invoice_id && (
        <SummaryInvoice
          role={"maid"}
          invoice_id={invoice_id}
          clickCancel={() => setInvoiceId(null)}
        />
      )}
      <div 
        // style={{ marginBottom: "10vw" }}
        className="px-10 grid grid-cols-3 gap-5 row-auto "
      >
        {customers.map((customer, customerid) => (
          <section
            key={customerid}
            //     onClick={handleClickSummary(customer.invoice_id)}
          >
            {customer.user_id && (
              <ProfileBox
                user={customer}
                canClick={false}
                handleClickSummary={handleClickSummary}
                buttonName="เสร็จสิ้นแล้ว"
              />
            )}
          </section>
        ))}
      </div>
    </>
  );
}

export default MaidStatusEnd;
