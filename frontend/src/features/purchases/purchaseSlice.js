import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PurchaseService from "./purchaseService";

const initialState = {
  purchases: [],
  additional: [],
  purchase: {},
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const createPurchase = createAsyncThunk(
  "purchases/create",
  async (purchaseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await PurchaseService.createPurchase(purchaseData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPurchases = createAsyncThunk(
  "purchases/getPurchases",
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await PurchaseService.getPurchases(params, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllPurchases = createAsyncThunk(
  "purchases/getAllPurchases",
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await PurchaseService.getAllPurchases(params, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPurchase = createAsyncThunk(
  "purchases/get",
  async (purchaseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await PurchaseService.getPurchase(purchaseId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const closePurchase = createAsyncThunk(
  "purchases/close",
  async (purchaseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await PurchaseService.closePurchase(purchaseId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePurchase = createAsyncThunk(
  "purchases/update",
  async (purchaseData, thunkAPI) => {
    try {
      const { purchaseId, formData } = purchaseData;
      const token = thunkAPI.getState().auth.user.token;
      return await PurchaseService.updatePurchase(purchaseId, formData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePurchase = createAsyncThunk(
  "purchases/delete",
  async (purchaseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await PurchaseService.deletePurchase(purchaseId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPurchase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPurchase.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updatePurchase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePurchase.fulfilled, (state, action) => {
        state.purchase = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Успјешно сте измијенили набавку";
      })
      .addCase(updatePurchase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getPurchases.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPurchases.fulfilled, (state, action) => {
        state.isLoading = false;
        state.purchases = action.payload.purchases || [];
        state.additional = {
          count: action.payload.count,
          total: action.payload.total,
        };
      })
      .addCase(getPurchases.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllPurchases.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPurchases.fulfilled, (state, action) => {
        state.isLoading = false;
        state.purchases = action.payload.purchases || [];
        state.additional = {
          count: action.payload.count,
          total: action.payload.total,
        };
      })
      .addCase(getAllPurchases.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPurchase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPurchase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.purchase = action.payload;
      })
      .addCase(getPurchase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePurchase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePurchase.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Успјешно сте избрисали набавку";
      })
      .addCase(deletePurchase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset, sort } = purchaseSlice.actions;
export default purchaseSlice.reducer;
