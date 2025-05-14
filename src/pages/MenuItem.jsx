import { useParams } from "react-router-dom";
import { menu } from "../constant/menu";
import MenuDetails from "../components/MenuDetails";

const MenuItem = () => {
  const { id } = useParams();

  // Find the menu item by id
  const menuItem = menu.reduce((found, category) => {
    if (found) return found;
    return category.items.find(item => item.id === parseInt(id));
  }, null);

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