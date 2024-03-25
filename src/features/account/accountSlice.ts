import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "app/store";

export interface UserResponse {
  results: Account;
  token: string;
  message: string;
}
export interface Account {
  idCompte: number;
  fullname: string;
  username: string;
  password: string;
  role: number;
  code: string;
  avatar: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export const accountSlice = createApi({
  reducerPath: "account",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/authSchool/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Account"],
  endpoints(builder) {
    return {
    
      login: builder.mutation<UserResponse, LoginRequest>({
        query: (credentials) => ({
          url: "/loginSchool",
          method: "POST",
          body: credentials,
        }),
      }),
      updateAccount: builder.mutation<void, Account>({
        query: ({ idCompte, ...rest }) => ({
          url: `editUser/${idCompte}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["Account"],
      }),
      deleteCompte: builder.mutation<void, number>({
        query: (idCompte) => ({
          url: `removeUser/${idCompte}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Account"],
      }),
    };
  },
});

export const {
  useUpdateAccountMutation,
  useLoginMutation,
  useDeleteCompteMutation,
} = accountSlice;