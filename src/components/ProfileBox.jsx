// import "./css/ProfileBox.css";
import "moment/locale/th";

function ProfileBox({
  user,
  name = null,
  clickConfirm,
  clickCancel,
  buttonName = "",
  canClick = true,
  handleClickSummary,
  maidmain = false
}) {
  const date = new Date(user.work_date);
  const result = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  
  return (
    
    <div
      className={
        name
          ? "h-full profilebox-wrapper rounded-3xl border-4 border-dark-pink hover:bg-light-pink/25 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300"
          : "h-full profilebox-wrapper rounded-3xl border-4 border-background-color hover:bg-light-green transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300"
      }
    >
      <section
        className="profilebox-container p-3 grid grid-cols-4 content-center gap-3 h-full"
        id={name && "cancel"}
      >
        {user.user_pic ? (
          <img
            src={"../../public/imageGalleries/" + user.user_pic}
            onClick={() => {
              handleClickSummary(user.invoice_id);
            }}
            className="aspect-square rounded-full place-self-center"
          />
        ) : (
          <img
            src={"../../public/imageGalleries/1716567567852no_account.png"}
            onClick={() => {
              handleClickSummary(user.invoice_id);
            }}
            className="aspect-square rounded-full place-self-center"
          />
        )}

        <div className="profilebox-content col-span-3 grid gap-y-2 ">
          <article
            className="profilebox-information"
            onClick={() => {
              handleClickSummary(user.invoice_id);
            }}
          >
            <header className="text-smbase sm:text-base lg:text-basexl text-dark-green">
              {" "}
              {user.firstname} {user.lastname}{" "}
            </header>

            <section className="job-date">
              <section>
                <b
                // className="font-semibold text-sm sm:text-smbase lg:text-base"
                >
                  วันที่ :
                </b>
                <span className="text-sx sm:text-sm md:text-base">
                  {result}
                </span>
              </section>
              <section>
                <b>เวลา :</b>
                <span className="text-sx sm:text-sm md:text-base">
                  {user.start_time?.split(":")[0]}.
                  {user.start_time?.split(":")[1]} น. -{" "}
                  {user.end_time?.split(":")[0]}.{user.end_time?.split(":")[1]}{" "}
                  น.
                </span>
              </section>
            </section>
            {!maidmain ? (
              <section className="job-chips flex flex-wrap gap-x-2 gap-y-1">
                {user.jobs?.slice(0, 9).map((job, job_index) => (
                  <span
                    key={job_index}
                    className="text-ss sm:text-sx md:text-sm bg-light-pink px-2 rounded-full"
                  >
                    {job.job_name}
                  </span>
                ))}
                {user.jobs?.length > 9 && (
                  <span className="text-ss sm:text-sx md:text-sm bg-light-pink px-2 rounded-full">
                    {" "}
                    more...{" "}
                  </span>
                )}
              </section>
            ) : (
              <section className="job-chips flex flex-wrap gap-x-2 gap-y-1">
                {user.jobs?.map((job, job_index) => (
                  <span
                    key={job_index}
                    className="text-ss sm:text-sx md:text-sm bg-light-pink px-2 rounded-full"
                  >
                    {job.job_name}
                  </span>
                ))}
              </section>
            )}
          </article>
          {canClick && buttonName !== "" ? (
            <footer
              className={
                name
                  ? "justify-self-end grid justify-items-end"
                  : clickCancel && clickConfirm
                  ? "justify-self-end grid grid-cols-2 justify-items-end gap-x-2"
                  : "justify-self-end grid justify-items-end"
              }
            >
              {name && (
                <span className="maid-cancel text-sx sm:text-sm md:text-base text-rose-600">
                  แม่บ้านไม่รับงานนี้ กรุณากดยกเลิก
                </span>
              )}
              {clickConfirm && (
                <button
                  onClick={clickConfirm}
                  className="text-white text-sx sm:text-sm md:text-base bg-green-darkness px-3 py-1 rounded-full hover:bg-background-color active:bg-green-darkness transition duration-500"
                >
                  {" "}
                  {buttonName}{" "}
                </button>
              )}
              {clickCancel && (
                <button
                  onClick={clickCancel}
                  className="text-green-darkness text-sx sm:text-sm md:text-base px-3 py-1 rounded-full border-2 border-green-darkness hover:border-background-color hover:bg-background-color hover:text-white active:bg-green-darkness"
                >
                  {/* {" "} */}
                  ปฏิเสธ
                  {/* {" "} */}
                </button>
              )}
            </footer>
          ) : (
            <footer className="footer-nobutton justify-self-end">
              <p
                style={{ margin: "12px 0 0 0" }}
                className="text-sx sm:text-sm md:text-base"
              >
                {" "}
                {buttonName}{" "}
              </p>
            </footer>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProfileBox;
