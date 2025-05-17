import { Link } from "react-router-dom";

const MenuDetails = ({ item }) => {
  if (!item) return null;

  const { name, description, image, price, type } = item;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white p-6">
      <div className="max-w-3xl w-full bg-[#1a1a1a] rounded-2xl shadow-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-72 object-cover rounded-t-2xl"
        />
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-base text-gray-300">{description}</p>
          <p className="text-lg font-bold text-orange-400">{price} Taka</p>

          {type && (
            <p
              className={`text-sm font-medium ${
                type.toLowerCase() === "vegetarian"
                  ? "text-green-400"
                  : type.toLowerCase() === "non-vegetarian"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {type}
            </p>
          )}

          <Link to={`/checkout/${item._id}`}>
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <span className="text-xl">Order Now</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
