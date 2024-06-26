import NavBar from "../../features/navbar/Navbar";
import UserOrders from "../../features/user/components/UserOrders";

function UserOrdersPage() {
  return (
    <div>
      <NavBar>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Orders
            </h1>
          </div>
        </header>
        <UserOrders></UserOrders>
      </NavBar>
    </div>
  );
}

export default UserOrdersPage;
