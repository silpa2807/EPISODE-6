import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import restaurantList from "../utils/mockData";
import ShimmerUI from "./Shimmer";

const Body = () => {
    //when it is loaded, the body component will render completedly. Only after that, the callback function inside
    //useEffect is called
    //use debugger on body return and useEffect to find it out.
    const fetchData = async () => {
        //fetch is a function given by js engine(browser)
        //fetch returns a promise

        //cors policy error will come if we try to call swiigy public api from our local host, browser prevents it
        //we can avoid this using cors chrome extension enabked

        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=9.9768291&lng=76.3099648&page_type=DESKTOP_WEB_LISTING"
        );

        const json = await data.json();
        // setListOfRestaurants(json.data.cards[2].data.data.cards)

        //optional chaining
        setListOfRestaurants(json?.data?.cards[2]?.data?.data?.cards);
        setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    };
    useEffect(() => {
        console.log("useEffect is called");
        fetchData();
    }, []);
    //normal js variable
    console.log("body is called");
    //first body is rendered and then it will render useState
    let ListOfRestaurantsJs = [
        {
            data: {
                id: "559535",
                name: "Chinese Hub",
                cloudinaryImageId: "ydwiyhxzno5rwbynoik3",
                cuisines: ["Chinese", "South Indian", "Juices"],
                costForTwo: 900,
                deliveryTime: 39,
                avgRating: "4.5",
            },
        },
        {
            data: {
                id: "638265",
                name: "Popsy - House Of Popsicles",
                cloudinaryImageId: "snzo23qx710kwbl6y7z5",
                cuisines: ["Indian"],
                costForTwo: 4000,
                deliveryTime: 23,
                avgRating: "3.5",
            },
        },
        {
            data: {
                id: "569597",
                name: "Clinjo Chayakaday",
                cloudinaryImageId: "yronk59n62istg24czyl",
                cuisines: ["Juices", "Beverages"],
                costForTwo: 10000,
                deliveryTime: 30,
                avgRating: "4.2",
            },
        },
    ];
    //local state variable
    //using mock data
    // const [ListOfRestaurants, setListOfRestaurants] = useState(ListOfRestaurantsJs);

    // const arr = useState(restaurantList);
    // const [ListOfRestaurants, setListOfRestaurants] = arr;

    const [ListOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    //conditional rendering
    if (ListOfRestaurants.length === 0) {
        return <ShimmerUI />;
    }
    return ListOfRestaurants.length === 0 ? (
        <ShimmerUI />
    ) : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input
                        type="text"
                        className="search-box"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            //filter rest cards based on search text
                            const filteredRestaurants = ListOfRestaurants.filter(
                                (res) => res.data.name.toLowerCase().includes(searchText.toLowerCase()) 
                            );

                            setFilteredRestaurants(filteredRestaurants)
                        }}
                    >
                        Search
                    </button>
                </div>
                {/* onclick takes a call back function */}
                {/* adding click handler to button */}
                <button
                    className="filter-btn"
                    // onClick={() => {
                    //     //filter resList logic
                    //     ListOfRestaurants = ListOfRestaurants.filter(
                    //         (restaurant) => restaurant.data.avgRating > 4
                    //     );
                    //     console.log("restaurantList are ", ListOfRestaurants);
                    //     //so this console log filtered objects but it will not hsow up in the ui
                    // }}

                    onClick={() => {
                        //filter resList logic
                        const filteredList = ListOfRestaurants.filter(
                            (restaurant) => restaurant.data.avgRating > 4
                        );
                        setListOfRestaurants(filteredList);
                    }}
                >
                    Top Rated Restaurant
                </button>
            </div>
            <div className="res-container">
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.data.id} resData={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default Body;
