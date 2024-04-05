import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Luggage {
  _id?: string;
    size: string;
    description: string;
}

export const luggageSlice = createApi({
  reducerPath: "lugagge",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bouden.uk.oxa.cloud/api/luggage",
  }),
  tagTypes: ["Luggage"],
  endpoints(builder) {
    return {
      getAllLuggage: builder.query<Luggage[], number | void>({
        query() {
          return "/getAllLuggages";
        },
        providesTags: ["Luggage"],
      }),
      addNewLuggage: builder.mutation<void, Luggage>({
        query(payload) {
          return {
            url: "/newLuggage",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Luggage"],
      }),
      deleteLuggage: builder.mutation<void, Luggage>({
        query: (_id) => ({
            url: `/deleteLuggage/${_id}`,
            method: "Delete",
        }),
        invalidatesTags: ["Luggage"],
    }),
    };
  },
});

export const {
useGetAllLuggageQuery,
useAddNewLuggageMutation,
useDeleteLuggageMutation
} = luggageSlice;