import { useState } from "react";
import { menu } from "../constant/menu"; // Use your real API or mock for now

const ManageMenu = () => {
  const [category, setCategory] = useState("FOOD");

  const filteredCategory = menu.filter(
    (item) => item.category.toLocaleUpperCase() === category
  );
  const filteredItems = filteredCategory[0];

  const categories = ["FOOD", "DRINKS", "DESSERTS"];

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold text-primary">Manage Menu</h2>

      {/* Category Tabs */}
      <div className="flex border rounded-lg overflow-hidden w-fit">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-6 py-3 text-sm md:text-base transition-all font-medium ${
              category === item
                ? "bg-primary text-white"
                : "bg-background text-primary"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Menu Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems?.items?.map((item, index) => (
          <div
            key={index}
            className="bg-surface rounded-xl shadow-md p-4 space-y-3 flex flex-col justify-between"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg underline mb-2 font-semibold text-primary">{item.title}</h3>
              <p className="text-sm text-secondary">{item.description}</p>
              <p className="mt-2 font-medium text-orange-400">{item.price} Taka</p>
            </div>

            {/* Manage Actions */}
            <div className="flex gap-2 pt-3">
              <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600">
                Delete
              </button>
              <button className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600">
                Toggle Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMenu;
