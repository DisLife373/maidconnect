import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import SummaryInvoice from "../../components/SummaryInvoice";
import Alert from "../../components/Alert";
import toast from "react-hot-toast";
import Popup from "../../components/Popup";
import api from "../../axios";

function UserStatusWait() {
  const invoiceID = useRef(null);
  const [invoice_id, setInvoiceId] = useState(null);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await api.post("/api/v1/invoice/customer/status/wait", {
          token: window.localStorage.getItem("authtoken"),
        });
        setCustomers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCustomer();
  }, []);
  useEffect(() => {
    console.log(customers);
  }, [customers]);

  const handleClickSummary = (invId) => {
    setInvoiceId(invId);
  };

  const handleClickCancelOK = async (e) => {
    setAlertConfirm(false);
    try {
      const deleteInvoiceJob = await api.delete(
        `/api/v1/invoiceJob/${invoiceID.current}`
      );
      if (deleteInvoiceJob.status !== 200) {
        console.log(deletetask.data.error);
      } else {
        const deletetask = await api.delete(
          `/api/v1/invoice/${invoiceID.current}`
        );
        if (deletetask.status !== 200) {
          toast.error("กรุณาลองอีกครั้ง");
          console.log(deletetask.data.error);
        } else {
          toast.success("ยกเลิกงานแล้วเรียบร้อย");
          setCustomers((prevInvoice) =>
            prevInvoice.filter((item) => item.invoice_id !== invoiceID.current)
          );
          console.log(deletetask.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickCancel = (id) => {
    setAlertConfirm(true);
    console.log(id);
    invoiceID.current = id;
  };

  return (
    <>
      <Alert />
      <Popup
        alert={alertConfirm}
        message={"ต้องการยกเลิกงานนี้ ใช่ หรือ ไม่"}
        clickCancel={() => {
          setAlertConfirm(false);
        }}
        clickOK={handleClickCancelOK}
      />
      
      <div style={{ marginBottom: "10vw" }} className={"px-10 grid row-auto w-full " + `${invoice_id ? "grid-cols-1" : "grid-cols-3 gap-5"}`}>
        {!invoice_id && customers.map((customer, customerin) => (
          <section key={customerin}>
            {customer.user_id && (customer.status === "wait" || customer.status === "") ? (
              <ProfileBox
                user={customer}
                canClick={false}
                handleClickSummary={handleClickSummary}
                buttonName="รอแม่บ้านยืนยัน"
              />
            ) : customer.status === "work" ? (
              <ProfileBox
                user={customer}
                canClick={false}
                handleClickSummary={handleClickSummary}
                buttonName="แม่บ้านยืนยันแล้ว"
              />
            ) : (
              <ProfileBox
                user={customer}
                name="cancel"
                handleClickSummary={handleClickSummary}
                clickConfirm={() => handleClickCancel(customer.invoice_id)}
                buttonName="ยกเลิก"
              />
            )}
          </section>
        ))}
        {invoice_id && (
          <SummaryInvoice
            role={"customer"}
            invoice_id={invoice_id}
            clickCancel={() => setInvoiceId(null)}
          />
        )}
      </div>
    </>
  );
}

export default UserStatusWait;
