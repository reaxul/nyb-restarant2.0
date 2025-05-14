import { baseApi } from "../baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        method: "GET",
        url: `/orders`,
      }),
      providesTags: ["orders"],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/orders/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "orders", id }],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/orders`,
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        method: "PATCH",
        url: `/orders/${orderId}/status`,
        body: { status },
      }),
      invalidatesTags: (result, error, { orderId }) => [{ type: "orders", id: orderId }, "orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/orders/${id}`,
      }),
      invalidatesTags: ["orders"],
    }),
    getUserOrders: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/users/${userId}/orders`,
      }),
      providesTags: ["orders"],
    }),
  }), 
});

export const { 
  useGetAllOrdersQuery, 
  useGetOrderByIdQuery,
  useCreateOrderMutation, 
  useUpdateOrderStatusMutation, 
  useDeleteOrderMutation, 
  useGetUserOrdersQuery 
} = ordersApi;
