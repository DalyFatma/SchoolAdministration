import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Parent {
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
  status: string;
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
  
}

export const parentSlice = createApi({
  reducerPath: "parent",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bouden.uk.oxa.cloud/api/parent/",
  }),
  tagTypes: ["Parent"],
  endpoints(builder) {
    return {
      fetchParents: builder.query<Parent[], number | void>({
        query() {
          return `/getAllStudents`;
        },
        providesTags: ["Parent"],
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
      addParent: builder.mutation<void, Parent>({
        query(payload) {
          return {
            url: "/registerParent",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Parent"],
      }),
      //   updateProduct: builder.mutation<void, Student>({
      //     query: ({ idproduit, ...rest }) => ({
      //       url: `updateproduct/${idproduit}`,
      //       method: "PATCH",
      //       body: rest,
      //     }),
      //     invalidatesTags: ["Produit"],
      //   }),
      deleteParent: builder.mutation<void, string>({
        query: (_id) => ({
          url: `/deleteParent/${_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Parent"],
      }),
    };
  },
});

export const {
  useFetchParentsQuery,
  useAddParentMutation,
  useDeleteParentMutation,
} = parentSlice;
