import { createContext, useContext, useState, useEffect} from 'react';
import apiService from '../Services/apiService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            apiService.setToken(token);
            apiService.getUserProfile().then((response) => {
                setUser(response.user);
                setLoading(false);
            }).catch(() => {
                localStorage.removeItem('token');
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const response = await apiService.login({ email, password });
        localStorage.setItem('token', response.token);
        setUser(response.user);
        return response;
    };

    const logout = async (email, password) => {
        const response = await apiService.logout({ email, password });
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}