import React from "react";

const Home = () => {
  return (
    <>
      <div class="flex-grow-1 bg-primary d-flex justify-content-center align-items-center row m-0">
        <div className="bg-opacity-50 bg-success text-light col-11 col-sm-8 col-lg-5 hero rounded text-center border border-2 border-dark">
          <p className="mt-4 mb-5">
            Ова апликација омогућава уношење нових набавки, као и увид у
            реализоване, отказане и планиране набавке. На тај начин олакшава рад
            лицима која учествују у планирању и вођењу набавки.
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

export default Home;
