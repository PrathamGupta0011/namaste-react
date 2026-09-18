import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import resList from "../utils/mockData";
import Shimmer from "./Shimmer";

const Body =() => {

    // Local State Variable - Super Powerful Variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);

    const [filteredRestaurant , setFilteredRestaurant] =useState([]);
    
    const[searchtext, setSearchtext] = useState("");

    useEffect(()=>{
        fetchData();
    }, []);



    const fetchData = async () => {
    const data = await fetch(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    // yahan ek async function banaya h isliye kyuki API se data aane mein time lagta hai

    // yahan javascript ka fetch() function swiggy ke API URL par request bhej raha hai .... fetch() ka basic kaam "Swiggy bhai , mujhe restaurant ka data do."

    const json = await data.json();
    // API responses ko JSON mein convert karna 
    // becoz fetch() se jo response ata h wo Javascript Object nahi hota h isliye data.json() response ko JSON/Javascript Object mein convert karta h

    console.log(json);
    // isse browser ke developer too -> console me API ka complete data dikhega

    const cards = json.data.cards;

    

    setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    

    setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };


    // conditional Rendering -> Rendering a page acoording to the condition
    if(listOfRestaurants.length === 0){
        return <Shimmer />;
    }

    return(
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type ="text" className="search-box" value={searchtext}
                    onChange={(e) => {
                        console.log(e.target.value);
                        setSearchtext(e.target.value);
                    }}
                    />
                    <button onClick={() =>{
                        //Filter the restaurant card and update the UI
                        // search text
                        console.log(searchtext);

                        const filteredRestaurant = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchtext.toLowerCase())
                    );

                    setFilteredRestaurant(filteredRestaurant);
                    }}
                    >
                    Search
                    </button>

                </div>
               <button className="filter-btn"
               onClick={() => {
                // filter logic
                const filteredList = listOfRestaurants.filter((res) => res?.info?.avgRating > 4);
                setListOfRestaurants(filteredList);
                
               }}
               >Top Rated Restaurants
               </button>
            </div>
            <div className="res-container">
                {filteredRestaurant.map((restaurant)=> (
                <RestaurantCard key={restaurant.info?.id} resData={restaurant} />
                ))}
            </div>
        </div>
    );
};


export default Body;