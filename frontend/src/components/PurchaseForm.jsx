import React, { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PurchaseForm = ({
  onChange,
  onChangeDate,
  onSubmit,
  formData,
  onDelete,
}) => {
  const { purchase } = useSelector((state) => state.purchases);
  const { user } = useSelector((state) => state.auth);
  const { date, title, status, description, value } = formData;
  const [purchaseState, setPurchaseState] = useState(false);

  useEffect(() => {
    if (Object.keys(purchase).length !== 0) {
      setPurchaseState(true);
    } else {
      setPurchaseState(false);
    }
  }, [purchaseState, purchase]);
  return (
    <form onSubmit={onSubmit}>
      <div class="d-flex pt-lg-3 pt-1 row g-md-4 align-items-center container-fluid">
        {purchaseState && !user?.isAdmin ? (
          <div className="m-0 text-end">
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              type="button"
              className=" btn btn-danger btn-rsp"
            >
              <i class="bi bi-trash3"> Избриши</i>
            </button>
            {/* Modal */}
            <div
              class="modal fade "
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog ">
                <div class="modal-content background">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body text-center text-dark">
                    Да ли сте сигурни да желите да избришете ову набавку?
                  </div>
                  <div class="modal-footer justify-content-center">
                    <button
                      onClick={onDelete}
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      <i class="bi bi-trash3"> Избриши</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <label
          for="title"
          className={
            purchaseState
              ? "col-md-2 col-form-label text-start mt-1"
              : "col-md-2 col-form-label text-start"
          }
        >
          Назив набавке:
        </label>
        <div className={purchaseState ? "col-md-10 mt-1" : "col-md-10"}>
          <input
            disabled={user?.isAdmin}
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

        <label for="description" className="col-md-2 col-form-label text-start">
          Опис набавке:
        </label>
        <div className="col-md-10">
          <textarea
            disabled={user?.isAdmin}
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
        <label for="status" className="col-md-2 col-form-label text-start">
          Статус:
        </label>
        <div className="col-md-10">
          <select
            disabled={user?.isAdmin}
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
        <label for="status" className="col-md-2 col-form-label text-start">
          Датум:
        </label>
        <div className="col-md-10">
          <DatePicker
            disabled={user?.isAdmin}
            className="form-control"
            dateFormat="dd/MM/yyyy"
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
            disabled={user?.isAdmin}
            thousandSeparator=","
            placeholder="Упиши вриједност набавке"
            required
          />
          <span class="input-group-text">RSD</span>
        </div>
        <div className=" mt-3">
          {purchaseState ? (
            <button
              type="submit"
              className={
                user?.isAdmin ? "d-none " : "btn btn-secondary btn-rsp"
              }
            >
              Измијени
            </button>
          ) : (
            <button type="submit" className="btn btn-secondary btn-rsp">
              Унеси
            </button>
          )}
          {user?.isAdmin ? (
            <Link className="btn btn-secondary btn-rsp" to={-1}>
              Врати се назад
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </form>
  );
};

export default PurchaseForm;
