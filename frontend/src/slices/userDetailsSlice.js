import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  finalData: JSON.parse(localStorage.getItem("finalData")) || {},
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
        ...action.payload, // update feedback only
      };
      localStorage.setItem("finalData", JSON.stringify(state.finalData));
    },
    clearUserData: (state) => {
      state.finalData = {};
      localStorage.removeItem("finalData");
    },
  },
});

export const { setStudentDetails, setFinalMark, setFeedback, clearUserData } =
  userSlice.actions;
export default userSlice.reducer;
