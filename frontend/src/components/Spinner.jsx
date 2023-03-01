import React from "react";

export const Spinner = () => {
  return (
    <>
      <div class="preloader-wrapper">
        <div class="spinner-border text-dark spinner">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
