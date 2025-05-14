 
import { Eye, ShoppingBag, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppSelector } from "../hooks/hooks"
import { useGetUserOrdersQuery, useUpdateOrderStatusMutation } from "../redux/api/ordersApi/ordersApi"
import { useCurrentUser } from "../redux/features/auth/authSlice"
import { toast } from "react-toastify"

const MyProfile = () => {
  const user = useAppSelector(useCurrentUser)
  const [activeTab, setActiveTab] = useState("profile")
  const {
    data: orderData,
    isLoading,
    refetch,
  } = useGetUserOrdersQuery(user?._id, {
    skip: !user,
  })

  const [updateOrderStatus] = useUpdateOrderStatusMutation()

 
  const orders = orderData
    ? orderData?.orders?.map((order) => ({
        id: order._id,
        date: new Date(order.date).toLocaleDateString(),
        items: [
          {
            name: order.itemName,
            quantity: 1,
            price: order.amount,
            image: order.itemImage,
          },
        ],
        total: order.amount,
        status: order.status,
        originalData: order,
      }))
    : []

  useEffect(() => {
    if (user) {
      refetch()
    }
  }, [user, refetch])

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-800 text-green-200"
      case "pending":
        return "bg-yellow-700 text-yellow-200"
      case "processing":
        return "bg-blue-700 text-blue-200"
      case "cancelled":
        return "bg-red-800 text-red-200"
      default:
        return "bg-gray-700 text-gray-200"
    }
  }

  console.log(orderData)

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderModal, setShowOrderModal] = useState(false)

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order)
    setShowOrderModal(true)
  }

  const handleStatusUpdate = async () => {
    await updateOrderStatus({ orderId: selectedOrder.id, status: "cancelled" })
    toast.success("Order cancelled successfully")
    setShowOrderModal(false)
    refetch()
  }

  const OrderDetailsModal = () => {
    if (!showOrderModal || !selectedOrder) return null

    const originalData = selectedOrder.originalData

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold uppercase">Order Details</h2>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-gray-400 uppercase mb-1">Order ID</h3>
                <p className="text-lg">#{selectedOrder.id}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 uppercase mb-1">Date</h3>
                <p className="text-lg">{selectedOrder.date}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 uppercase mb-1">Status</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(selectedOrder.status)}`}
                >
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 uppercase mb-1">Payment Method</h3>
                <p className="text-lg">{originalData.paymentMethodId}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 uppercase mb-3">Shipping Address</h3>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg">
                  {originalData.customerInfo.address}, {originalData.customerInfo.city},{" "}
                  {originalData.customerInfo.state}, {originalData.customerInfo.zip},{" "}
                  {originalData.customerInfo.country}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 uppercase mb-3">Order Items</h3>
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    {originalData.itemImage && (
                      <img
                        src={originalData.itemImage || "/placeholder.svg"}
                        alt={originalData.itemName}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="text-lg font-medium">{originalData.itemName}</h4>
                      <p className="text-gray-400">Item ID: {originalData.itemId}</p>
                      <p className="text-gray-400">Quantity: 1</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium">{originalData.amount.toFixed(2)} Taka</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-700 p-4 flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <p className="text-lg font-bold">{originalData.amount.toFixed(2)} Taka</p>
                </div>
              </div>
            </div>

            {selectedOrder.status === "pending" && (
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-end">
                  <button onClick={() => handleStatusUpdate()} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                    Cancel Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">Please log in to view your profile</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 font-babas-neue">
      <div className="max-w-4xl mx-auto bg-gray-900/70 rounded-xl shadow-md overflow-hidden">
        <div className="bg-gray-900 text-white p-6">
          <h1 className="text-3xl font-bold uppercase">My Profile</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            className={`px-6 py-3 text-lg uppercase font-semibold flex items-center gap-2 ${
              activeTab === "profile" ? "border-b-2 border-white text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="w-5 h-5" />
            Profile Information
          </button>
          <button
            className={`px-6 py-3 text-lg uppercase font-semibold flex items-center gap-2 ${
              activeTab === "orders" ? "border-b-2 border-white text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="w-5 h-5" />
            My Orders
          </button>
        </div>

        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <h2 className="text-sm text-gray-400 uppercase">Member Since</h2>
                  <p className="text-xl">{new Date(user.createdAt).toLocaleDateString() || "Not available"}</p>
                </div>
                <div>
                  <h2 className="text-sm text-gray-400 uppercase">Total Orders</h2>
                  <p className="text-xl">{orders.length}</p>
                </div>
              </div>
            </div>

            {/* <div className="mt-8">
              <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition-colors">
                Edit Profile
              </button>
            </div> */}
          </div>
        )}

        {/* Orders Tab Content */}
        {activeTab === "orders" && (
          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-xl">Loading your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xl">You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-700 rounded-lg overflow-hidden hover:border-gray-500 transition-colors"
                  >
                    <div className="bg-gray-700/40 p-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                        <p className="text-gray-300">{order.date}</p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(order.status)}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-4">
                        {order.items[0].image && (
                          <img
                            src={order.items[0].image || "/placeholder.svg"}
                            alt={order.items[0].name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium">{order.items[0].name}</h4>
                          <p className="text-gray-400">Quantity: {order.items[0].quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.total.toFixed(2)} Taka</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-700/40 p-4 flex justify-end">
                      <button
                        onClick={() => handleViewOrderDetails(order)}
                        className="bg-white text-black px-4 py-1 rounded text-sm hover:bg-gray-300 transition-colors flex items-center gap-1"
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
  )
}

export default MyProfile
