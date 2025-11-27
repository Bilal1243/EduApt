import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://eduapt-server.onrender.com" }),  // http://localhost:3000/  // 
  tagTypes: [],
  endpoints: () => ({}),
});
