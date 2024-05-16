import ProductEditForm from "../../features/admin/components/ProductEditForm";
import ProductForm from "../../features/admin/components/ProductForm";
import NavBar from "../../features/navbar/Navbar";
import { useLocation,useParams } from "react-router-dom";
function AdminProductFormPage() {
    const location = useLocation();
    const params = useParams();
    return ( 
        <div>
            <NavBar>
                {location.pathname === "/admin/product-form" && <ProductForm/>}
                {location.pathname === `/admin/product-form/edit/${params.id}` && <ProductEditForm/>}
            </NavBar>
        </div>
     );
}

export default AdminProductFormPage;