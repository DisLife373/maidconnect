import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
// import "./css/RatingBox.css";

function RatingBox({ invoice, handleSubmit, clickStar, handleChange }) {
  return (
    <section className="rating-box h-full rounded-3xl border-4 border-background-color hover:bg-light-green transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 p-3 divide-y-2 divide-background-color">
      <article className="flex flex-col">
        {invoice.user_pic ? (
          <img
            src={"../../public/imageGalleries/" + invoice.user_pic}
            className="w-full h-full max-w-32 max-h-48 aspect-square rounded-full place-self-center object-cover"
          />
        ) : (
          <img
            src={"../../public/imageGalleries/1716567567852no_account.png"}
            className="w-full h-full max-w-32 max-h-48 aspect-square rounded-full place-self-center object-cover"
          />
        )}
        <section className=" flex flex-col">
          <header className="place-self-center text-dark-green justify-self-center text-basexl sm:text-xl">
            {invoice.firstname} {invoice.lastname}{" "}
          </header>
          <span className="mb-2">
            {" "}
            เสร็จสิ้นงานเมื่อ: {invoice.submit_time}{" "}
          </span>
        </section>
      </article>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(invoice.id);
        }}
        className="flex flex-col gap-y-5"
      >
        <section className="flex gap-x-2 mt-3">
          <span className="text-sx sm:text-sm md:text-base">ให้คะแนน:</span>
          {[...Array(5)].map((star, starid) => {
            const ratingValue = starid + 1;
            return (
              <label key={starid} className="text-xl sm:text-2xl lg:text-3xl">
                <input
                  type="radio"
                  name={`rating-${invoice.invoice_id}`}
                  value={ratingValue}
                  onChange={() => clickStar(invoice.invoice_id, ratingValue)}
                  style={{ display: "none" }}
                />
                <FaStar
                  color={ratingValue <= invoice.star ? "#E1829B" : "#e4e5e9"}
                />
              </label>
            );
          })}
        </section>
        <section className="grid grid-cols-5 ">
          <span className="text-sx sm:text-sm md:text-base">เพิ่มเติม</span>
          <label className="col-span-4">
            <textarea
              type="text"
              name="comment"
              value={invoice.comment}
              onChange={(e) => handleChange(invoice.invoice_id, e.target.value)}
              className="text-sx sm:text-sm md:text-base border-4 border-background-color resize-none w-5/6"
            />
          </label>
        </section>
        <footer className="rating-button flex justify-center">
          <button
            type="submit"
            className="text-white text-sx sm:text-sm md:text-base bg-green-darkness px-3 py-1 rounded-full hover:bg-background-color active:bg-green-darkness transition duration-500"
          >
            Submit
          </button>
        </footer>
      </form>
    </section>
  );
}

export default RatingBox;
