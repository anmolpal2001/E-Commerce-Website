import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  fetchAllOrders,
  fetchOrdersByUser,
  fetchTotalOrdersByAdmin,
  updateOrderStatusById,
} from "./orderAPI";
import toast from "react-hot-toast";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  totalOrders: 0,
  message : null
};
//we may need more info of current order

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data.order;
  }
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchOrderByIdAsync = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId) => {
    const response = await fetchOrderById(orderId);
    // The value we return becomes the `fulfilled` action payload
    return response.data.order;
  }
);

export const fetchOrdersByUserAsync = createAsyncThunk(
  "order/fetchOrdersByUser",
  async () => {
    const response = await fetchOrdersByUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ sort, pagination }) => {
    const response = await fetchAllOrders(sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchTotalOrdersByAdminAsync = createAsyncThunk(
  "order/fetchTotalOrdersByAdmin",
  async ({ admin, queryString }) => {
    const response = await fetchTotalOrdersByAdmin(admin, queryString);
    // The value we return becomes the `fulfilled` action payload
    console.log("response data ", response.data);
    return response.data;
  }
);

export const updateOrderStatusByIdAsync = createAsyncThunk(
  "order/updateOrderStatusById",
  async ({ orderId, orderStatus }) => {
    const response = await updateOrderStatusById(orderId, orderStatus);
    // The value we return becomes the `fulfilled` action payload
    if(response.data.success){
      toast.success(response.data.message);
    }
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
    settingMessage : (state, action) => {
      state.message = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrdersByUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersByUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders[index] = action.payload;
      })
      .addCase(fetchTotalOrdersByAdminAsync.pending, (state) => {
        state.status = "loading";
      }
      )
      .addCase(fetchTotalOrdersByAdminAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.totalOrders;
        state.totalOrders = action.payload.totalCount;
      })
      .addCase(updateOrderStatusByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatusByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders[index] = action.payload;
      });
  },
});


export const { resetOrder,settingMessage } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectStatus = (state) => state.order.status;

export default orderSlice.reducer;
