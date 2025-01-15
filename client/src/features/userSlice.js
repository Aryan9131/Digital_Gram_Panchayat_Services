// Import the required Firestore functions
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApplication, fetchApplication, fetchUserApplications, fetchUserProfile, updateProfile } from "../services/fireStore";
import { fetchAllServices } from "../services/fireStore";
import { UserApplications } from "../components/UserApplications";
import { loadStripe } from '@stripe/stripe-js';

let stripe;

const initializeStripe = async () => {
  const stripePublicKey = import.meta.env.VITE_STRIPE_PK; // Ensure this is correctly set in your .env file
  stripe = await loadStripe(stripePublicKey);
};
initializeStripe(); // Call the function to initialize Stripe

const initialState = {
  paymentStatus: 'pending',
  services: [],
  searchQuery: "",
  currentApplication: null,
  currentApplicationId: null,
  userDetails: null,
  userApplications: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Fetch User Profile
export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const userProfile = await fetchUserProfile(userId); // Fetch data from Firestore
  return userProfile;
});
// Async thunk for fetching all users
export const getAllServices = createAsyncThunk(`admin/getAllServices`, async () => {
  const services = await fetchAllServices(); // Fetch all users from Firestore
  return services;
});

// Create Application
export const createNewApplication = createAsyncThunk("user/createNewApplication", async (applicationData, applicants) => {
  alert(`${applicants} : createNewApplication called :${applicationData} `);
  const application = await createApplication({applicationData :applicationData, applicants:applicants}); // Fetch data from Firestore
  return application;
});

export const getApplication = createAsyncThunk('user/getApplication', async (applicationId) => {
  const application = await fetchApplication(applicationId);
  return application;
});

export const getUserApplications = createAsyncThunk('user/getUserApplicatons', async (userId) => {
  const applications = await fetchUserApplications(userId);
  return applications;
})

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async ({ userId, updates }) => {
  console.log(" updateUserProfile called with : " + JSON.stringify(updates))
  await updateProfile(userId, updates);
  return { _id: userId, ...updates };
})

export const makeApplicationPayment = createAsyncThunk(
  'user/makePayment',
  async ({ applicationData, applicants, userId, price, service, serviceId }, thunkAPI) => {
    const { dispatch } = thunkAPI; // Access dispatch from thunkAPI
    try {
      console.log(
        'makeApplicationPayment called with : ' +
          JSON.stringify({ applicationData, applicants, userId, price, service, serviceId })
      );

      // Make a POST request to the backend
      const response = await fetch(
        'https://fantastic-tribble-7wj4pjjq7q6fx94j-8000.app.github.dev/create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, price, serviceId, service }),
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(`Error while making payment: ${result.error.message}`);
        throw new Error(result.error.message);
      }

      // Dispatch your action after successful payment
      dispatch(createNewApplication({ applicationData, applicants }));

      return session.id;
    } catch (error) {
      console.error(`Error while making payment (catch block): ${error.message}`);
      return thunkAPI.rejectWithValue(error.message); // Use rejectWithValue to handle errors
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUser: (state) => {
      state.userDetails = null;
    },
    setCurrentApplication: (state, action) => {
      state.currentApplication = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = action.payload; // Store user profile
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentApplicationId = action.payload._id
      })
      .addCase(createNewApplication.rejected, (state, action) => {
        console.log(`Error in createNewApplication  : ${action.error.message}`)
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentApplication = action.payload;
      })
      .addCase(getApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserApplications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userApplications = action.payload;
      })
      .addCase(getUserApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log('updated user --> ' + JSON.stringify(action.payload));
        state.status = "succeeded";
        state.userDetails = action.payload;
      })
      .addCase(makeApplicationPayment.fulfilled, (state, action) => {
        console.log('makeApplicationPayment builder --> ' + JSON.stringify(action.payload));
        state.status = "succeeded";
        return { status: 'success' }
      })
      .addCase(makeApplicationPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        return { status: 'failed' }
      })
  },
});

export const { clearUser, setUser, setCurrentApplication, setSearchQuery } = userSlice.actions;
export default userSlice.reducer;
