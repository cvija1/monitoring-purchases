import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import "moment/locale/sr-cyrl"; // without this line it didn't work
moment.locale("sr-cyrl");

const PurchaseItem = ({ purchase }) => {
  const [badge, setBadge] = useState("");
  const navigate = useNavigate();
  const value = new Intl.NumberFormat().format(purchase.value);
  const { user } = useSelector((state) => state.auth);
  const goRouteId = (id) => {
    navigate(`/purchase/${id}`);
  };

  useEffect(() => {
    if (purchase.status === "у току") {
      setBadge("warning");
    }
    if (purchase.status === "завршена") {
      setBadge("success");
    }
    if (purchase.status === "неуспјела") {
      setBadge("danger");
    }
  });

  return (
    <tr
      style={{ cursor: "pointer" }}
      className="table-info"
      onClick={() => goRouteId(purchase._id)}
    >
      <td scope="row">{purchase.title}</td>
      <td>
        <div className={`badge bg-${badge}`}>{purchase.status}</div>
      </td>
      <td>{moment(purchase.date).format("LL")}</td>
      <td>{`${value} RSD`}</td>
    </tr>
  );
};

export default PurchaseItem;
