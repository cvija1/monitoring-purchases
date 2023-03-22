import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPurchase, reset } from "../features/purchases/purchaseSlice";
import Spinner from "../components/Spinner";
import PurchaseForm from "../components/PurchaseForm";

const NewPurchase = () => {
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.purchases
  );
  const initialFormData = {
    title: "",
    status: "у току",
    description: "",
    value: null,
    date: new Date(),
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const { date, title, status, description, value } = formData;
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
      navigate("/new-purchase");
    }

    if (isSuccess) {
      toast.success("Успјешно сте додали нову набавку!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      navigate("/purchases");
    }

    dispatch(reset());
  }, [dispatch, isError, navigate, message, isSuccess]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPurchase({ date, title, status, description, value }));
    setFormData(initialFormData);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div class="flex-grow-1 bg-primary d-flex justify-content-center align-items-center row m-0">
        <div className="bg-opacity-50 bg-success text-light col-11 col-sm-8 col-lg-5 hero-purchase rounded text-center border border-2 border-dark">
          <div>
            <div className="h3 mb-3 mt-2 pb-2 border-bottom border-white">
              <i class="bi bi-wallet2"> Унос нове набавке</i>
            </div>
            <PurchaseForm
              onChange={onChange}
              onChangeDate={onChangeDate}
              onSubmit={onSubmit}
              formData={formData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPurchase;
