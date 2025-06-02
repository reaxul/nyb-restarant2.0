/* eslint-disable no-unused-vars */
"use client";

import { AlertCircle, CheckCircle, Eye, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../hooks/hooks";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../redux/api/ordersApi/ordersApi";
import { useCurrentUser } from "../redux/features/auth/authSlice";

const Orders = () => {
  const user = useAppSelector(useCurrentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data: orderData, refetch } = useGetAllOrdersQuery();
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  // Transform API data to match our component's expected format
  const orders = orderData
    ? orderData.orders
        .map((order) => ({
          id: order._id,
          customer: order.customerInfo.name,
          total: order.amount,
          status: order.status,
          date: new Date(order.date).toLocaleDateString(),
          orderDate: new Date(order.date),
          orderDetails: order.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
            itemId: item.itemId,
          })),
          originalData: order,
        }))
        .sort((a, b) => b.orderDate - a.orderDate)
    : [];

  if (!user) {
    return null;
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const handleApproveOrder = (order) => {
    setSelectedOrder(order);
    setShowApproveModal(true);
  };

  const handleDeleteOrder = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const confirmCancelOrder = async () => {
    try {
      await updateOrderStatus({
        orderId: selectedOrder.id,
        status: "cancelled",
      });
      toast.success(`Order #${selectedOrder.id} has been cancelled`);
      setShowCancelModal(false);
      setSelectedOrder(null);
      refetch();
    } catch (error) {
      toast.error("Failed to cancel order. Please try again.");
    }
  };

  const confirmApproveOrder = async () => {
    try {
      await updateOrderStatus({
        orderId: selectedOrder.id,
        status: "completed",
      });
      toast.success(`Order #${selectedOrder.id} has been approved`);
      setShowApproveModal(false);
      setSelectedOrder(null);
      refetch();
    } catch (error) {
      toast.error("Failed to approve order. Please try again.");
    }
  };

  const confirmDeleteOrder = async () => {
    try {
      await deleteOrder(selectedOrder.id);
      toast.success(`Order #${selectedOrder.id} has been deleted`);
      setShowDeleteModal(false);
      setSelectedOrder(null);
      refetch();
    } catch (error) {
      toast.error("Failed to delete order. Please try again.");
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "processing":
        return "bg-blue-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const ViewOrderModal = () => {
    if (!showViewModal || !selectedOrder) return null;

    const originalData = selectedOrder.originalData;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-surface rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-primary">Order Details</h3>
            <button
              onClick={() => setShowViewModal(false)}
              className="text-secondary hover:text-primary"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-secondary">Order ID</p>
                <p className="text-primary font-semibold">
                  #{selectedOrder.id}
                </p>
              </div>
              <div>
                <p className="text-secondary">Customer</p>
                <p className="text-primary font-semibold">
                  {originalData.customerInfo.name}
                </p>
              </div>
              <div>
                <p className="text-secondary">Date</p>
                <p className="text-primary font-semibold">
                  {new Date(originalData.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-secondary">Status</p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                    originalData.status
                  )}`}
                >
                  {originalData.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-secondary">Email</p>
                <p className="text-primary font-semibold">
                  {originalData.customerInfo.email}
                </p>
              </div>
              <div>
                <p className="text-secondary">Payment Method</p>
                <p className="text-primary font-semibold">
                  {originalData.paymentMethodId}
                </p>
              </div>
            </div>

            {/* <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-secondary">Shipping Address</p>
                <p className="text-primary font-semibold">
                  {originalData.customerInfo.address},{" "}
                  {originalData.customerInfo.city},{" "}
                  {originalData.customerInfo.state},{" "}
                  {originalData.customerInfo.zip},{" "}
                  {originalData.customerInfo.country}
                </p>
              </div>
            </div> */}

            <div className="border-t border-border pt-4">
              <h4 className="text-lg font-semibold text-primary mb-2">
                Order Items
              </h4>
              <div className="space-y-2">
                {originalData.items.map((item, index) => (
                  <div
                    key={item.itemId || index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.itemImage || "/placeholder.svg"}
                        alt={item.itemName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-primary">{item.itemName}</p>
                        <p className="text-secondary text-sm">
                          Item ID: {item.itemId}
                        </p>
                        <p className="text-secondary text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-primary">
                      {(item.price * item.quantity).toFixed(2)} Taka
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-primary">Total</p>
                  <p className="text-lg font-semibold text-primary">
                    {originalData.amount.toFixed(2)} Taka
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <h4 className="text-lg font-semibold text-primary mb-2">
                Order Actions
              </h4>
              <div className="flex flex-wrap gap-3">
                {originalData.status === "pending" && (
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleApproveOrder(selectedOrder);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Order
                  </button>
                )}

                {(originalData.status === "pending" ||
                  originalData.status === "processing") && (
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleCancelOrder(selectedOrder);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel Order
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleDeleteOrder(selectedOrder);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StatusUpdateModal = ({
    show,
    onClose,
    onConfirm,
    title,
    message,
    confirmText,
    confirmButtonClass,
    icon,
    isLoading,
  }) => {
    if (!show || !selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-surface rounded-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-primary">{title}</h3>
            <button
              onClick={onClose}
              className="text-secondary hover:text-primary"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-3 mb-6">
            {icon}
            <p className="text-primary">{message}</p>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border hover:bg-hover text-primary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg text-white ${confirmButtonClass}`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary font-open-sans">
          Orders
        </h2>
      </div>

      <div className="bg-surface rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-primary font-open-sans"
            />
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-primary font-open-sans"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-hover">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-hover transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                      #{idx + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                      {order.total.toFixed(2)} TK
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                          title="View Order"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {order.status === "pending" && (
                          <button
                            onClick={() => handleApproveOrder(order)}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                            title="Approve Order"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {(order.status === "pending" ||
                          order.status === "processing") && (
                          <button
                            onClick={() => handleCancelOrder(order)}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                            title="Cancel Order"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteOrder(order)}
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white hover:bg-gray-800 transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ViewOrderModal />

      <StatusUpdateModal
        show={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={confirmApproveOrder}
        title="Approve Order"
        message={`Are you sure you want to approve order #${selectedOrder?.id}? This will change the status to completed.`}
        confirmText="Yes, Approve"
        confirmButtonClass="bg-green-500 hover:bg-green-600"
        icon={<CheckCircle className="w-6 h-6 text-green-500" />}
        isLoading={isUpdating}
      />

      <StatusUpdateModal
        show={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancelOrder}
        title="Cancel Order"
        message={`Are you sure you want to cancel order #${selectedOrder?.id}? This action cannot be undone.`}
        confirmText="Yes, Cancel Order"
        confirmButtonClass="bg-red-500 hover:bg-red-600"
        icon={<XCircle className="w-6 h-6 text-red-500" />}
        isLoading={isUpdating}
      />

      <StatusUpdateModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteOrder}
        title="Delete Order"
        message={`Are you sure you want to delete order #${selectedOrder?.id}? This action cannot be undone.`}
        confirmText="Yes, Delete Order"
        confirmButtonClass="bg-gray-700 hover:bg-gray-800"
        icon={<AlertCircle className="w-6 h-6 text-gray-700" />}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Orders;
