import { Eye, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import {
  useGetUserOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../redux/api/ordersApi/ordersApi";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const MyProfile = () => {
  const user = useAppSelector(useCurrentUser);
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const {
    data: orderData,
    isLoading,
    refetch,
  } = useGetUserOrdersQuery(user?._id, { skip: !user });

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const orders =
    orderData?.orders?.map((order) => ({
      id: order._id,
      date: new Date(order.date).toLocaleDateString(),
      items: order.items || [],
      total: order.amount || 0,
      status: order.status,
      originalData: order,
    })) || [];

  useEffect(() => {
    if (user) refetch();
  }, [user, refetch]);

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-800 text-green-200";
      case "pending":
        return "bg-yellow-700 text-yellow-200";
      case "processing":
        return "bg-blue-700 text-blue-200";
      case "cancelled":
        return "bg-red-800 text-red-200";
      default:
        return "bg-gray-700 text-gray-200";
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleStatusUpdate = async () => {
    try {
      await updateOrderStatus({
        orderId: selectedOrder.id,
        status: "cancelled",
      }).unwrap();
      toast.success("Order cancelled successfully");
      setShowOrderModal(false);
      refetch();
    } catch (error) {
      toast.error("Failed to cancel the order");
    }
  };

  const OrderDetailsModal = () => {
    if (!showOrderModal || !selectedOrder) return null;

    const { id, date, status, originalData } = selectedOrder;
    const { paymentMethodId, customerInfo, items } = originalData;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold uppercase">Order Details</h2>
            <button
              onClick={() => setShowOrderModal(false)}
              className="text-gray-400 hover:text-white"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-gray-400 uppercase mb-1">
                  Order ID
                </h3>
                <p className="text-lg">#{id}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 uppercase mb-1">Date</h3>
                <p className="text-lg">{date}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 uppercase mb-1">Status</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(
                    status
                  )}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 uppercase mb-1">
                  Payment Method
                </h3>
                <p className="text-lg">{paymentMethodId}</p>
              </div>
            </div>

            {/* Shipping */}
            {/* <div>
              <h3 className="text-sm text-gray-400 uppercase mb-3">
                Shipping Address
              </h3>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg">
                  {customerInfo.address}, {customerInfo.city},{" "}
                  {customerInfo.state}, {customerInfo.zip},{" "}
                  {customerInfo.country}
                </p>
              </div>
            </div> */}

            {/* Items */}
            <div>
              <h3 className="text-sm text-gray-400 uppercase mb-3">
                Order Items
              </h3>
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.itemId}
                      className="flex items-center space-x-4"
                    >
                      <img
                        src={item.itemImage || "/placeholder.svg"}
                        alt={item.itemName}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-medium">{item.itemName}</h4>
                        <p className="text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium">
                          {(item.price * item.quantity).toFixed(2)} Taka
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-700 p-4 flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <p className="text-lg font-bold">
                    {items
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}{" "}
                    Taka
                  </p>
                </div>
              </div>
            </div>

            {/* Cancel */}
            {status === "pending" && (
              <div className="border-t border-gray-700 pt-4 text-right">
                <button
                  onClick={handleStatusUpdate}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">
            Please log in to view your profile
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 font-babas-neue">
      <div className="max-w-4xl mx-auto bg-gray-900/70 rounded-xl shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="bg-gray-900 p-6">
          <h1 className="text-3xl font-bold uppercase">My Profile</h1>
        </div>
        <div className="flex border-b border-gray-700">
          <button
            className={`px-6 py-3 text-lg uppercase font-semibold flex items-center gap-2 ${
              activeTab === "profile"
                ? "border-b-2 border-white text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="w-5 h-5" />
            Profile Information
          </button>
          <button
            className={`px-6 py-3 text-lg uppercase font-semibold flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-b-2 border-white text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="w-5 h-5" />
            My Orders
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-sm text-gray-400 uppercase">Full Name</h2>
                <p className="text-xl">{user.name || "Not provided"}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-400 uppercase">Email</h2>
                <p className="text-xl">{user.email}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-400 uppercase">Role</h2>
                <p className="text-xl capitalize">{user.role || "customer"}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-sm text-gray-400 uppercase">
                  Member Since
                </h2>
                <p className="text-xl">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h2 className="text-sm text-gray-400 uppercase">
                  Total Orders
                </h2>
                <p className="text-xl">{orders.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="p-6">
            {isLoading ? (
              <p className="text-center text-xl">Loading your orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-center text-xl">
                You haven't placed any orders yet.
              </p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-700 rounded-lg hover:border-gray-500"
                  >
                    <div className="bg-gray-700/40 p-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Order #{order.id}
                        </h3>
                        <p className="text-gray-300">{order.date}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item) => (
                          <span
                            key={item.itemId}
                            className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                            title={`Qty: ${item.quantity}`}
                          >
                            {item.itemName}
                          </span>
                        ))}
                      </div>
                      <div className="text-right font-medium mt-2">
                        {order.total.toFixed(2)} Taka
                      </div>
                    </div>

                    <div className="bg-gray-700/40 p-4 text-right">
                      <button
                        onClick={() => handleViewOrderDetails(order)}
                        className="bg-white text-black px-4 py-1 rounded text-sm hover:bg-gray-300 flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" /> View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <OrderDetailsModal />
    </div>
  );
};

export default MyProfile;
