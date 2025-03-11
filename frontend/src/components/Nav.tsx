import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/home" className="text-white text-xl font-bold">
            Food Menu
          </Link>
          <Link to="/home" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/add-food" className="text-gray-300 hover:text-white">
            Add Food
          </Link>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
