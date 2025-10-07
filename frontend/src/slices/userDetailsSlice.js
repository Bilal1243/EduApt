import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  finalData: JSON.parse(localStorage.getItem("finalData")) || {},
  testEndTime: localStorage.getItem("testEndTime") || null, // store test end time
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStudentDetails: (state, action) => {
      state.finalData = { ...state.finalData, ...action.payload };
      localStorage.setItem("finalData", JSON.stringify(state.finalData));
    },
    setFinalMark: (state, action) => {
      state.finalData = { ...state.finalData, aptitudeMark: action.payload };
      localStorage.setItem("finalData", JSON.stringify(state.finalData));
    },
    setFeedback: (state, action) => {
      state.finalData = {
        ...state.finalData,
        feedback: action.payload.feedback,
      };
      localStorage.setItem("finalData", JSON.stringify(state.finalData));
    },

    clearUserData: (state) => {
      state.finalData = {};
      state.testEndTime = null;
      localStorage.removeItem("finalData");
      localStorage.removeItem("testEndTime");
    },
    setTestEndTime: (state, action) => {
      state.testEndTime = action.payload;
      localStorage.setItem("testEndTime", action.payload);
    },
  },
});

export const {
  setStudentDetails,
  setFinalMark,
  setFeedback,
  clearUserData,
  setTestEndTime,
} = userSlice.actions;
export default userSlice.reducer;
