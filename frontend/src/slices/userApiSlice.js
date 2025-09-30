import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUserData: builder.mutation({
      query: (data) => ({
        url: "/api/user/submit",
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
  }),
});

export const { useAddUserDataMutation,useSubmitFeedbackMutation } = userApiSlice;
