import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPurchase, reset } from "../features/purchases/purchaseSlice";
import Spinner from "../components/Spinner";
import { NumericFormat } from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewPurchase = () => {
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.purchases
  );
  const initialFormData = {
    title: "",
    status: "у току",
    description: "",
    value: undefined,
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
            <div className="h3 mb-4 mt-2 pb-2 border-bottom border-white">
              <i class="bi bi-wallet2"> Унос нове набавке</i>
            </div>
            <form onSubmit={onSubmit}>
              <div class="d-flex pt-lg-3 pt-1 row g-md-4 align-items-center container-fluid">
                <label
                  for="title"
                  className="col-md-2 col-form-label text-start"
                >
                  Назив набавке:
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={title}
                    onChange={onChange}
                    placeholder="Унеси назив набавке"
                    required
                  />
                </div>

                <label
                  for="description"
                  className="col-md-2 col-form-label text-start"
                >
                  Опис набавке:
                </label>
                <div className="col-md-10">
                  <textarea
                    rows="4"
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={description}
                    onChange={onChange}
                    placeholder="Напиши шта се набавља"
                    required
                  />
                </div>
                <label
                  for="status"
                  className="col-md-2 col-form-label text-start"
                >
                  Статус:
                </label>
                <div className="col-md-10">
                  <select
                    id="status"
                    name="status"
                    class="form-select"
                    required
                    onChange={onChange}
                    value={status}
                  >
                    <option value="у току">у току</option>
                    <option value="завршена">завршена</option>
                    <option value="неуспјела">неуспјела</option>
                  </select>
                </div>
                <label
                  for="status"
                  className="col-md-2 col-form-label text-start"
                >
                  Датум:
                </label>
                <div className="col-md-10">
                  <DatePicker
                    className="form-control"
                    dateFormat=" dd/MM/yyyy"
                    selected={date}
                    onChange={onChangeDate}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    required
                  />
                </div>

                <label
                  for="value"
                  className="col-md-12 col-form-label text-start text-md-center"
                >
                  Вриједност набавке:
                </label>
                <div className="col-md-10 input-group">
                  <NumericFormat
                    className="form-control"
                    id="value"
                    name="value"
                    value={value}
                    onChange={onChange}
                    thousandSeparator=","
                    placeholder="Упиши вриједност набавке"
                    required
                  />
                  <span class="input-group-text">RSD</span>
                </div>
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-secondary">
                  Унеси
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPurchase;
