import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Programm {
  _id?: string;
  programName: string,
  origin_point: {
    placeName: string,
    coordinates: {
      lat: number,
      lng: number,
    },
  },
  stops: 
    {
      id: string,
      address: string,
      time: string
    }[],
  destination_point: {
    placeName: string,
    coordinates: {
      lat: number,
      lng: number,
    },
  },
  pickUp_date: string,
  droppOff_date: string,
  freeDays_date: string[],
  exceptDays: string[],
  recommanded_capacity: string,
  extra: string[],
  notes: string,
  dropOff_time:string,
  pickUp_Time:string
  
}

export const programmSlice = createApi({
  reducerPath: "programm",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/programm/",
  }),
  tagTypes: ["Programm"],
  endpoints(builder) {
    return {
      fetchProgramms: builder.query<Programm[], number | void>({
        query() {
          return `/getAllProgramms`;
        },
        providesTags: ["Programm"],
      }),
     
      addProgramm: builder.mutation<void, Programm>({
        query(payload) {
          return {
            url: "/newProgramm",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Programm"],
      }),
     
      
    };
  },
});

export const {
  useAddProgrammMutation,
  useFetchProgrammsQuery,
} = programmSlice;
