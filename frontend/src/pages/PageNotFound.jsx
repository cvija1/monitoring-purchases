import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div class="flex-grow-1 bg-primary d-flex justify-content-center align-items-center row m-0">
        <div className="bg-opacity-50 bg-success text-light col-11 col-sm-8 col-lg-5 hero rounded text-center border border-2 border-dark">
          <p className="mt-4 mb-5">
            Нисмо пронашли страницу, молимо вратите се на почетну.{" "}
            <Link className="text-light" to="/">
              Иди на почетну
            </Link>
          </p>
          <div className="pt-5 text-light">
            <img
              class="img-fluid opacity-75 ms-auto me-auto w-50"
              src="/img/grb.svg"
              alt=""
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
