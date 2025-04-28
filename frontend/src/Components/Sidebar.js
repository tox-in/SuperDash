import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    const isActive = (path) => location.pathname ? 'bg-indigo-700' : '';

    return (
        <div className="w-64 bg-indigo-800 text-white h-screen fixed p-6 shadow-lg">
            <h1 className="text-3xl font-bold mb-10">Supamenu</h1>
            <nav>
                <li>
                    <Link to="/" className={`block p-3 rounded-lg hover:bg-indigo-700 ${isActive('/')}`}>
                        <span className="text-lg">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/menus" className={`block p-3 rounded-lg hover:bg-indigo-700 ${isActive('/menus')}`}>
                        <span className="text-lg">Menus</span>
                    </Link>
                </li>
                <li>
                    <Link to="/orders" className={`block p-3 rounded-lg hover:bg-indigo-700 ${isActive('/orders')}`}>
                        <span className="text-lg">Orders</span>
                    </Link>
                </li>
                <li>
                    <Link to="/analytics" className={`block p-3 rounded-lg hover:bg-indigo-700 ${isActive('/analytics')}`}>
                        <span className="text-lg">Analytics</span>
                    </Link>
                </li>
                <li>
                    <Link to="/settings" className={`block p-3 rounded-lg hover:bg-indigo-700 ${isActive('/settings')}`}>
                        <span className="text-lg">Settings</span>
                    </Link>
                </li>
            </nav>
        </div>
    )
}

export default Sidebar;