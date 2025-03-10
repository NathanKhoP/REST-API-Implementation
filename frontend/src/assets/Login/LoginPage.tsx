import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    console.log("Submitting form with data:", formData);

    try {
      const response = await axios.post("http://localhost:3000/auth/login", formData);
      
      console.log("API Response:", response.data);

      if (response.data.data.token) {
        console.log(response.data.data.token)
        localStorage.setItem("token", response.data.data.token);
      }
    } catch (err: any) {
      console.error("Login error:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
      navigate("/home", { replace: true });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/40 p-4 text-black">
      <div className="w-full max-w-md shadow-lg bg-white rounded-lg p-9">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground">Enter your credentials to sign in to your account</p>
        </div>
  
        <div className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 text-red-600 text-sm p-3 rounded flex items-center space-x-2">
                <span className="h-4 w-4">⚠️</span>
                <p>{error}</p>
              </div>
            )}
  
            <div className="space-y-2 pt-5">
              <div className="relative">
                <span className="absolute left-3 top-3 h-4 w-4 text-muted-foreground">📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full border rounded p-2"
                  required
                />
              </div>
            </div>
  
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-3 top-3 h-4 w-4 text-muted-foreground">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 w-full border rounded p-2"
                  required
                />
              </div>
            </div>
  
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
  
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
