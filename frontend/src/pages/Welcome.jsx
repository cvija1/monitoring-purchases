import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { verifyUser } from "../features/auth/authSlice";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirmationCode } = useParams();
  const { isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (confirmationCode) {
      dispatch(verifyUser(confirmationCode));
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }

    if (isSuccess) {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [isSuccess, isLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div class="flex-grow-1 bg-primary d-flex justify-content-center align-items-center row m-0">
        <div className="bg-opacity-50 bg-success text-light col-11 col-sm-8 col-lg-5 hero rounded text-center border border-2 border-dark">
          <p className="mt-4 mb-5">Налог успјешно потврђен!</p>
          <Link to="/login" className="mt-4 mb-5 text-light">
            Молим Вас, улогујте се
          </Link>
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

export default Welcome;
