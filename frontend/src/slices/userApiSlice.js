import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: "/api/user",
      }),
    }),
    addUserData: builder.mutation({
      query: (data) => ({
        url: "/api/user/add-student",
        method: "POST",
        body: data,
      }),
    }),
    submitFeedback: builder.mutation({
      query: (data) => ({
        url: "/api/user/feedback",
        method: "POST",
        body: data,
      }),
    }),
    getFeedbacks: builder.query({
      query: () => ({
        url: "/api/user/getFeedbacks",
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddUserDataMutation,
  useSubmitFeedbackMutation,
  useGetFeedbacksQuery,
} = userApiSlice;
