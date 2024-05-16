import AdminOrders from "../../features/admin/components/AdminOrders";
// import Tabs from "../../features/admin/components/Tabs";
import NavBar from "../../features/navbar/Navbar";

function AdminOrdersPage() {
    return ( 
        <div>
            <NavBar>
                <AdminOrders></AdminOrders>
                {/* <Tabs/> */}
            </NavBar>
        </div>
     );
}

export default AdminOrdersPage;