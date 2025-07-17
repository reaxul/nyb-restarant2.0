import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

const FoodCard = ({ item }) => {
  const dispatch = useDispatch();
  const isAvailable = item.status === "available";

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div
      className={`relative border font-open-sans border-[#333] rounded-2xl shadow-lg overflow-hidden bg-[#1a1a1a] text-white ${
        !isAvailable ? "pointer-events-none" : ""
      }`}
    >
      <img
        loading="lazy"
        src={item.image}
        alt={item.name}
        className={`w-full h-64 object-cover transition-transform duration-300 ${
          isAvailable ? "hover:scale-105" : "brightness-50 blur-sm"
        }`}
      />
      {!isAvailable && (
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold bg-black bg-opacity-60 text-lg">
          Not Available Right Now
        </div>
      )}

      <div className={`p-4 ${!isAvailable ? "opacity-60" : ""}`}>
        <div className="flex justify-between items-center mb-2">
          <div
            className={`cursor-pointer hover:underline ${
              !isAvailable ? "pointer-events-none" : ""
            }`}
            tabIndex={isAvailable ? 0 : -1}
          >
            <h2 className="text-xl font-semibold">{item.name}</h2>
          </div>

          {isAvailable && (
            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full cursor-pointer"
              title="Add to Cart"
            >
              <Plus size={18} />
            </button>
          )}
        </div>

        <p className="text-gray-400 text-sm">{item.description}</p>

        <div className="mt-2 text-lg font-bold">{item.price} Taka</div>

        {item.type && (
          <div
            className={`mt-2 text-sm font-medium ${
              ["vegetarian", "caffeine free"].includes(item.type.toLowerCase())
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {item.type}
          </div>
        )}

        {item.status && (
          <div className="mt-1 text-xs text-gray-400 italic">
            Status: {item.status}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
