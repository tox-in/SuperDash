import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center ml-64">
            <h2 className="text-xl font-semibold text-gray-800">Supamenu Dashboard</h2>
            <div className="flex items-center space-x-4">
                <span className="text-gray-600">{user ? user.email : 'Guest' }</span>
                <button
                    onClick={handleLogout}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;