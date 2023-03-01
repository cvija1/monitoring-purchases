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

const getAllPurchases = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

const closePurchase = async (purchaseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + purchaseId,
    { status: "завршена" },
    config
  );
  return response.data;
};

const PurchaseService = {
  createPurchase,
  getPurchases,
  getPurchase,
  closePurchase,
  getAllPurchases,
};

export default PurchaseService;
