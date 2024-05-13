import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export interface AddStudentToGroupInterface {
  _id?:string,
  students: string[]
}

export const groupSlice = createApi({
  reducerPath: "Group",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/groupStudent/",
  }),
  tagTypes: ["Group", "AddStudentToGroupInterface"],
  endpoints(builder) {
    return {
      fetchGroup: builder.query<GroupInterface[], number | void>({
        query() {
          return `/getAllGroups`;
        },
        providesTags: ["Group"],
      }),
      addGroup: builder.mutation<void, GroupInterface>({
        query(payload) {
          return {
            url: "/addNewGroup",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Group"],
      }),
      addStudentToGroup: builder.mutation<void, AddStudentToGroupInterface>({
        query: ({ _id, students }) => ({
          url: "/addStudentToGroup",
          method: "POST",
          body: { _id, students }, 
        }),
        invalidatesTags: ["Group", "AddStudentToGroupInterface"], 
      }),
      updateGroup: builder.mutation<void, GroupInterface>({
        query: ({ _id, ...rest }) => ({
          url: `/updateGroupById/${_id}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: ["Group"],
      }),
      deleteGroup: builder.mutation<void, number>({
        query: (_id) => ({
          url: `deleteGroup/${_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Group"],
      }),
    };
  },
});

export const {
  useAddGroupMutation,
  useFetchGroupQuery,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
  useAddStudentToGroupMutation
} = groupSlice;