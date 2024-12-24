import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllUsers, createStaffAccount } from "../services/firestore";

const initialState = {
  users: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk for fetching all users
export const getAllUsers = createAsyncThunk("admin/getAllUsers", async () => {
  const users = await fetchAllUsers(); // Fetch all users from Firestore
  return users;
});

// Async thunk for creating a new staff account
export const createStaff = createAsyncThunk("admin/createStaff", async (staffData) => {
  const staff = await createStaffAccount(staffData); // Create a new staff account in Firestore
  return staff;
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.users.push(action.payload); // Add the new staff member to the list
      });
  },
});

export default adminSlice.reducer;
