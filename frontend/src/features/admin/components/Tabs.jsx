import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTotalOrdersByAdminAsync,
  selectOrders,
  updateOrderStatusByIdAsync,
} from "../../order/orderSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("delivered");
  const dispatch = useDispatch();
  const admin = useSelector(selectLoggedInUser);

  const getQueryString = (tab) => {
    switch (tab) {
      case "delivered":
        return "?orderStatus=delivered";
      case "shipped":
        return "?orderStatus=shipped";
      case "packed":
        return "?orderStatus=packed";
      case "ordered":
        return "?orderStatus=ordered";
      default:
        return "";
    }
  };

  const handleUpdateStatus = (orderId, status) => {
    console.log("Order ID: ", orderId, "Status: ", status);
    const orderStatus = { orderStatus: status };
    dispatch(updateOrderStatusByIdAsync({ orderId, orderStatus }));
    dispatch(fetchTotalOrdersByAdminAsync({admin,queryString : getQueryString(activeTab)}))
  };

  useEffect(() => {
    const queryString = getQueryString(activeTab);
    dispatch(fetchTotalOrdersByAdminAsync({ admin, queryString }));
  }, [activeTab, dispatch, admin]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Define content for each tab
  const tabContents = {
    delivered: <DeliveredOrders />,
    shipped: <ShippedOrders handleUpdateStatus={handleUpdateStatus} />,
    packed: <PackedOrders handleUpdateStatus={handleUpdateStatus} />,
    ordered: <Ordered handleUpdateStatus={handleUpdateStatus} />,
  };

  return (
    <div className="flex justify-center flex-col mx-auto">
      <ul className="flex flex-wrap xs:text-xs sm:text-base font-medium text-center pl-2 justify-start text-gray-500 border-b border-gray-200 bg-white dark:border-gray-700 dark:text-gray-400">
        {Object.keys(tabContents).map((tab) => (
          <li key={tab} className="me-2">
            <button
              onClick={() => handleTabClick(tab)}
              className={`inline-block p-4 mt-1 rounded-t-lg ${
                activeTab === tab
                  ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                  : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "}
              {/* Capitalize the tab name */}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 px-10">
        <form className="flex items-center w-full mx-auto">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required=""
            />
          </div>
        </form>
      </div>

      {/* Tab content */}
      <div className="">{tabContents[activeTab]}</div>
    </div>
  );
};

export default Tabs;

const DeliveredOrders = () => {
  const discountPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };
  const orders = useSelector(selectOrders);
  return (
    <>
      <div>
        {orders &&
          orders.map((order) => (
            <div key={order.id}>
              <div>
                <div className="mx-auto my-8 bg-white max-w-7xl px-4 sm:px-6 lg:px-2">
                  <div className="border-t border-gray-200 py-6 sm:px-6">
                    <h3 className="text-sm md:text-xl my-2 font-bold tracking-tight px-2 py-3 rounded-lg text-gray-900 bg-gray-200">
                      Order ID :{" "}
                      <span className="text-gray-600">{order.id}</span>
                    </h3>
                    <div className="flex flex-col md:flex-row justify-between my-3 gap-3 px-2">
                      <h3 className="text-sm md:text-xl font-bold tracking-tight">
                        Order Status :{" "}
                        <span className="text-green-600">
                          {order.orderStatus}
                        </span>
                      </h3>
                      <h3 className="text-sm md:text-xl font-bold tracking-tight ">
                        Date :{" "}
                        <span className="text-green-600">
                          {order.updatedAt.split("T")[0]}
                        </span>
                      </h3>
                    </div>
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.product.thumbnail}
                                alt={item.product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item.product.id}>
                                      {item.product.title}
                                    </a>
                                  </h3>
                                  <p className="ml-4 text-sm md:text-lg">
                                    $
                                    {discountPrice(
                                      item.product.price,
                                      item.product.discountPercentage
                                    )}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="quantity"
                                    className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Qty :{item.quantity}
                                  </label>
                                </div>

                                <div className="flex"></div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between my-2 text-base md:text-lg font-medium text-gray-900">
                      <p>Total Amount</p>
                      <p>$ {order.totalAmount}</p>
                    </div>
                    <div className="flex justify-between my-2 text-base md:text-lg font-medium text-gray-900">
                      <p>Total Items</p>
                      <p>{order.totalItems} items</p>
                    </div>
                    <p className="my-2 text-sm font-medium text-gray-500">
                      Shipping Address :
                    </p>
                    <div className="flex flex-col md:flex-row justify-between my-3 gap-3 px-5 py-5 border-solid border-2 border-gray-200">
                      <div className="flex gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-base font-medium leading-6 text-gray-900">
                            {order.selectedAddress.name}
                          </p>
                          <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                            {order.selectedAddress.street}
                          </p>
                          <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                            {order.selectedAddress.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="flex mt-1 flex-col">
                        <p className="text-base font-medium leading-6 text-gray-900">
                          Phone: {order.selectedAddress.phone}
                        </p>
                        <p className="text-base leading-6 text-gray-500">
                          {order.selectedAddress.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

const Ordered = ({ handleUpdateStatus }) => {
  const discountPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  const handleStatus = (orderId, orderStatus) => {
    console.log("Updated order status :", orderStatus);
    handleUpdateStatus(orderId, orderStatus);
    setOrderStatus("");
  };
  const orders = useSelector(selectOrders);
  return (
    <>
      <div>
        {orders &&
          orders.map((order) => (
            <div key={order.id}>
              <div>
                <div className="mx-auto my-8 bg-white max-w-7xl px-4 sm:px-6 lg:px-2">
                  <div className="border-t border-gray-200 py-6 sm:px-6">
                    <h3 className="text-sm md:text-xl my-2 font-bold tracking-tight px-2 py-3 rounded-lg text-gray-900 bg-gray-200">
                      Order ID :{" "}
                      <span className="text-gray-600">{order.id}</span>
                    </h3>
                    <div className="flex flex-col lg:flex-row my-3 gap-3 px-2 w-full">
                      <h3 className="text-sm md:text-xl items-center font-bold tracking-tight inline-flex lg:w-1/2 w-full">
                        <span className="mr-5">Order Status : </span>
                        {showUpdateButton ? (
                          <select
                            value={orderStatus || order.orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                            className="py-1 px-6 mr-2 font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full focus:border-blue-500"
                          >
                            <option
                              value="ordered"
                              className="bg-white hover:bg-blue-200 text-base font-semibold"
                            >
                              Ordered
                            </option>
                            <option
                              value="shipped"
                              className="text-base font-semibold"
                            >
                              Shipped
                            </option>
                            <option
                              value="delivered"
                              className="text-base font-semibold"
                            >
                              Delivered
                            </option>
                            <option
                              value="packed"
                              className="text-base font-semibold"
                            >
                              Packed
                            </option>
                            {/* Add other possible order status options */}
                          </select>
                        ) : (
                          <span className="text-green-600 cursor-pointer">
                            {order.orderStatus.charAt(0).toUpperCase() +
                              order.orderStatus.slice(1)}
                          </span>
                        )}
                        {/* </div> */}
                      </h3>
                      <h3 className="text-sm md:text-xl font-bold tracking-tight">
                        Order Date :{" "}
                        <span className="text-green-600">
                          {order.updatedAt.split("T")[0]}
                        </span>
                      </h3>
                    </div>
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.product.thumbnail}
                                alt={item.product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item.product.id}>
                                      {item.product.title}
                                    </a>
                                  </h3>
                                  <p className="ml-4 text-sm md:text-lg">
                                    $
                                    {discountPrice(
                                      item.product.price,
                                      item.product.discountPercentage
                                    )}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="quantity"
                                    className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Qty :{item.quantity}
                                  </label>
                                </div>

                                <div className="flex"></div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between my-2 text-base md:text-lg font-medium text-gray-900">
                      <p>Total Amount</p>
                      <p>$ {order.totalAmount}</p>
                    </div>
                    <div className="flex justify-between my-2 text-base md:text-lg font-medium text-gray-900">
                      <p>Total Items</p>
                      <p>{order.totalItems} items</p>
                    </div>
                    <p className="my-2 text-sm font-medium text-gray-500">
                      Shipping Address :
                    </p>
                    <div className="flex flex-col md:flex-row justify-between my-3 gap-3 px-5 py-5 border-solid border-2 border-gray-200">
                      <div className="flex gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-base font-medium leading-6 text-gray-900">
                            {order.selectedAddress.name}
                          </p>
                          <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                            {order.selectedAddress.street}
                          </p>
                          <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                            {order.selectedAddress.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="flex mt-1 flex-col">
                        <p className="text-base font-medium leading-6 text-gray-900">
                          Phone: {order.selectedAddress.phone}
                        </p>
                        <p className="text-base leading-6 text-gray-500">
                          {order.selectedAddress.city}
                        </p>
                      </div>
                    </div>
                  </div>

                  {showUpdateButton ? (
                    <div
                      className="self-end"
                      onClick={(e) => setShowUpdateButton(!showUpdateButton)}
                    >
                      {/* Button to update order statuses */}
                      <button
                        onClick={() => handleStatus(order.id, orderStatus)}
                        className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={(e) => setShowUpdateButton(!showUpdateButton)}
                        className="py-2 px-4 bg-gray-200 text-gray-600 rounded-md shadow-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="self-end">
                      <button
                        onClick={(e) => setShowUpdateButton(!showUpdateButton)}
                        className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 mr-2"
                      >
                        Update Status
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

const ShippedOrders = ({ handleUpdateStatus }) => {
  const orders = useSelector(selectOrders);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  const handleStatus = (orderId, orderStatus) => {
    console.log("Updated order status :", orderStatus);
    handleUpdateStatus(orderId, orderStatus);
    setOrderStatus("");
  };

  return (
    <>
      <div>
        {orders &&
          orders.map((order) => (
            <div key={order.id}>
              <div>
                <div className="mx-auto my-8 bg-white max-w-7xl flex flex-col px-4 sm:px-6 lg:px-2">
                  <div className="border-t border-gray-200 py-6 sm:px-6">
                    <h3 className="text-sm md:text-xl my-2 font-bold tracking-tight px-2 py-3 rounded-lg text-gray-900 bg-gray-200">
                      Order ID :{" "}
                      <span className="text-gray-600">{order.id}</span>
                    </h3>
                    <div className="flex flex-col lg:flex-row my-3 gap-3 px-2 w-full">
                      <h3 className="text-sm md:text-xl items-center font-bold tracking-tight inline-flex lg:w-1/2 w-full">
                        <span className="mr-5">Order Status : </span>
                        {showUpdateButton ? (
                          <select
                            value={orderStatus || order.orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                            className="py-1 px-6 mr-2 font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full focus:border-blue-500"
                          >
                            <option
                              value="ordered"
                              className="bg-white hover:bg-blue-200 text-base font-semibold"
                            >
                              Ordered
                            </option>
                            <option
                              value="shipped"
                              className="text-base font-semibold"
                            >
                              Shipped
                            </option>
                            <option
                              value="delivered"
                              className="text-base font-semibold"
                            >
                              Delivered
                            </option>
                            <option
                              value="packed"
                              className="text-base font-semibold"
                            >
                              Packed
                            </option>
                            {/* Add other possible order status options */}
                          </select>
                        ) : (
                          <span className="text-green-600 cursor-pointer">
                            {order.orderStatus.charAt(0).toUpperCase() +
                              order.orderStatus.slice(1)}
                          </span>
                        )}
                        {/* </div> */}
                      </h3>
                      <h3 className="text-sm md:text-xl font-bold tracking-tight">
                        Order Date :{" "}
                        <span className="text-green-600">
                          {order.updatedAt.split("T")[0]}
                        </span>
                      </h3>
                    </div>
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.product.thumbnail}
                                alt={item.product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item.product.id}>
                                      {item.product.title}
                                    </a>
                                  </h3>
                                  <p className="ml-4 text-sm md:text-lg">
                                    Rs. {item.product.discountedPrice}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="quantity"
                                    className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Qty :{item.quantity}
                                  </label>
                                </div>

                                <div className="flex"></div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between my-2 text-base md:text-lg font-medium text-gray-900">
                      <p>Total Amount</p>
                      <p>Rs. {order.totalAmount}</p>
                    </div>
                    <div className="flex justify-between my-2 text-base md:text-lg font-medium text-gray-900">
                      <p>Total Items</p>
                      <p>{order.totalItems} items</p>
                    </div>
                    <p className="my-2 text-sm font-medium text-gray-500">
                      Shipping Address :
                    </p>
                    <div className="flex flex-col md:flex-row justify-between my-3 gap-3 px-5 py-5 border-solid border-2 border-gray-200">
                      <div className="flex gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-base font-medium leading-6 text-gray-900">
                            {order.selectedAddress.name}
                          </p>
                          <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                            {order.selectedAddress.street}
                          </p>
                          <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                            {order.selectedAddress.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="flex mt-1 flex-col">
                        <p className="text-base font-medium leading-6 text-gray-900">
                          Phone: {order.selectedAddress.phone}
                        </p>
                        <p className="text-base leading-6 text-gray-500">
                          {order.selectedAddress.city}
                        </p>
                      </div>
                    </div>
                  </div>

                  {showUpdateButton ? (
                    <div
                      className="self-end"
                      onClick={(e) => setShowUpdateButton(!showUpdateButton)}
                    >
                      {/* Button to update order statuses */}
                      <button
                        onClick={() => handleStatus(order.id, orderStatus)}
                        className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={(e) => setShowUpdateButton(!showUpdateButton)}
                        className="py-2 px-4 bg-gray-200 text-gray-600 rounded-md shadow-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="self-end">
                      <button
                        onClick={(e) => setShowUpdateButton(!showUpdateButton)}
                        className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 mr-2"
                      >
                        Update Status
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

const PackedOrders = ({ handleUpdateStatus }) => {
  const discountPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  const handleStatus = (orderId, orderStatus) => {
    console.log("Updated order status :", orderStatus);
    handleUpdateStatus(orderId, orderStatus);
    setOrderStatus("");
  };
  const orders = useSelector(selectOrders);
  return (
    <>
      <div>
        {orders &&
          orders.map((order) => (
            <div key={order.id}>
              <div>
                <div className="mx-auto my-8 bg-white max-w-7xl px-4 sm:px-6 lg:px-2">
                  <div className="border-t border-gray-200 py-6 sm:px-6">
                    <h3 className="text-sm md:text-xl my-2 font-bold tracking-tight px-2 py-3 rounded-lg text-gray-900 bg-gray-200">
                      Order ID :{" "}
                      <span className="text-gray-600">{order.id}</span>
                    </h3>
                    <div className="flex flex-col lg:flex-row my-3 gap-3 px-2 w-full">
                      <h3 className="text-sm md:text-xl items-center font-bold tracking-tight inline-flex lg:w-1/2 w-full">
                        <span className="mr-5">Order Status : </span>
                        {showUpdateButton ? (
                          <select
                            value={orderStatus || order.orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                            className="py-1 px-6 mr-2 font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full focus:border-blue-500"
                          >
                            <option
                              value="ordered"
                              className="bg-white hover:bg-blue-200 text-base font-semibold"
                            >
                              Ordered
                            </option>
                            <option
                              value="shipped"
                              className="text-base font-semibold"
                            >
                              Shipped
                            </option>
                            <option
                              value="delivered"
                              className="text-base font-semibold"
                            >
                              Delivered
                            </option>
                            <option
                              value="packed"
                              className="text-base font-semibold"
                            >
                              Packed
                            </option>
                            {/* Add other possible order status options */}
                          </select>
                        ) : (
                          <span className="text-green-600 cursor-pointer">
                            {order.orderStatus.charAt(0).toUpperCase() +
                              order.orderStatus.slice(1)}
                          </span>
                        )}
                        {/* </div> */}
                      </h3>
                      <h3 className="text-sm md:text-xl font-bold tracking-tight">
                        Order Date :{" "}
                        <span className="text-green-600">
                          {order.updatedAt.split("T")[0]}
                        </span>
                      </h3>
                    </div>
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.product.thumbnail}
                                alt={item.product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item.product.id}>
                                      {item.product.title}
                                    </a>
                                  </h3>
                                  <p className="ml-4 text-sm md:text-lg">
                                    $
                                    {discountPrice(
                                      item.product.price,
                                      item.product.discountPercentage
                                    )}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="quantity"
                                    className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Qty :{item.quantity}
                                  </label>
                                </div>

                                <div className="flex"></div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between my-2 text-base md:text-lg font-medium text-gray-900">
                      <p>Total Amount</p>
                      <p>$ {order.totalAmount}</p>
                    </div>
                    <div className="flex justify-between my-2 text-base md:text-lg font-medium text-gray-900">
                      <p>Total Items</p>
                      <p>{order.totalItems} items</p>
                    </div>
                    <p className="my-2 text-sm font-medium text-gray-500">
                      Shipping Address :
                    </p>
                    <div className="flex flex-col md:flex-row justify-between my-3 gap-3 px-5 py-5 border-solid border-2 border-gray-200">
                      <div className="flex gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-base font-medium leading-6 text-gray-900">
                            {order.selectedAddress.name}
                          </p>
                          <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                            {order.selectedAddress.street}
                          </p>
                          <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                            {order.selectedAddress.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="flex mt-1 flex-col">
                        <p className="text-base font-medium leading-6 text-gray-900">
                          Phone: {order.selectedAddress.phone}
                        </p>
                        <p className="text-base leading-6 text-gray-500">
                          {order.selectedAddress.city}
                        </p>
                      </div>
                    </div>
                  </div>

                  {showUpdateButton ? (
                    <div
                      className="self-end"
                      onClick={(e) => setShowUpdateButton(!showUpdateButton)}
                    >
                      {/* Button to update order statuses */}
                      <button
                        onClick={() => handleStatus(order.id, orderStatus)}
                        className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={(e) => setShowUpdateButton(!showUpdateButton)}
                        className="py-2 px-4 bg-gray-200 text-gray-600 rounded-md shadow-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="self-end">
                      <button
                        onClick={(e) => setShowUpdateButton(!showUpdateButton)}
                        className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 mr-2"
                      >
                        Update Status
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

const AllOrders = () => {
  return (
    <>
      <h1>All Orders</h1>
    </>
  );
};
