import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import SummaryInvoice from "../../components/SummaryInvoice";
import api from "../../axios";

function UserStatusWork() {
  const invoiceID = useRef(null);
  const [invoice_id, setInvoiceId] = useState(null);
  const [maids, setMaids] = useState([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await api.post("/api/v1/invoice/customer/status/work", {
          token: window.localStorage.getItem("authtoken"),
        });
        setMaids(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCustomer();
  }, []);

  const handleClickSummary = (invId) => {
    setInvoiceId(invId);
  };
  return (
    <>
      <div
        style={{ marginBottom: "10vw" }}
        className={
          "px-10 grid row-auto w-full " +
          `${invoice_id ? "grid-cols-1" : "grid-cols-3 gap-5"}`
        }
      >
        {invoice_id && (
          <SummaryInvoice
            role={"customer"}
            invoice_id={invoice_id}
            clickCancel={() => setInvoiceId(null)}
          />
        )}

        {!invoice_id &&
          maids.map((maid, index) => (
            <section key={index}>
              {maid.user_id && (
                <ProfileBox
                  user={maid}
                  canClick={false}
                  buttonName="กำลังทำงาน..."
                  handleClickSummary={handleClickSummary}
                />
              )}
            </section>
          ))}
      </div>
    </>
  );
}

export default UserStatusWork;
