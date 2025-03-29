import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const timeout = setTimeout(() => {
      if (token) {
        navigate("/blogs");
      } else {
        navigate("/signup");
      }
    }, 2000); // 2-second delay

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Our Blog</h1>
        <p className="text-gray-600 mt-2">Checking authentication...</p>
      </div>
    </div>
  );
};

export default Home;
