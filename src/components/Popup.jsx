import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import "./css/Popup.css";

function Popup({ alert, message, clickCancel, clickOK, buttonName = "ตกลง" }) {
  return (
    <dialog 
      // className={`${alert ? "show" : ""}`} 
      id="popup"
      className={alert ? "grid grid-rows-3 grid-cols-4 gap-y-2 object-none object-center absolute z-50 inset-0 bg-white p-2 px-5 rounded-2xl w-4/6 md:w-2/6 shadow-2xl shadow-background-color": "hidden"}
    >
      <span onClick={clickCancel} className="text-basexl sm:text-xl md:text-2xl text-dark-green col-span-4 justify-self-end">
        <MdCancel color="#00897B" />
      </span>
      <span className="text-sx sm:text-sm md:text-base col-span-4"> {message} </span>
      <section className="popup_button grid grid-cols-2 gap-x-2 col-span-2 grid-cols-subgrid col-start-3">
        {clickOK && (
          <button type="submit" onClick={clickOK} className="text-sx sm:text-sm md:text-base bg-green-darkness px-3 py-1 rounded-full hover:bg-background-color active:bg-green-darkness transition duration-500">
            {" "}
            {buttonName}{" "}
          </button>
        )}
        {clickCancel && (
          <button onClick={clickCancel} className="cancle text-sx sm:text-sm md:text-base px-3 py-1 rounded-full border-2 border-green-darkness hover:border-background-color hover:bg-background-color hover:text-white active:bg-green-darkness">
            {" "}
            ยกเลิก{" "}
          </button>
        )}
      </section>
    </dialog>
  );
}

export default Popup;
