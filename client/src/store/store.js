import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import adminReducer from '../features/adminSlice'
import staffReducer from '../features/staffSlice'
import userReducer from '../features/userSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin:adminReducer,
    staff:staffReducer,
    user:userReducer
  },
});

export default store;
