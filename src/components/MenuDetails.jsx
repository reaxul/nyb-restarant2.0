 
import { Link } from "react-router-dom";
 
const MenuDetails = ({ item }) => {
 
 
  return (
<>

    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-[#1a1a1a] rounded-2xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-[400px] object-cover"
          />
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{item.title}</h1>
              <p className="text-gray-400 text-lg">{item.description}</p>
            </div>
            <div className="text-2xl font-bold text-white">{item.price} Taka</div>
          </div>

          {/* Dietary Information */}
          <div className="flex gap-4 mb-8">
            {item.vegetarian !== undefined && (
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                item.vegetarian ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
              }`}>
                {item.vegetarian ? "Vegetarian" : "Non-Vegetarian"}
              </span>
            )}
            {item.caffeine !== undefined && (
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                item.caffeine ? "bg-yellow-900 text-yellow-300" : "bg-blue-900 text-blue-300"
              }`}>
                {item.caffeine ? "Contains Caffeine" : "Caffeine Free"}
              </span>
            )}
          </div>
<Link to={`/checkout/${item.id}`}>

          <button
      
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span className="text-xl">Order Now</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button></Link>
        </div>
      </div>
    </div>
 
    </>
  );
};

export default MenuDetails; 