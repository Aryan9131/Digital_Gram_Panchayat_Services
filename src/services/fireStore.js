// Import the required Firestore functions
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, query, where, updateDoc, addDoc } from "firebase/firestore";
import app from "./firebase"; // Import the initialized Firebase app

// Get Firestore instance
const db = getFirestore(app);

/*
 * Fetch user profile by user ID
 * @param {string} userId - User ID
 * @returns {Promise<object>} - User profile data
 */
export const fetchUserProfile = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    throw new Error("User not found");
  }
};

// Additional Firestore functions here...

/*
 * Update user profile by user ID
 * @param {string} userId - User ID
 * @param {object} updates - Fields to update
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (userId, updates) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, updates);
  };
  
  /*
   * Fetch pending applications
   * @returns {Promise<array>} - Array of pending applications
   */
  export const fetchPendingApplications = async () => {
    const applicationsRef = collection(db, "applications");
    const q = query(applicationsRef, where("status", "==", "pending"));
    const querySnapshot = await getDocs(q);
  
    const applications = [];
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
  
    return applications;
  };
  
  /*
   * Approve an application by ID
   * @param {string} applicationId - Application ID
   * @returns {Promise<void>}
   */
  export const approveApplication = async (applicationId) => {
    const applicationRef = doc(db, "applications", applicationId);
    await updateDoc(applicationRef, { status: "approved" });
  };
  
  /*
   * Fetch all users
   * @returns {Promise<array>} - Array of all users
   */
  export const fetchAllUsers = async () => {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
  
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
  
    return users;
  };
  
  /*
   * Create a new staff account
   * @param {object} staffData - Staff data to create
   * @returns {Promise<object>} - Created staff data
   */
  export const createStaffAccount = async (staffData) => {
    const staffRef = collection(db, "staff");
    const newStaff = await addDoc(staffRef, staffData);
    return { id: newStaff.id, ...staffData };
  };
  
  export default db;