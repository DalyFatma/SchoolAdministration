import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Student {
  _id?: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  login: string;
  password: string;
  email: string;
  phone: string;
  classStudent: string;
  houseStreerNumber: string;
  deparment: string;
  country: string;
  card_id: string;
  nameParent: string;
  status_account: string;
  id_creation_date: string;
  id_file: string;
  IdFileExtension: string;
  IdFileBase64String: string;
  DropOff_date:string,
  DropOff_time:string,
  DropOff_station:string,
  pickUp_date:string,
  pickUp_time:string,
  pickUp_station:string,
  group:string,
  photo_id:string,
  PhotoIdBase64String:string,
  PhotoIdExtension:string,
  idSchool?: string,
  groupId?:string | null ,
  groupJoiningDate:string | null 
}

export const studentSlice = createApi({
  reducerPath: "student",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/student/",
  }),
  tagTypes: ["Student"],
  endpoints(builder) {
    return {
      fetchStudents: builder.query<Student[], number | void>({
        query() {
          return `/getAllStudents`;
        },
        providesTags: ["Student"],
      }),
      //   getStudent: builder.query<Student, number>({
      //     query: (idstudent) => `getOneStudent/${idstudent}`,
      //     providesTags: (result, error, idstudent) => [
      //       { type: "Student", idstudent },
      //     ],
      //   }),
      //   getStudentByName: builder.query<Student, string>({
      //     query: (nomProduit) => `getnomProduct/${nomProduit}`,
      //   }),
      addStudent: builder.mutation<void, Student>({
        query(payload) {
          return {
            url: "/registerStudent",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Student"],
      }),
      fetchStudentBySchool: builder.query<Student[], { idSchool: string }>({
        query({ idSchool }) {
          return {
            url: `/getStudentByIdSchool`,
            method: "POST", 
            body: { idSchool }, 
          };
        },
        providesTags: ["Student"],
      }),

      removeStudentFromGroup : builder.mutation<void, { studentId: string, groupId: string }>({
        query: ({ studentId, groupId }) => ({
          url: `student/${studentId}/groups/${groupId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Student'],
      }),
      //   updateProduct: builder.mutation<void, Student>({
      //     query: ({ idproduit, ...rest }) => ({
      //       url: `updateproduct/${idproduit}`,
      //       method: "PATCH",
      //       body: rest,
      //     }),
      //     invalidatesTags: ["Produit"],
      //   }),
      deleteStudent: builder.mutation<void, string>({
        query: (_id) => ({
          url: `/deleteStudent/${_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Student"],
      }),

     
    };
  },
});

export const {
  useFetchStudentsQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useRemoveStudentFromGroupMutation
} = studentSlice;
