import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: "/api/user",
      }),
    }),
    startTest: builder.mutation({
      query: (data) => ({
        url: "/api/user/start-test",
        method: "POST",
        body: data,
      }),
    }),
    addUserData: builder.mutation({
      query: (data) => ({
        url: "/api/user/submit-test",
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
  useStartTestMutation,
  useAddUserDataMutation,
  useSubmitFeedbackMutation,
  useGetFeedbacksQuery,
} = userApiSlice;
