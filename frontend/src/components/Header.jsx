import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <nav class="navbar navbar-expand-lg fixed navbar-dark bg-dark">
      <div class="container">
        <Link className="navbar-brand" to="/">
          Апликација за праћење набавки
        </Link>{" "}
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {user ? (
            <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li class="nav-item">
                <Link
                  onClick={onLogout}
                  class="nav-link"
                  aria-current="page"
                  href="#"
                >
                  <i class="bi bi-box-arrow-left"> Одјави се</i>
                </Link>
              </li>
            </ul>
          ) : (
            <ul class="navbar-nav mb-2 mb-lg-0 ms-auto ">
              <li class="nav-item ">
                <Link class="nav-link " to="/login">
                  <i class="bi bi-person "> Пријави се</i>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/register">
                  <i class="bi bi-box-arrow-in-right "> Региструј се</i>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
