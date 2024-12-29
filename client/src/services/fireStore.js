// Import the required Firestore functions
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, query, where, updateDoc, addDoc } from "firebase/firestore";
import { db } from "./firebase";


/*
 * Create a new user profile in Firestore
 * @param {object} userData - Data of the user to create
 * @returns {Promise<void>}
 */
// export const createUserProfile = async (userData) => {
//   const usersRef = collection(db, "users");
//   const newUser = await addDoc(usersRef, userData);
//   return { id: newUser.id, ...userData };
// };


/*
 * Fetch user profile by user ID
 * @param {string} userId - User ID
 * @returns {Promise<object>} - User profile data
 */
export const fetchUserProfile = async (userId) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    console.log("user found in fetchUsserProgile --> " + JSON.stringify(userDoc.data()));
    return { _id: userId, ...userDoc.data() };
  } else {
    throw new Error("User not found in Firestore");
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
export const fetchAllServices = async (adminId) => {
  try {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, where("adminId", "==", adminId)); // Filter by adminId
    const servicesDoc = await getDocs(q);

    const services = [];
    servicesDoc.forEach((doc) => {
      services.push({ _id: doc.id, ...doc.data() }); // Include document ID and data
    });

    console.log("Fetched services:", services);
    return services;
  } catch (error) {
    console.error("Error fetching services:", JSON.stringify(error));
    throw error;
  }
}
export const fetchAllServicesByDepartment = async (department) => {
  try {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, where("department", "==", department)); // Filter by adminId
    const servicesDoc = await getDocs(q);

    const services = [];
    servicesDoc.forEach((doc) => {
      services.push({ _id: doc.id, ...doc.data() }); // Include document ID and data
    });

    console.log("Fetched services in getAllServicesByDepartment : ", services);
    return services;
  } catch (error) {
    console.error("Error fetching services in getAllServicesByDepartment : ", JSON.stringify(error));
    throw error;
  }
}

export const fetchService = async (serviceID) => {
  try {
    // Reference the "services" collection
    const servicesRef = collection(db, "services");

    // Query to find the document with _id matching the serviceID
    const q = query(servicesRef, where("_id", "==", serviceID));

    // Execute the query
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching document found!");
      return null; // Return null if no document is found
    }

    // Assuming _id is unique, take the first matched document
    const doc = querySnapshot.docs[0];
    const service = { _id: doc.id, ...doc.data() };

    console.log("Fetched service:" + JSON.stringify(service));
    return service;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};


export const createNewService = async (serviceData) => {
  try {
    console.log('createNewService firestore called --> ', serviceData);
    const serviceRef = collection(db, "services"); // Ensure 'db' is correctly initialized
    console.log('serviceRef initialized --> ', serviceRef);
    const newService = await addDoc(serviceRef, serviceData);
    console.log('Document created successfully: ', newService);
    return { _id: newService.id, ...serviceData };
  } catch (error) {
    console.error('Error creating new service: ', error); // Log Firestore errors
    throw error;
  }
};

export const updateService = async (serviceId, updates) => {
  try {
    // Reference the specific document by its ID
    console.log("Service data got to update -----> " + JSON.stringify({ serviceId: serviceId, updates: updates }))
    const serviceDocRef = doc(db, "services", serviceId);

    // Update the document with the provided updates object
    await updateDoc(serviceDocRef, updates);

    console.log('Service updated successfully');
  } catch (error) {
    console.error('Error updating service: ', error); // Log Firestore errors
    throw error;
  }
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