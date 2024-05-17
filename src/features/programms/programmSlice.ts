import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Programm {
  _id?: string;
  note:string;
  school_id:string;
  programName: string;
  origin_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  stops: {
    id: string;
    address: {
      placeName:string,
      coordinates:{
        lat:number,
        lng:number
      }
    },
    time: string;
  }[];
  destination_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  pickUp_date: string;
  droppOff_date: string;
  freeDays_date: string[];
  exceptDays: string[];
  recommanded_capacity: string;
  extra: string[];
  vehiculeType:string;
  luggage:string;
  journeyType:string;
  notes: string;
  dropOff_time: string;
  pickUp_Time: string;
  workDates: string[];
  program_status?: {
    status: string,
    date_status: string,
  }[];

}
export interface SendResponse {
  id: string;
  notes_for_client: {
    msg: string;
    date: string;
    sender: string;
  }[];
  unit_price?: string;
  total_price?: string;
  program_status: {
    status: string,
    date_status: string,
  }[];
}

export interface GroupInterface {
  _id?:string,
  groupName: string,
  note:string,
  startPoint: string,
  dateStart: string,
  timeStart: string,
  Destination: string,
  dateEnd: string,
  timeEnd: string,
  status: string,
  id_school: string,
  program:string
  students: {
    _id: string;
    firstName: string,
    lastName: string,
    id_file:string,
    groupId?:string,
    groupJoiningDate?:string
}[];
}

export const programmSlice = createApi({
  reducerPath: "programm",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/programm/",
  }),
  tagTypes: ["Programm","SendResponse","GroupInterface"],
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

      fetchGroupStudentByIdGroup: builder.query<GroupInterface[], string | void>({
        query: (_id) => ({
          url: `get-program-groups-students/${_id}`,
          method: "GET",
        }),
        providesTags: ["GroupInterface"],
      }),

      deleteProgram: builder.mutation<void, string>({
        query: (_id) => ({
          url: `/deleteProgram/${_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Programm"],
      }),
      sendResponse: builder.mutation<void, SendResponse>({
        query({
          id,
          notes_for_client,
          unit_price,
          total_price,
          program_status,
        }) {
          return {
            url: "/sendResponse",
            method: "POST",
            body: {
              id,
              notes_for_client,
              unit_price,
              total_price,
              program_status,
            },
          };
        },
        invalidatesTags: ["Programm", "SendResponse"],
      }),

    };
  },
});

export const { useAddProgrammMutation, useFetchProgrammsQuery,useDeleteProgramMutation ,  useSendResponseMutation,useFetchGroupStudentByIdGroupQuery} = programmSlice;
