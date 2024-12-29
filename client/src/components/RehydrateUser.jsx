import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserAuth } from "../features/authSlice"; // Redux action to set userAuth state
import { setUser } from "../features/userSlice"; // Redux action to set userDetails state

import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getAllServices } from "../features/adminSlice";
import {getAllServicesByDepartment} from '../features/staffSlice'

const RehydrateUser = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);
  const auth = getAuth();

  const verifyToken = async (token) => {
    try {
      const response = await fetch("https://organic-space-parakeet-46p9wpp4wj6hj756-8000.app.github.dev/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log("Rehydrated userDetails:", data);
           dispatch(setUser({
             _id:data.user._id,
             name:data.user.name,
             email:data.user.email,
             number:data.user.number,
             password:data.user.password,
             profile:data.user.profile,
             department:data.user.department
           }))
           dispatch(setUserAuth({
            userId:data.user._id,
            token:token
          }))
          if(data.user.profile=='admin'){
            dispatch(getAllServices(data.user._id))
          }else if(data.user.profile=='staff'){
            dispatch(getAllServicesByDepartment(data.user.department))
          }
        } else {
          console.error("Invalid token.");
          navigate('/sign-in');
        }
      } else {
        console.error("Failed to verify token:", response.statusText);
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("Error during token verification:", error);
      navigate("/sign-in");
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("userToken"); // Get token from localStorage
    if (!token) {
      console.log("No token found in localStorage.");
      navigate("/sign-in");
      return;
    }else{
      verifyToken(token); // Call on component mount
    }
  }, []);
  
  return children;
};

export default RehydrateUser;


