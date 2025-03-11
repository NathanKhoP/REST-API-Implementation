import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Validate input fields to make sure they're not empty
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    
    try {
      // Direct call with exactly the right fields
      console.log("Attempting registration with:", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // Send registration request directly without wrapper object
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/auth/register',
        data: {
          username: formData.username,
          email: formData.email,
          password: formData.password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Registration response:", response.data);
      
      if (response.data.status === "success") {
        // Show success message and redirect to login
        alert("Registration successful!");
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      
      // Handle different error cases
      if (err.response?.data?.message) {
        if (err.response.status === 409) {
          // Conflict - duplicate values
          setError("This email or username is already registered.");
        } else {
          setError(err.response.data.message);
        }
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/40 p-4 text-black">
      <div className="w-full max-w-md shadow-lg bg-white rounded-lg p-9">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <p className="text-muted-foreground">Enter your details to register</p>
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
                <span className="absolute left-3 top-3 h-4 w-4 text-muted-foreground">👤</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 w-full border rounded p-2"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
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
              {loading ? "Registering..." : "Register"}
            </button>
  
            <div className="text-center mt-4">
              <span className="text-muted-foreground text-sm">Already have an account? </span>
              <Link to="/" className="text-blue-600 text-sm font-medium hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
