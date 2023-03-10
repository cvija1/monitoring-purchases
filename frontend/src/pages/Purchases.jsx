import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPurchases,
  reset,
  getAllPurchases,
} from "../features/purchases/purchaseSlice";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Table from "../components/Table";

const Purchases = () => {
  const { purchases, isLoading, isSuccess, additional } = useSelector(
    (state) => state.purchases
  );
  const { user } = useSelector((state) => state.auth);
  const total = new Intl.NumberFormat().format(additional.total);

  const [params, setParams] = useState({
    sort: "title",
    pageSize: 10,
    page: 1,
    order: "asc",
  });

  const sortClick = (e) => {
    const sort = e.target.name;
    const { order } = params;
    setParams((prev) => ({
      ...prev,
      sort,
      page: 1,
      order: prev.sort === sort && order === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (e) => {
    setParams((prev) => ({
      ...prev,
      page: e.selected + 1,
    }));
  };

  const pageCount = Math.ceil(additional.count / params.pageSize);

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (user?.isAdmin) {
      dispatch(getAllPurchases(params));
    } else {
      dispatch(getPurchases(params));
    }
  }, [params]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {purchases?.length === 0 ? (
        <>
          <div class="flex-grow-1 bg-primary d-flex justify-content-center align-items-center row m-0">
            <div className="bg-opacity-50 bg-success text-light col-11 col-sm-8 col-lg-5 hero rounded text-center border border-2 border-dark">
              <p className="mt-4 mb-5">
                Тренутно нема ниједне набавке коју сте Ви унијели. Уколико
                желите да додате нову стисните{" "}
                <Link className="text-light" to="/new-purchase">
                  овдје
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
      ) : (
        <Table
          total={total}
          pageCount={pageCount}
          sortClick={sortClick}
          handlePageChange={handlePageChange}
          purchases={purchases}
          params={params}
        />
      )}
    </>
  );
};

export default Purchases;
