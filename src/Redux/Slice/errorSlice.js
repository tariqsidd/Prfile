import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    error:{
      error: false,
      show: false,
      errorMsg:''
    },
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },

  },
});
export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
