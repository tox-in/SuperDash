import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-supamenu-orange">404</h1>
        <p className="text-gray-600 mb-8">Page Not Found</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md bg-supamenu-orange px-6 py-3 text-base font-medium text-white hover:bg-opacity-90"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;