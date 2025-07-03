import { useState } from "react";
import {
  useGetAllMenuItemsQuery,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
} from "../redux/api/menuApi/menuApi";

const ManageMenu = () => {
  const [category, setCategory] = useState("FOOD");
  const [itemToDelete, setItemToDelete] = useState(null); // store item pending deletion

  const { data, isLoading, isError, refetch } = useGetAllMenuItemsQuery();
  const [deleteMenuItem] = useDeleteMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();

  const categories = ["FOOD", "DRINKS", "DESSERTS", "CHEF'S SPECIAL"];

  const menuItems = data?.items || [];
  const filteredItems = menuItems.filter(
    (item) => item.category?.toUpperCase() === category
  );

  const handleDelete = async () => {
    if (!itemToDelete) return;
    await deleteMenuItem(itemToDelete._id);
    setItemToDelete(null);
    refetch();
  };

  const handleToggleStatus = async (item) => {
    const newStatus = item.status === "available" ? "unavailable" : "available";
    await updateMenuItem({ id: item._id, data: { status: newStatus } });
    refetch();
  };

  const handleEdit = (item) => {
    const newName = prompt("Edit name:", item.name);
    if (newName && newName !== item.name) {
      updateMenuItem({ id: item._id, data: { name: newName } }).then(refetch);
    }
  };

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

      {/* Loader or Error */}
      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Failed to load menu items.</p>}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-surface rounded-xl shadow-md p-4 space-y-3 flex flex-col justify-between"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg underline mb-2 font-semibold text-primary">
                {item.name}
              </h3>
              <p className="text-sm text-secondary">{item.description}</p>
              <p className="mt-2 font-medium text-orange-400">{item.price} Taka</p>
              <p className="text-xs mt-1 italic text-gray-400">
                Status: {item.status}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-3">
              {/* <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
              >
                Edit
              </button> */}
              <button
                onClick={() => handleToggleStatus(item)}
                className="px-3 py-1 bg-emerald-500 text-white text-sm rounded-md hover:bg-yellow-600"
              >
                Toggle Status
              </button>
              <button
                onClick={() => setItemToDelete(item)} // open modal instead of direct delete
                className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete <strong>{itemToDelete.name}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMenu;
