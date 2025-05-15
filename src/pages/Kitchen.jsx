/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import { useAppSelector } from "../hooks/hooks"
import { useGetAllOrdersQuery } from "../redux/api/ordersApi/ordersApi"
import { useCurrentUser } from "../redux/features/auth/authSlice"

const Kitchen = () => {
  const user = useAppSelector(useCurrentUser)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const { data: orderData } = useGetAllOrdersQuery()

  const orders = orderData
    ? orderData.orders
        .map((order) => ({
          id: order._id,
          customer: order.customerInfo.name,
          total: order.amount,
          status: order.status,
          date: new Date(order.date).toLocaleDateString(),
          orderDate: new Date(order.date),
          itemName: order.itemName,
          itemImage: order.itemImage,
        }))
        .sort((a, b) => b.orderDate - a.orderDate)
    : []

  if (!user) return null

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm)
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500 text-white"
      case "pending":
        return "bg-yellow-500 text-white"
      case "processing":
        return "bg-blue-500 text-white"
      case "cancelled":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary font-open-sans">Kitchen Dashboard</h2>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-hover transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">#{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">{order.itemName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">{order.total.toFixed(2)} TK</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">{order.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Kitchen