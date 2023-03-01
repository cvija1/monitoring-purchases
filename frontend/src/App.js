import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import NewPurchase from "./pages/NewPurchase";
import PrivateRoute from "./components/PrivateRoute";
import Purchases from "./pages/Purchases";
import Ticket from "./pages/Ticket";
const App = () => {
  return (
    <>
      <div class="d-flex min-vh-100 flex-column">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-purchase" element={<PrivateRoute />}>
              <Route path="/new-purchase" element={<NewPurchase />} />
            </Route>
            <Route path="/purchases" element={<PrivateRoute />}>
              <Route path="/purchases" element={<Purchases />} />
            </Route>
            <Route path="/purchase/:purchaseId" element={<PrivateRoute />}>
              <Route path="/purchase/:purchaseId" element={<Ticket />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
