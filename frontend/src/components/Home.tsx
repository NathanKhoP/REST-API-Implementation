import axios from "axios";
import { useState, useEffect } from "react";
import Cards from "./Cards/Cards";
import { useNavigate, Link } from "react-router-dom";

const WebBase = "http://localhost:3000";
const FoodCall = `${WebBase}/food`;

function Home() {
    const [foodData, setFoodData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found! Redirecting to login...");
                navigate("/", { replace: true });
                return;
            }

            const response = await axios.get(FoodCall, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const foodItems = response.data.data;
            console.log("Extracted Food Items:", foodItems);
            setFoodData(foodItems);
        } catch (error) {
            console.error("Error fetching food data:", error);
            setError("Failed to load food items. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this food item?")) {
            try {
                const token = localStorage.getItem("token");
                
                await axios.delete(`${FoodCall}/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                alert("Food item deleted successfully!");
                fetchData(); // Refresh the list after deletion
            } catch (error) {
                console.error("Error deleting food item:", error);
                alert("Failed to delete food item. Please try again.");
            }
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold">Menu Items</h1>
                    <Link to="/add-food" className="bg-blue-600 text-slate-100 py-2 px-4 rounded hover:bg-blue-700">
                        Add New Item
                    </Link>
                </div>
                
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                {loading ? (
                    <p className="text-center text-xl">Loading food data...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {foodData.length > 0 ? (
                            foodData.map((food: any, index) => (
                                <Cards 
                                    key={index}
                                    _id={food._id}
                                    image={food.image} 
                                    name={food.name} 
                                    average={food.rating?.average || 0} 
                                    count={food.rating?.count || 0} 
                                    price={food.price} 
                                    description={food.description}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <p className="text-center col-span-3">No food items found.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;
