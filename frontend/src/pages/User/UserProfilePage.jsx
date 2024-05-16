import NavBar from '../../features/navbar/Navbar';
import UserProfile from '../../features/user/components/UserProfile';

function UserProfilePage() {
  return (
    <div>
      <NavBar>
      <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Profile
            </h1>
          </div>
        </header>
        <UserProfile></UserProfile>
      </NavBar>
    </div>
  );
}

export default UserProfilePage;