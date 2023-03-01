import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPurchases, reset } from "../features/purchases/purchaseSlice";
import Spinner from "../components/Spinner";
import PurchaseItem from "../components/PurchaseItem";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Purchases = () => {
  const { purchases, isLoading, isSuccess, additional } = useSelector(
    (state) => state.purchases
  );
  const total = new Intl.NumberFormat().format(additional.total);

  const [params, setParams] = useState({
    sort: "title",
    pageSize: 10,
    page: 1,
    order: "asc",
  });

  const handlePageChange = (e) => {
    setParams((prev) => ({
      ...prev,
      page: e.selected + 1,
    }));
  };

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
    dispatch(getPurchases(params));
  }, [dispatch, params]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {purchases.length === 0 ? (
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
        <>
          <div class="flex-grow-1 bg-primary ">
            <div class="container  text-light mt-5">
              <div className="container d-flex align-items-center p-0">
                <div className="h5 mb-4 ">Списак набавки које ви водите:</div>
                <div
                  class="btn-group ms-auto mb-4 flex-wrap "
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    name="title"
                    type="button"
                    class="btn btn-secondary border"
                    onClick={sortClick}
                  >
                    Сортирај по називу
                  </button>
                  <button
                    name="date"
                    type="button"
                    class="btn btn-secondary border"
                    onClick={sortClick}
                  >
                    Сортирај по датуму
                  </button>
                  <button
                    name="status"
                    type="button"
                    class="btn btn-secondary border"
                    onClick={sortClick}
                  >
                    Сортирај по статусу
                  </button>
                  <button
                    name="value"
                    type="button"
                    class="btn btn-secondary border"
                    onClick={sortClick}
                  >
                    Сортирај по вриједности
                  </button>
                </div>
              </div>

              <div className="table-responsive">
                <table class="table table-hover mb-0">
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">Назив набавке</th>
                      <th scope="col">Статус</th>
                      <th scope="col">Датум</th>
                      <th scope="col">Вриједност</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((purchase) => (
                      <PurchaseItem key={purchase._id} purchase={purchase} />
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="table-secondary">
                      <td scope="row"></td>
                      <td></td>
                      <td className="text-end">Укупна вриједност набавки:</td>
                      <td>{`${total} RSD`}</td>
                    </tr>
                  </tfoot>
                </table>
                <div className="d-flex justify-content-center align-items-end background">
                  <ReactPaginate
                    nextLabel="следећа >"
                    pageCount={pageCount}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    previousLabel="< претходна"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination mb-2 mt-2"
                    activeClassName="active"
                    onPageChange={handlePageChange}
                    forcePage={params.page - 1}
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Purchases;
