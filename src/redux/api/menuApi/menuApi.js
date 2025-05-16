import { baseApi } from "../baseApi";

const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMenuItems: builder.query({
      query: () => ({
        method: "GET",
        url: "/menu",
      }),
      providesTags: ["menu"],
    }),

    getMenuItemById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/menu/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "menu", id }],
    }),

    createMenuItem: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/menu",
        body: data,
      }),
      invalidatesTags: ["menu"],
    }),

    updateMenuItem: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/menu/${id}`,
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "menu", id }, "menu"],
    }),

    deleteMenuItem: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/menu/${id}`,
      }),
      invalidatesTags: ["menu"],
    }),
  }),
});

export const {
  useGetAllMenuItemsQuery,
  useGetMenuItemByIdQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = menuApi;