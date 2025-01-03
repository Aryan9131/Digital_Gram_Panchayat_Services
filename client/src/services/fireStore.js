// Import the required Firestore functions
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs, query, where, updateDoc, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const fetchUserProfile = async (userId) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    return { _id: userId, ...userDoc.data() };
  } else {
    throw new Error("User not found in Firestore");
  }
};

export const updateUserProfile = async (userId, updates) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, updates);
};

export const fetchPendingApplications = async () => {
  const applicationsRef = collection(db, "applications");
  const q = query(applicationsRef, where("status", "==", "pending"));
  const querySnapshot = await getDocs(q);

  const applications = [];
  querySnapshot.forEach((doc) => {
    applications.push({ _id: doc.id, ...doc.data() });
  });

  return applications;
};

export const updateCurrentApplication = async ({applicationId, status, reason}) => {

  const applicationRef = doc(db, "applications", applicationId);
  await updateDoc(applicationRef, {status : status, reason:reason});
};

export const fetchAllUsers = async () => {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);

  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
};

export const fetchAllAdminServices = async (adminId) => {
  try {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, where("adminId", "==", adminId)); // Filter by adminId
    const servicesDoc = await getDocs(q);

    const services = [];
    servicesDoc.forEach((doc) => {
      services.push({ _id: doc.id, ...doc.data() }); // Include document ID and data
    });

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

    return services;
  } catch (error) {
    console.error("Error fetching services in getAllServicesByDepartment : ", JSON.stringify(error));
    throw error;
  }
}

export const fetchAllServices = async () => {
  try {
    const servicesRef = collection(db, "services"); // Reference to the 'services' collection
    const servicesDoc = await getDocs(servicesRef); // Get all documents in the collection
    const services = [];
    servicesDoc.forEach((doc) => {
      services.push({ _id: doc.id, ...doc.data() }); // Include document ID and data
    });

    return services;
  } catch (error) {
    console.error("Error fetching services:", JSON.stringify(error));
    throw error;
  }
};

export const fetchService = async (serviceID) => {
  try {
    // Reference the specific document by ID
    const serviceRef = doc(db, "services", serviceID);

    // Fetch the document
    const docSnapshot = await getDoc(serviceRef);

    if (!docSnapshot.exists()) {
      console.log("No matching document found!");
      return null; // Return null if no document is found
    }

    // Document exists, extract the data
    const service = { _id: docSnapshot.id, ...docSnapshot.data() };

    return service;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};

export const createNewService = async (serviceData) => {
  try {
    const serviceRef = collection(db, "services"); // Ensure 'db' is correctly initialized
    const newService = await addDoc(serviceRef, serviceData);
    return { _id: newService.id, ...serviceData };
  } catch (error) {
    console.error('Error creating new service: ', error); // Log Firestore errors
    throw error;
  }
};

export const updateService = async (serviceId, updates) => {
  try {
    // Reference the specific document by its ID
    const serviceDocRef = doc(db, "services", serviceId);
    // Update the document with the provided updates object
    await updateDoc(serviceDocRef, updates);
  } catch (error) {
    console.error('Error updating service: ', error); // Log Firestore errors
    throw error;
  }
};

export const createApplication = async (applicationData, applicants) => {
  try {
    const applicationRef = collection(db, "applications"); // Ensure 'db' is correctly initialized
    const newApplication = await addDoc(applicationRef, applicationData);
    //update service applicants number 
    const serviceDocRef = doc(db, "services", applicationData.serviceId);
    await updateDoc(serviceDocRef, { applicants: applicants+1 });
    return { _id: newApplication.id };
  } catch (error) {
    console.error('Error creating new Application: ', error); // Log Firestore errors
    throw error;
  }
};

export const fetchApplication = async (applicationId) => {
  try {
    // Reference the specific document by ID
    const applicationRef = doc(db, "applications", applicationId);

    // Fetch the document
    const docSnapshot = await getDoc(applicationRef);

    if (!docSnapshot.exists()) {
      console.log("No matching application document found!");
      return null; // Return null if no document is found
    }

    // Document exists, extract the data
    const application = { _id: docSnapshot.id, ...docSnapshot.data() };
    return application;
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error;
  }
};

export const fetchAllServiceApplications = async (serviceId)=>{
  try {
    const applicationRef = collection(db, "applications");
    const q = query(applicationRef, where("serviceId", "==", serviceId)); // Filter by adminId
    const applicationDoc = await getDocs(q);
 
    const applications = [];
    applicationDoc.forEach((doc) => {
      applications.push({ _id: doc.id, ...doc.data() }); // Include document ID and data
    });

    return applications;
    
  } catch (error) {
    console.error("Error fetching services in fetchAllServiceApplications : ", JSON.stringify(error));
    throw error;
  }
}

export const fetchUserApplications = async (userId)=>{
  try {
    const applicationRef = collection(db, "applications");
    const q = query(applicationRef, where("userId", "==", userId)); // Filter by adminId
    const applicationDoc = await getDocs(q);

    const applications = [];
    applicationDoc.forEach((doc) => {
      applications.push({ _id: doc.id, ...doc.data() }); // Include document ID and data
    });

    return applications;
    
  } catch (error) {
    console.error("Error fetching services in fetchUserApplicatons : ", JSON.stringify(error));
    throw error;
  }
}

export const createStaffAccount = async (staffData) => {
  const staffRef = collection(db, "staff");
  const newStaff = await addDoc(staffRef, staffData);
  return { id: newStaff.id, ...staffData };
};

export async function deleteServiceAndUpdateApplications(serviceId) {
    try {
        // Delete the service from the services collection
        const serviceRef = doc(db, 'services', serviceId);
        await deleteDoc(serviceRef);

        // Query applications with serviceId == serviceId
        const applicationsRef = collection(db, 'applications');
        const applicationsQuery = query(applicationsRef, where('serviceId', '==', serviceId));
        const querySnapshot = await getDocs(applicationsQuery);

        const updatePromises = [];
        querySnapshot.forEach((applicationDoc) => {
            const applicationRef = doc(db, 'applications', applicationDoc.id);

            // Update each application
            const updatePromise = updateDoc(applicationRef, {
                status: 'AdminRejected',
                reason: 'Service Deleted',
            });

            updatePromises.push(updatePromise);
        });

        // Wait for all updates to complete
        await Promise.all(updatePromises);

    } catch (error) {
        console.error('Error deleting service or updating applications:', error);
        throw new Error('Failed to delete service and update applications.');
    }
}


export default db;