import React, { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const initialState = {
    type: "",
    sort: "",
    date: "",
  };
  const [params, setParams] = useState(initialState);
  const [dates, setDates] = useState([]);

  const { date, type, sort } = params;

  const getDates = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { token } = user;
    const admin_url = "/api/purchase/admin/dates";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(admin_url, config);

    setDates(response.data);
  };

  const onChange = (e) => {
    setParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getDates();
  }, []);
  return (
    <div class="flex-grow-1 bg-primary d-flex justify-content-center align-items-center row m-0">
      <div className="bg-opacity-50 bg-success text-light col-11 col-sm-8 col-lg-5 hero-purchase rounded text-center border border-2 border-dark">
        <div>
          <div className="h3 mb-4 mt-2 pb-2 border-bottom border-white">
            <i class="bi bi-file-spreadsheet"> Преузми извјештај</i>
          </div>
          <div class="d-flex pt-lg-3 pt-1 m-0 ps-0 pe-0 row g-4 align-items-center container">
            <div className="col-md-12 mt-2 p-0">
              <p className="m-1 text-start">
                Изаберите које набавке желите у извјештају:
              </p>
              <select
                id="typeReport"
                value={type}
                name="type"
                class="form-select "
                required
                onChange={onChange}
                defaultValue={""}
              >
                <option value="" disabled>
                  изабери..
                </option>
                <option value="all">све</option>
                <option value="in progress">у току</option>
                <option value="completed">завршене</option>
                <option value="failed">неуспјеле</option>
              </select>
            </div>

            <div className="col-md-12 mt-2 p-0">
              <p className="m-1 text-start">
                Изаберите по чему желите да сортирате:
              </p>
              <select
                defaultValue={""}
                onChange={onChange}
                id="sortReport"
                value={sort}
                name="sort"
                class="form-select "
                required
              >
                <option value="" disabled>
                  изабери..
                </option>
                <option value={["title", "asc"]}>назив (растуће)</option>
                <option value={["title", "desc"]}>назив (опадајуће)</option>
                <option value={["value", "asc"]}>вриједност (растуће)</option>
                <option value={["value", "desc"]}>
                  вриједност (опадајуће)
                </option>
                <option value={["date", "asc"]}>датум (растуће)</option>
                <option value={["date", "desc"]}>датум (опадајуће)</option>
                <option value={["status", "asc"]}>статус (растуће)</option>
                <option value={["status", "desc"]}>статус (опадајуће)</option>
              </select>
            </div>

            {type !== "" ? (
              <div className="col-md-12 mt-4 p-0">
                <p className="m-1 text-start">
                  Изаберите годину за коју желите извјештај:
                </p>
                <select
                  id="date"
                  value={date}
                  name="date"
                  class="form-select "
                  required
                  onChange={onChange}
                  defaultValue={""}
                >
                  <option value="" disabled>
                    изабери..
                  </option>
                  {dates.length !== 0 ? (
                    <option value="all">све до сада</option>
                  ) : (
                    <></>
                  )}
                  {dates?.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <></>
            )}
            {date !== "" ? (
              <div className="col-md-12 mt-4 p-0">
                <p className="m-1 text-center">Преузми свој извјештај</p>
                <button type="button" class="btn mt-3 green">
                  Преузми
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
