import { useSelector } from "react-redux";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import { selectUserInfo } from "../features/user/userSlice";
import AdminProductList from "../features/admin/components/AdminProductList";

function Home() {
  const user = useSelector(selectUserInfo);
  return (
    <div>
      <NavBar>
        {user && user.role === "admin" ? <AdminProductList /> : <ProductList />}
      </NavBar>
    </div>
  );
}

export default Home;
