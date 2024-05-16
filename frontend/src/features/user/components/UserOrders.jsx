import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import userSlice, {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserInfoStatus,
  selectUserOrders,
} from "../userSlice";
import { Grid } from "react-loader-spinner";
import { selectOrders } from "../../order/orderSlice";
import { fetchItemsByUserIdAsync } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  console.log("Orders ", orders);
  const user = useSelector(selectLoggedInUser);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, [dispatch]);

  useEffect(() => {
    if(user && user.role === "user"){
      dispatch(fetchItemsByUserIdAsync());
    }
  },[dispatch]);

  const discountPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };
  return (
    <div>
      {orders &&
        orders.map((order) => (
          <div key={order.id}>
            <div>
              <div className="mx-auto my-8 bg-white max-w-7xl px-4 sm:px-6 lg:px-2">
                <div className="border-t border-gray-200 py-6 sm:px-6">
                  <h3 className="text-sm md:text-xl my-2 font-bold tracking-tight px-2 py-3 rounded-lg text-gray-900 bg-gray-200">
                    Order ID : <span className="text-gray-600">{order.id}</span>
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
                      {order.items.map((item,index) => (
                        <li key={index} className="flex py-6">
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
      {status === "loading" ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null}
    </div>
  );
}
