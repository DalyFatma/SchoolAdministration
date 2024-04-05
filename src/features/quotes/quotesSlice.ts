import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Quote {
  _id?: string;
  passengers_number: number;
  journey_type: string;
  estimated_start_time: string;
  estimated_return_start_time: string;
  destination_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  start_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  vehicle_type: string;
  id_visitor: string;
  notes: string;
  createdAt: string;
  luggage_details: string;
  manual_cost: string;
  status: string;
  progress: string;
  balance: string;
  deposit: string;
  id_driver: string;
  id_vehicle: string;
  total_price: string,
  deposit_percentage: string,
  automatic_cost: string,
  deposit_amount: string
}

export const quoteSlice = createApi({
  reducerPath: "quote",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bouden.uk.oxa.cloud/api/quote",
  }),
  tagTypes: ["Quote"],
  endpoints(builder) {
    return {
      getAllQuote: builder.query<Quote[], number | void>({
        query() {
          return "/getAllQuotes";
        },
        providesTags: ["Quote"],
      }),
      getQuoteById: builder.query<Quote, number | void>({
        query: (_id) => ({
          url: `/getQuoteById/${_id}`,
          method: "GET",
        }),
        providesTags: ["Quote"],
      }),
      getQuoteByIdSchedule: builder.query<Quote[], { id_schedule: string }>({
        query: ({id_schedule}) => ({
          url: `/getQuoteByIdSchedule`,
          method: "POST",
          body:{id_schedule: id_schedule}
        }),
        providesTags: ["Quote"],
      }),
      
    
    
    };
  },
});

export const {
  useGetAllQuoteQuery,
  useGetQuoteByIdQuery,
  useGetQuoteByIdScheduleQuery

} = quoteSlice;