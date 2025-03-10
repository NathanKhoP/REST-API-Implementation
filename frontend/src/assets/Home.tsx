import axios from "axios";
import { useState, useEffect } from "react";
import Cards from "./Cards/Cards";
import { useNavigate } from "react-router-dom";

const WebBase = "http://localhost:3000";
const FoodCall = `${WebBase}/food`;

function Home() {
    const [foodData, setFoodData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
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
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <h1 className=" text-6xl font-bold pb-2">MENU</h1>
         <div className="grid grid-cols-3 gap-4 p-4">
            {foodData.length > 0 ? (
                foodData.map((food : any, index) => (
                    <Cards 
                        key={index}
                        image={food.image} 
                        name={food.name} 
                        average={food.rating?.average || 0} 
                        count={food.rating?.count || 0} 
                        price={food.price} 
                        description={food.description}
                    />
                ))
            ) : (
                <p className="text-center col-span-3">Loading food data...</p>
            )}
        </div>
        </>
    );
}

export default Home;
