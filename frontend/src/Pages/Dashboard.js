import { useState, useEffect } from "react";
import apiService from '../Services/apiService';
import ErrorAlert from '../Components/ErrorAlert';

function Dashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiService.getDashboardData()
            .then((response) => {
                setData(response);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Failed to load dashboard data");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="ml-64 p-8">Loading...</div>;

    return (
        <div className="ml-64 p-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        {error && <ErrorAlert message={error} />}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Total Sales</h3>
              <p className="text-2xl text-indigo-600">${data.sales.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Orders</h3>
              <p className="text-2xl text-indigo-600">{data.orders}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Customers</h3>
              <p className="text-2xl text-indigo-600">{data.customers}</p>
            </div>
          </div>
        )}
      </div> 
    );
}

export default Dashboard;