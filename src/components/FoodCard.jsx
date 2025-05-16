import { Link } from "react-router-dom";

const FoodCard = ({ item }) => {
  const isAvailable = item.status === "available";

  return (
    <div
      className={`relative border font-open-sans border-[#333] rounded-2xl shadow-lg overflow-hidden bg-[#1a1a1a] text-white
        ${!isAvailable ? "pointer-events-none" : ""}
      `}
    >
      <Link
        to={isAvailable ? `/menu/${item._id}` : "#"}
        className="relative block overflow-hidden"
        tabIndex={isAvailable ? 0 : -1} // prevent tabbing when unavailable
      >
        <img
          loading="lazy"
          src={item.image}
          alt={item.name}
          className={`w-full h-64 object-cover cursor-pointer transition-transform duration-300 ${
            isAvailable ? "hover:scale-105" : "brightness-50 blur-sm"
          }`}
        />
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold bg-black bg-opacity-60 text-lg">
            Not Available Right Now
          </div>
        )}
      </Link>

      <div className={`p-4 ${!isAvailable ? "opacity-60" : ""}`}>
        <Link
          to={isAvailable ? `/menu/${item._id}` : "#"}
          className={`cursor-pointer hover:underline ${
            !isAvailable ? "pointer-events-none" : ""
          }`}
          tabIndex={isAvailable ? 0 : -1}
        >
          <h2 className="text-xl font-semibold text-white">{item.name}</h2>
        </Link>

        <p className="text-gray-400 text-sm mt-2">{item.description}</p>

        <div className="mt-3 text-lg font-bold text-white">{item.price} Taka</div>

        {item.type && (
          <div
            className={`mt-2 text-sm font-medium ${
              item.type.toLowerCase() === "vegetarian"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {item.type}
          </div>
        )}

        {item.status && (
          <div className="mt-1 text-xs text-gray-400 italic">Status: {item.status}</div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
