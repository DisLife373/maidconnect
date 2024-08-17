import { useState, useEffect } from "react";
// import "./css/ManageJob.css";
import api from "../axios";

function ManageJob({ user, handleChange }) {
  const [jobchoices, setJobchoices] = useState([
    {job_id: 1, job_name: 'ถูบ้าน'},
    {job_id: 2, job_name: 'ถูบ้าน'},
    {job_id: 3, job_name: 'ถูบ้าน'},
    {job_id: 4, job_name: 'ถูบ้าน'},
    {job_id: 5, job_name: 'ถูบ้าน'},
    {job_id: 6, job_name: 'ถูบ้าน'},
    {job_id: 7, job_name: 'ถูบ้าน'},
    {job_id: 9, job_name: 'ถูบ้าน'},
    {job_id: 10, job_name: 'ถูบ้าน'},
    {job_id: 11, job_name: 'ถูบ้าน'},
    {job_id: 12, job_name: 'ถูบ้าน'},
    {job_id: 13, job_name: 'ถูบ้าน'},
    {job_id: 14, job_name: 'ถูบ้าน'},
    {job_id: 15, job_name: 'ถูบ้าน'},
    {job_id: 16, job_name: 'ถูบ้าน'},
    {job_id: 17, job_name: 'ถูบ้าน'},
    {job_id: 18, job_name: 'ถูบ้าน'},
    {job_id: 19, job_name: 'ถูบ้าน'},
    {job_id: 20, job_name: 'ถูบ้าน'},
  ]);

  const fetchJobs = async () =>
    await api
      .get("/api/v1/job/")
      .then((res) => {
        // console.log(res.data);
        setJobchoices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  useEffect(() => {
    fetchJobs();
    // console.log(user);
  }, []);

  return (
    <section className="manage-job flex flex-col">
      <b>ชนิดงาน</b>
      <div className="bg-light-green rounded-md p-5">
        <section className="joblist bg-white h-20 p-5 flex flex-row gap-3 overflow-y-auto flex-wrap rounded-md">
          {user.jobs?.map((job, jobin) => (
            <span key={jobin} className="text-black text-sx sm:text-sm md:text-base bg-light-pink px-5 py-1 rounded-full"> {job.job_name} </span>
          ))}
        </section>

        <section className="flex flex-col overflow-y-auto h-80 my-5 p-5 rounded-md bg-white">
          {jobchoices.map((job, jobin) => (
            <label key={job.job_id} className=" p-2 relative flex items-center rounded-full cursor-pointer gap-2">
              <input
                name="jobs"
                type="checkbox"
                value={`${job.job_id}-${job.job_name}`}
                checked={user?.jobs?.some(
                  (maidJob) => maidJob.job_id === job.job_id
                )}
                onChange={handleChange}
                className="relative w-5 h-5 aspect-square !appearance-none !bg-none checked:!bg-gradient-to-tr checked:!from-dark-pink checked:!to-dark-pink bg-white border border-dark-pink rounded !outline-none !ring-0 !text-transparent !ring-offset-0 checked:!border-dark-pink hover:!border-green-darkness cursor-pointer transition-all duration-300 ease-in-out focus-visible:!outline-offset-3 focus-visible:!outline-3 focus-visible:border-sky-400 after:w-[40%] after:h-[70%] after:absolute after:opacity-0 after:top-[25%] after:left-[50%] after:-translate-x-2/4 after:-translate-y-1/4 after:rotate-[25deg] after:border-r-[0.15em] after:border-r-white after:border-b-[0.15em] after:border-b-white after:transition-all after:duration-200 after:ease-linear checked:after:opacity-100 checked:after:rotate-45"
              />
              <span className="text-black text-sx sm:text-sm md:text-base">{job.job_name}</span>
            </label>
          ))}
        </section>
      </div>
    </section>
  );
}

export default ManageJob;
