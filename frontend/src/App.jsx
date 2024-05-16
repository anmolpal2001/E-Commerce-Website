import Home from "./pages/Home";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import CartPage from "./pages/User/CartPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./pages/User/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { Toaster } from "react-hot-toast";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/User/OrderSuccessPage";
import UserOrdersPage from "./pages/User/UserOrdersPage";
import UserProfilePage from "./pages/User/UserProfilePage";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import AdminProductFormPage from "./pages/Admin/AdminProductFormPage";
import AdminProductDetailPage from "./pages/Admin/AdminProductDetailPage";
import AdminOrdersPage from "./pages/Admin/AdminOrdersPage";
import { fetchAllProductsAsync, fetchBrandsAsync, fetchCategoriesAsync } from "./features/product/productSlice";
import StripeCheckout from "./pages/Stripe/StripeCheckout";
import PaymentFailed from "./pages/User/PaymentFailed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "/payment-failed",
    element: <PaymentFailed />,
  },
  {
    path: "/my-orders",
    element: <UserOrdersPage />,
  },
  {
    path: "/profile",
    element: <UserProfilePage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path : "/reset-password/:id/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/admin/product-form",
    element: <AdminProductFormPage />,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <AdminProductFormPage />,
  },
  {
    path: "/admin/product-detail/:id",
    element: <AdminProductDetailPage />,
  },
  {
    path: "/admin/orders",
    element: <AdminOrdersPage />,
  },
  {
    path: '/stripe-checkout/',
    element: 
        <StripeCheckout></StripeCheckout>
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(fetchBrandsAsync());
      dispatch(fetchCategoriesAsync());
    if (user && user.role === "user") {
      dispatch(fetchItemsByUserIdAsync());
      // we can get req.user by token on backend so no need to give in front-end
    }
    dispatch(fetchLoggedInUserAsync());
  }, [dispatch, user]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
