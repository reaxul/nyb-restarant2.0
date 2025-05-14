import { useState } from "react";
import { menu } from "../constant/menu";
import FoodCard from "../components/FoodCard";

const Menu = () => {
  const [category, setCategory] = useState("FOOD");

  const filterdCategory = menu.filter(
    (item) => item.category.toLocaleUpperCase() === category
  );
  const filterdItems = filterdCategory[0];

  const categories = ["FOOD", "DRINKS", "DESSERTS"];

  return (
    <div className="">
      {/* Tabs buttons */}
      <div className="flex items-center border w-fit  px-5 pt-10">
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

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6   ">
        {filterdItems?.items?.map((item, index) => (
          <FoodCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
