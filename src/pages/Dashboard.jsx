"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useAppSelector } from "../hooks/hooks"
import { useGetAllOrdersQuery } from "../redux/api/ordersApi/ordersApi"
import { useGetAllUsersQuery } from "../redux/api/userApi/userApi"
import { useCurrentUser } from "../redux/features/auth/authSlice"

// Reusable components
const StatCard = ({ title, value, prefix = "", icon: Icon }) => (
  <div className="bg-surface rounded-xl p-6 shadow-lg">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-secondary mb-2">{title}</h3>
        <p className="text-3xl font-bold text-primary">
          {prefix}
          {value}
        </p>
      </div>
      {Icon && <Icon className="w-10 h-10 text-primary opacity-70" />}
    </div>
  </div>
)

const ChartCard = ({ title, children }) => (
  <div className="bg-surface rounded-xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold text-secondary mb-4">{title}</h3>
    <div className="h-[300px]">{children}</div>
  </div>
)

const Dashboard = () => {
  const user = useAppSelector(useCurrentUser)
  const navigate = useNavigate()
  const { data: ordersData, isLoading: isLoadingOrders } = useGetAllOrdersQuery()
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  if (!user || isLoadingOrders || isLoadingUsers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Process orders data
  const orders = ordersData?.orders || []
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0)

  // Process users data
  const users = usersData?.users || []

  // Calculate order status counts
  const statusCounts = orders.reduce((acc, order) => {
    const status = order.status || "pending"
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})

  const orderStatusData = Object.keys(statusCounts).map((status) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: statusCounts[status],
  }))

  // Generate monthly revenue data
  const monthlyData = orders.reduce((acc, order) => {
    const date = new Date(order.date)
    const month = date.toLocaleString("default", { month: "short" })

    if (!acc[month]) {
      acc[month] = { name: month, revenue: 0, orders: 0 }
    }

    acc[month].revenue += order.amount
    acc[month].orders += 1

    return acc
  }, {})

  const revenueData = Object.values(monthlyData)

  // Define colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary font-open-sans">Dashboard</h2>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={users.length}
            icon={(props) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            )}
          />
          <StatCard
            title="Total Orders"
            value={orders.length}
            icon={(props) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            )}
          />
          <StatCard
            title="Total Revenue"
            value={totalRevenue.toFixed(2)}
            prefix="TK"
            icon={(props) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            )}
          />
        </div>

        <ChartCard title="Revenue Overview">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-secondary)" />
              <YAxis stroke="var(--color-secondary)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#1E90FF",
                }}
                formatter={(value) => [`$${value.toFixed(2)}`, "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#1E90FF"
                fill="#1E90FF"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="Order Status Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#1E90FF"
                  dataKey="value"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                    const RADIAN = Math.PI / 180
                    const radius = 25 + innerRadius + (outerRadius - innerRadius)
                    const x = cx + radius * Math.cos(-midAngle * RADIAN)
                    const y = cy + radius * Math.sin(-midAngle * RADIAN)

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#1E90FF"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {orderStatusData[index].name} ({value})
                      </text>
                    )
                  }}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-surface)",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#1E90FF",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Monthly Orders">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-secondary)" />
                <YAxis stroke="var(--color-secondary)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-surface)",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#1E90FF",
                  }}
                />
                <Bar dataKey="orders" fill="#1E90FF" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-secondary mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center space-x-3">
                    {order.itemImage && (
                      <img
                        src={order.itemImage || "/placeholder.svg"}
                        alt={order.itemName}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-primary">{order.itemName}</p>
                      <p className="text-sm text-secondary">{order.customerInfo.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">${order.amount.toFixed(2)}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "completed"
                          ? "bg-green-500/70 text-white"
                          : order.status === "pending"
                            ? "bg-yellow-500/70 text-white"
                            : "bg-blue-500/70 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-secondary mb-4">Recent Users</h3>
            <div className="space-y-4">
              {users.slice(0, 5).map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-primary">{user.name}</p>
                    <p className="text-sm text-secondary">{user.email}</p>
                  </div>
                  <div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        user.status === "active" ? "bg-green-500/70 text-white" : "bg-red-500/70 text-white"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
