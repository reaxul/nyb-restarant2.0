import { useState } from "react";
import { useGetAllMenuItemsQuery } from "../redux/api/menuApi/menuApi";
import FoodCard from "../components/FoodCard";

const Menu = () => {
  const [category, setCategory] = useState("FOOD");
  const { data, isLoading, isError, error } = useGetAllMenuItemsQuery();

  const categories = ["FOOD", "DRINKS", "DESSERTS"];

  // Extract and normalize menu items
  const menuItems = data?.items || [];

  // Filter by category (case-insensitive match)
  const filteredItems = menuItems.filter(
    (item) => item.category?.toUpperCase() === category
  );

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex items-center border w-fit px-5 pt-10">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-5 text-lg md:text-2xl tracking-wide py-4 border-collapse cursor-pointer border transition-colors ${
              category === item ? "bg-black text-white" : "bg-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Loading / Error Feedback */}
      {isLoading && <p className="p-6 text-xl">Loading menu...</p>}
      {isError && (
        <p className="p-6 text-xl text-red-500">
          Error: {error?.data?.message || "Failed to load menu"}
        </p>
      )}

      {/* Filtered Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {!isLoading && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <FoodCard key={item._id} item={item} />
          ))
        ) : (
          !isLoading && (
            <p className="text-gray-500 col-span-full">
              No items found in the {category.toLowerCase()} category.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Menu;