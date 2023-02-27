import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { Spinner } from "../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
  };

  const { username, password } = formData;

  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

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
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div class="flex-grow-1 bg-primary d-flex justify-content-center align-items-center row m-0">
        <div className="bg-opacity-50 bg-success text-light col-11 col-sm-8 col-lg-5 hero-login rounded text-center border border-2 border-dark">
          <div>
            <div className="h3 mb-4 mt-2 pb-2 border-bottom border-white">
              <i class="bi bi-person "> Пријава </i>
            </div>
            <form onSubmit={onSubmit}>
              <div class="d-flex pt-lg-3 pt-1 row g-md-4 align-items-center container-fluid">
                <label
                  for="username"
                  className="col-md-2 col-form-label text-start"
                >
                  Корисничко име:
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    placeholder="Унеси корисничко име"
                    required
                  />
                </div>

                <label
                  for="password"
                  className="col-md-2 col-form-label text-start"
                >
                  Лозинка:
                </label>
                <div className="col-md-10">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Унеси лозинку"
                    required
                  />
                </div>
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-secondary">
                  Пријави се
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
