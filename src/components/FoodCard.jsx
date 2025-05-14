import { Link } from "react-router-dom";

const FoodCard = ({ item }) => {
  return (
    <div className="border font-open-sans border-[#333] rounded-2xl shadow-lg overflow-hidden bg-[#1a1a1a] text-white">
      <Link to={`/menu/${item.id}`} className="relative overflow-hidden block">
        <img
          loading="lazy"
          src={item.image}
          alt={item.title}
          className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition-all duration-300"
        />
      </Link>
      <div className="p-4">
        <Link to={`/menu/${item.id}`} className="cursor-pointer hover:underline">
          <h2 className="text-xl font-semibold text-white">{item.title}</h2>
        </Link>
        <p className="text-gray-400 text-sm mt-2">{item.description}</p>
        <div className="mt-3 text-lg font-bold text-white">
          {item.price} Taka
        </div>

        {item.vegetarian !== undefined && (
          <div
            className={`mt-2 text-sm font-medium ${
              item.vegetarian ? "text-green-400" : "text-red-400"
            }`}
          >
            {item.vegetarian ? "Vegetarian" : "Non-Vegetarian"}
          </div>
        )}

        {item.caffeine !== undefined && (
          <div
            className={`mt-2 text-sm font-medium ${
              item.caffeine ? "text-yellow-400" : "text-blue-400"
            }`}
          >
            {item.caffeine ? "Contains Caffeine" : "Caffeine Free"}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;


