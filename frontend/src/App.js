import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Contexts/AuthContext';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Dashboard from './Pages/Dashboard';
import Menus from './Pages/Menus';
import Orders from './Pages/Orders';
import Analytics from './Pages/Analytics';
import Settings from './Pages/Settings';
import Login from './Pages/Login';

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <Header />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/menus" element={<Menus />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
