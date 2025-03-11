import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    createdDate: new Date().toISOString().split("T")[0],
    category: "",
    description: "",
    image: "",
    rating: {
      average: 0,
      count: 0
    },
    ingredients: [""],
    price: 0,
    initialQty: 0,
    qty: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "average") {
      setFormData({
        ...formData,
        rating: {
          ...formData.rating,
          average: parseFloat(value)
        }
      });
    } else if (name === "count") {
      setFormData({
        ...formData,
        rating: {
          ...formData.rating,
          count: parseInt(value)
        }
      });
    } else if (name === "price" || name === "initialQty" || name === "qty") {
      setFormData({
        ...formData,
        [name]: parseFloat(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""]
    });
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients.splice(index, 1);
      setFormData({
        ...formData,
        ingredients: updatedIngredients
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Set the qty equal to initialQty for new items
    const submitData = {
      ...formData,
      qty: formData.initialQty
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to add food items.");
        navigate("/", { replace: true });
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/food",
        submitData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.status === "success") {
        alert("Food item added successfully!");
        navigate("/home");
      }
    } catch (err: any) {
      console.error("Error adding food item:", err);
      setError(err.response?.data?.message || "Failed to add food item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Add New Food Item</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Category</option>
                  <option value="Italian">Italian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Indian">Indian</option>
                  <option value="American">American</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Initial Quantity *</label>
                <input
                  type="number"
                  name="initialQty"
                  value={formData.initialQty}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Creation Date</label>
                <input
                  type="date"
                  name="createdDate"
                  value={formData.createdDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            
            {/* Details and Rating */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Image URL *</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Rating Average</label>
                  <input
                    type="number"
                    name="average"
                    value={formData.rating.average}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Rating Count</label>
                  <input
                    type="number"
                    name="count"
                    value={formData.rating.count}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Ingredients */}
          <div className="mt-6">
            <label className="block text-xl font-medium mb-3">Ingredients</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="flex-grow p-2 border rounded"
                  placeholder="Ingredient name"
                />
                <button 
                  type="button" 
                  onClick={() => removeIngredient(index)}
                  className="ml-2 bg-red-500 text-white p-2 rounded-full"
                  disabled={formData.ingredients.length <= 1}
                >
                  ✕
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addIngredient}
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
            >
              Add Ingredient
            </button>
          </div>
          
          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full md:w-auto"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Food Item"}
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="mt-2 md:mt-0 md:ml-4 border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 w-full md:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFood;
