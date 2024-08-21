import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import api from "../../axios";
import Profile from "../../components/Profile";
import "./css/maidProfile.css";

function UserOtherProfile() {
  const navigate = useNavigate();

  const [maid, setMaid] = useState(() => {
    const maidData = JSON.parse(window.localStorage.getItem("selectedMaid"));
    return maidData;
  });
  const [jobchoices, setJobchoices] = useState([]);
  const [allReview, setAllReview] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [rating, setRating] = useState(0);

  const fetchJobs = async (_mode) =>
    await api.get("/api/v1/job").then((res) => {
      setJobchoices(res.data);
    });

  const fetchReviews = async () => {
    await api
      .post("/api/v1/review/getReview", { maid_email: maid?.email })
      .then((res) => {
        setReviewCount(res.data.review_count);
        setAllReview(res.data.review_data);
        const rate_sum = res.data.review_data.reduce(
          (acc, review) => acc + review.star,
          0
        );
        setRating(rate_sum / res.data.review_count);
      });
  };

  const updateRating = async () =>
    await api
      .put("/api/v1/rating/updateRating", {
        maid_email: maid?.email,
        rating: rating,
      })
      .then((res) => {
        console.log(res.data.text);
      });

  useEffect(() => {
    fetchReviews();
    fetchJobs();
  }, []);

  useEffect(() => {
    updateRating();
  }, [rating]);

  const clickButton = () => {
    navigate("employ");
  };

  return (
    <>
      <main className="customer-maidprofile grid grid-cols-2 p-10">
        <article className="bg-light-green rounded-2xl grid gap-3 p-5">
          <main className="grid grid-cols-2">
            <figure className="profile-descript flex flex-col items-center">
              {maid.user_pic ? (
                <img
                  src={`../../../public/imageGalleries/${maid?.user_pic}`}
                  style={{ width: "30vw" }}
                  className="w-full h-full max-w-48 max-h-48 aspect-square rounded-full place-self-center object-cover"
                />
              ) : (
                <img
                  src={`../../../public/imageGalleries/1716567567852no_account.png`}
                  style={{ width: "30vw" }}
                  className="w-full h-full max-w-48 max-h-48 aspect-square rounded-full place-self-center object-cover"
                />
              )}
              <header className="text-dark-green justify-self-center text-basexl sm:text-xl">
                {maid.firstname} {maid.lastname}
              </header>
            </figure>
            <section className="grid grid-rows-2 gap-3 ">
                <div className="bg-background-color rounded-2xl p-5 grid grid-cols-4">
                  <b className="self-center">คะแนน</b>
                  <span className="self-center col-span-3 text-base sm:text-basexl md:text-xl text-white">{rating} / 5.0</span>
                </div>
                <div className="bg-background-color rounded-2xl p-5 grid grid-cols-4">
                  <b className="self-center">ระยะทาง</b>
                  <span className="self-center col-span-3 text-base sm:text-basexl md:text-xl text-white"> {maid.address_distance.toFixed(2)} กม. </span>
                </div>
              </section>
          </main>
          <article className="grid grid-rows-6 gap-y-5">
            <section className="row-span-2 rounded-2xl border-4 border-background-color relative h-full">
              <b className="absolute -top-4 left-0 bg-light-green px-2">ข้อมูลเพิ่มเติม</b>
              <span className="flex flex-wrap gap-x-2 gap-y-1 mt-4 p-2 text-sx sm:text-sm md:text-base"> {maid.description} </span>
            </section>
            <section className="row-span-2 rounded-2xl border-4 border-background-color relative h-full">
              <b className="absolute -top-4 left-0 bg-light-green px-2">ประเภทงาน</b>
              <section className="job-chips flex flex-wrap gap-x-1 gap-y-1 mt-4 p-2 overflow-y-auto">
                {jobchoices.length > 0
                  ? jobchoices
                      .filter((choice) => maid.jobs.includes(choice.job_id))
                      .map((job, index) => (
                        <span key={index} className="rounded-full bg-light-pink px-2">{job.job_name}</span>
                      ))
                  : ""}
              </section>
            </section>
            <footer className="justify-self-center">
              <button onClick={clickButton} className="btn-ok sm:text-sm md:text-base lg:text-basexl"> จ้างแม่บ้าน </button>
            </footer>
          </article>
        </article>
        <article className="text-normal p-2 rounded-r-3xl border-l-0 border-4 border-background-color p-5">
          <header className="text-basexl sm:text-xl text-dark-green">รีวิว</header>
          <section className="grid gap-3">
              {allReview?.map((review, index) => (
                <section key={index} className="bg-light-green rounded-3xl p-5 ">
                  <section className="flex">
                      <b className="text-sm sm:text-base md:text-basexl">
                        {review.firstname} {review.lastname} &nbsp;&nbsp;
                      </b>
                    ให้คะแนน &nbsp;
                    {[...Array(5)].map((star, starid) => {
                      const ratingValue = starid + 1;
                      return (
                        <label key={starid}>
                          <FaStar
                            color={
                              ratingValue <= review.star ? "#E1829B" : "#e4e5e9"
                            }
                          />
                        </label>
                      );
                    })}
                    </section>
                      {/* <section className="read-more mb-12 flex">
                        <input
                          id={`read-more-checkbox-${index}`}
                          type="checkbox"
                          className="read-more__checkbox"
                          aria-hidden="true"
                        />
                        <p className="read-more__text mb-2">{review.comment}</p>
                        <label
                          style={{ color: "#E1829B" }}
                          htmlFor={`read-more-checkbox-${index}`}
                          className="read-more__label"
                          data-read-more="อ่านเพิ่มเติม"
                          data-read-less="อ่านน้อยลง"
                          aria-hidden="true"
                        ></label>
                      </section> */}
                      <section className="read-more mb-12 flex flex-col">
                        <input
                          id={`read-more-checkbox-${index}`}
                          type="checkbox"
                          className="read-more__checkbox hidden"
                          aria-hidden="true"
                        />
                        <p className="read-more__text mb-2 overflow-hidden text-ellipsis whitespace-normal max-h-16 transition-all duration-300">
                          {review.comment}
                        </p>
                        <label
                          style={{ color: "#E1829B" }}
                          htmlFor={`read-more-checkbox-${index}`}
                          className="read-more__label cursor-pointer text-sm font-medium self-start"
                          aria-hidden="true"
                        >
                            <span className="read-more__text-hidden">อ่านเพิ่มเติม</span>
                            <span className="read-more__text-visible hidden">อ่านน้อยลง</span>
                        </label>
                    </section>
                  </section>
              ))}
            </section>
        </article>
      </main>
    </>
  );
}

export default UserOtherProfile;
