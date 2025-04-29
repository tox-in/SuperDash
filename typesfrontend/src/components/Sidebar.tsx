import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import {
  BarChart3,
  Home,
  Menu,
  UtensilsCrossed,
  Users,
  ShoppingCart,
  CreditCard,
  UserCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon,
  text,
  isActive,
  isCollapsed,
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center py-3 px-3 rounded-md transition-colors ${
        isActive
          ? "bg-sidebar-primary text-white"
          : "text-gray-400 hover:bg-sidebar-accent hover:text-white"
      }`}
    >
      <span className="inline-block w-6 h-6">{icon}</span>
      {!isCollapsed && <span className="ml-3 whitespace-nowrap">{text}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <aside
      className={`bg-supamenu-black flex flex-col transition-all duration-300 ease-in-out h-screen sticky top-0 ${
        isCollapsed ? "w-61" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <Logo className="text-white" />}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full bg-sidebar-accent text-gray-400 hover:bg-sidebar-primary hover:text-white transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-2">
            <SidebarLink
                to="/dashboard"
                icon={<Home size={20} />}
                text="Dashboard"
                isActive={isActive("/dashboard")}
                isCollapsed={isCollapsed}
            />
            <SidebarLink
                to="/restaurants"
                icon={<UtensilsCrossed size={20} />}
                text="Restaurants"
                isActive={isActive("/restaurants")}
                isCollapsed={isCollapsed}
            />
            <SidebarLink
                to="/menus"
                icon={<Menu size={20} />}
                text="Menus"
                isActive={isActive("/menus")}
                isCollapsed={isCollapsed}
            />
            <SidebarLink
                to="/categories"
                icon={<BarChart3 size={20} />}
                text="Categories"
                isActive={isActive("/categories")}
                isCollapsed={isCollapsed}
            />
            <SidebarLink 
            to="/food-items" 
            icon={<UtensilsCrossed size={20} />} 
            text="Food Items" 
            isActive={isActive("/food-items")}
            isCollapsed={isCollapsed}
          />
          <SidebarLink 
            to="/orders" 
            icon={<ShoppingCart size={20} />} 
            text="Orders" 
            isActive={isActive("/orders")}
            isCollapsed={isCollapsed}
          />
          <SidebarLink 
            to="/transactions" 
            icon={<CreditCard size={20} />} 
            text="Transactions" 
            isActive={isActive("/transactions")}
            isCollapsed={isCollapsed}
          />
          <SidebarLink 
            to="/customers" 
            icon={<Users size={20} />} 
            text="Customers" 
            isActive={isActive("/customers")}
            isCollapsed={isCollapsed}
          />
          <SidebarLink 
            to="/users" 
            icon={<UserCircle size={20} />} 
            text="Users" 
            isActive={isActive("/users")}
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>

      <div className="px-3 py-4 border-t border-sidebar-border">
      <div className="space-y-2">
          <SidebarLink 
            to="/settings" 
            icon={<Settings size={20} />} 
            text="Settings" 
            isActive={isActive("/settings")}
            isCollapsed={isCollapsed}
          />
          <button
            onClick={handleLogout}
            className="flex items-center py-3 px-3 w-full rounded-md transition-colors text-gray-400 hover:bg-sidebar-accent hover:text-white"
          >
            <span className="inline-block w-6 h-6">
              <LogOut size={20} />
            </span>
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;