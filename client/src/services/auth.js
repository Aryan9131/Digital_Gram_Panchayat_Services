import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc , getDoc } from "firebase/firestore";
import { db } from "./firebase"; 

export const signUp = async (email, password, additionalData) => {
  const userCredential= await createUserWithEmailAndPassword(auth, email, password);
  const { uid } = userCredential.user;
  // Save additional data in Firestore
  await setDoc(doc(db, "users", uid), { email, ...additionalData });
  return userCredential.user;
};

export const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;
      const token = await userCredential.user.getIdToken();
      // Fetch additional user details from Firestore
       return {_id:uid, token: token}; // Merge auth and Firestore data
    } catch (error) {
       console.log('Error while signing in : '+error); 
       return new Error(error)
    }

};

export const logOut = async () => {
  return await signOut(auth);
};
