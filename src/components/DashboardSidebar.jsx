import { useAppSelector } from "../hooks/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";
 

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  const user = useAppSelector(useCurrentUser);

  return (
    <div className="bg-surface rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-primary font-open-sans">
            Welcome, {user?.email?.split("@")[0] || "User"}!
          </h3>
          <p className="text-secondary font-open-sans">
            {user?.email || "No email available"}
          </p>
        </div>
      </div>

      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8">
          {["overview", "users", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-primary"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize font-open-sans`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
