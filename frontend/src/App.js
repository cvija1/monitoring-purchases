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
import AdminRoute from "./components/AdminRoute";
import Purchases from "./pages/Purchases";
import EditPurchase from "./pages/EditPurchase";
import Reports from "./pages/Reports";
import PageNotFound from "./pages/PageNotFound";
import Welcome from "./pages/Welcome";

//some check

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
              <Route path="/purchase/:purchaseId" element={<EditPurchase />} />
            </Route>
            <Route path="/reports" element={<AdminRoute />}>
              <Route path="/reports" element={<Reports />} />
            </Route>
            <Route path="/confirm/:confirmationCode" element={<Welcome />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
