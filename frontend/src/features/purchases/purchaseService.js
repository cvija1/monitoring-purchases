import axios from "axios";
import moment from "moment";
const API_URL = "/api/purchase/";
const admin_url = "/api/purchase/admin";

const createPurchase = async (purchaseData, token) => {
  const amount = purchaseData.value;
  const title =
    purchaseData.title.charAt(0).toUpperCase() + purchaseData.title.slice(1);
  purchaseData.value = parseInt(amount.replace(/,/g, ""), 10);
  purchaseData.title = title;
  purchaseData.date = moment(purchaseData.date).format("YYYY-MM-DD");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, purchaseData, config);
  return response.data;
};

const updatePurchase = async (purchaseId, formData, token) => {
  const amount = formData.value;
  const title =
    formData.title.charAt(0).toUpperCase() + formData.title.slice(1);
  formData.value = parseInt(amount.replace(/,/g, ""), 10);
  formData.title = title;
  formData.date = moment(formData.date).format("YYYY-MM-DD");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + purchaseId, formData, config);
  return response.data;
};

const getPurchases = async (params, token) => {
  const { sort, pageSize, page, order } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { sort, pageSize, page, order },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const getAllPurchases = async (params, token) => {
  const { sort, pageSize, page, order } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { sort, pageSize, page, order },
  };

  const response = await axios.get(admin_url, config);
  return response.data;
};

const getPurchase = async (purchaseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + purchaseId, config);
  return response.data;
};

const deletePurchase = async (purchaseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + purchaseId, config);
  return response.data;
};

const giveReport = async (params, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
    responseType: "blob",
  };

  const response = await axios.get(admin_url + "/report", config);
  const href = URL.createObjectURL(response.data);
  // create "a" HTML element with href to file & click
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("download", "извјештај.xlsx"); //or any other extension
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

const PurchaseService = {
  giveReport,
  createPurchase,
  getPurchases,
  getPurchase,
  deletePurchase,
  getAllPurchases,
  updatePurchase,
};

export default PurchaseService;
