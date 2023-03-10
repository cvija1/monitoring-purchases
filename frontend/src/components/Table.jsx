import React from "react";
import PurchaseItem from "../components/PurchaseItem";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const Table = ({
  total,
  pageCount,
  sortClick,
  purchases,
  handlePageChange,
  params,
}) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div class="flex-grow-1 bg-primary ">
      <div class="container  text-light mt-5">
        <div className="container d-flex align-items-center p-0">
          <div className="h5 mb-4 ">
            {user?.isAdmin
              ? "Списак свих набавки:"
              : "Списак набавки које ви водите:"}
          </div>
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
              {purchases?.map((purchase) => (
                <PurchaseItem key={purchase._id} purchase={purchase} />
              ))}
            </tbody>
            <tfoot>
              <tr className="table-secondary">
                <td scope="row"></td>
                <td></td>
                <td className="text-end">
                  {user?.isAdmin
                    ? "Укупна вриједност набавки:"
                    : "Укупна вриједност ваших набавки:"}
                </td>
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
  );
};

export default Table;
