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
        return "bg-green-100 text-green-700 border border-green-400"
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-400"
      case "processing":
        return "bg-blue-100 text-blue-700 border border-blue-400"
      case "cancelled":
        return "bg-red-100 text-red-700 border border-red-400"
      default:
        return "bg-gray-100 text-gray-700 border border-gray-400"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary font-open-sans">Kitchen Dashboard</h2>
      </div>

      <div className="bg-surface rounded-2xl shadow-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search orders by customer or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-primary font-open-sans"
          />

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-primary font-open-sans"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full text-sm text-left table-auto">
            <thead className="bg-hover text-secondary uppercase text-xs font-semibold tracking-wide">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Item</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface text-primary">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, idx) => (
                  <tr key={order.id} className="hover:bg-hover transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">#{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.itemName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.total.toFixed(2)} TK</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-medium rounded-full transition-all duration-300 ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center px-6 py-10 text-gray-500">
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
