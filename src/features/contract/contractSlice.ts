import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Contract {
  _id?: string;
  contractName: string;
  invoiceFrequency: string;
  customerNotes: string;
  staffNotes: string;
  prices: string;
  salesperson: string;
  idProgram: string;
  idAccount: string;
  vehicleType: string;
  journeyType: string;
  luggageDetails: string;
  contractStatus: string;
  accountRef: string;
  accountName: string;
  accountEmail: string;
  accountPhone: string;
}

export const contractSlice = createApi({
  reducerPath: "contract",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/contract/",
  }),
  tagTypes: ["Contract"],
  endpoints(builder) {
    return {
      getAllContracts: builder.query<Contract[], number | void>({
        query() {
          return "/getAllContracts";
        },
        providesTags: ["Contract"],
      }),
        getContract: builder.query<Contract, string | void>({
          query: (_id) => ({
            url: `/getContractByID/${_id}`,
            method: "GET",
          }),
          providesTags: ["Contract"],
        }),
    };
  },
});

export const {
  useGetAllContractsQuery,
  useGetContractQuery
} = contractSlice;