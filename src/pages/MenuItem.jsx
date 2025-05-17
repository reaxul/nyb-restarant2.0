import { useParams } from "react-router-dom";
import { useGetAllMenuItemsQuery } from "../redux/api/menuApi/menuApi";
import MenuDetails from "../components/MenuDetails";

const MenuItem = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetAllMenuItemsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (isError || !data?.items) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load menu items.</p>
      </div>
    );
  }

  const menuItem = data.items.find((item) => item._id === id);

  if (!menuItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Item Not Found</h1>
          <p className="text-gray-400">The menu item you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <MenuDetails item={menuItem} />;
};

export default MenuItem;
