import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  getPurchase,
  updatePurchase,
  reset,
  deletePurchase,
} from "../features/purchases/purchaseSlice";
import PurchaseForm from "../components/PurchaseForm";
import moment from "moment";

import { useParams, useNavigate } from "react-router-dom";

import Spinner from "../components/Spinner";

const EditPurchase = () => {
  const { purchase, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.purchases
  );

  const initialFormData = {
    title: "",
    status: "у току",
    description: "",
    value: null,
    date: new Date(),
  };

  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { purchaseId } = useParams();

  const onChangeDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePurchase({ purchaseId, formData }));
    setFormData(initialFormData);
  };

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deletePurchase(purchaseId));
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
      navigate("/purchases");
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
      navigate("/purchases");
    }

    dispatch(reset());
    //eslint-disable-next-line
  }, [isError, message, isSuccess]);

  useEffect(() => {
    dispatch(getPurchase(purchaseId));
  }, [purchaseId, dispatch]);

  useEffect(() => {
    if (Object.keys(purchase).length !== 0) {
      const { title, description, status, value, date } = purchase;

      let dateForm = moment(date)._d.toISOString();

      let valueForm = new Intl.NumberFormat().format(value);

      setFormData({
        title,
        description,
        status,
        value: valueForm,
        date: new Date(dateForm),
      });
    }
  }, [purchase]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div class="flex-grow-1 bg-primary d-flex justify-content-center align-items-center row m-0">
        <div className="bg-opacity-50 bg-success text-light col-11 col-sm-8 col-lg-5 hero-purchase rounded text-center border border-2 border-dark">
          <div>
            <div className="h3 mb-4 mt-2 pb-2 border-bottom border-white">
              <i class="bi bi-pen"> Измијени набавку</i>
            </div>
            <PurchaseForm
              onChange={onChange}
              onChangeDate={onChangeDate}
              onSubmit={onSubmit}
              formData={formData}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPurchase;
