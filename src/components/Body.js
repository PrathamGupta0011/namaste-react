import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import resList from "../utils/mockData";

const Body =() => {

    // Local State Variable - Super Powerful Variable
    const [listOfRestaurants, setListOfRestaurants] = useState(resList);


    return(
        <div className="body">
            <div className="filter">
               <button className="filter-btn"
               onClick={() => {
                // filter logic
                const filteredList = listOfRestaurants.filter((res) => res.data.avgRating > 4);
                setListOfRestaurants(filteredList);
                
               }}
               >Top Rated Restaurants
               </button>
            </div>
            <div className="res-container">
                {listOfRestaurants.map((restaurant)=> (
                <RestaurantCard key={restaurant.data.id}resData={restaurant} />
                ))}
            </div>
        </div>
    )
}


export default Body;