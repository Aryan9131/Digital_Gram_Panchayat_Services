import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc , getDoc } from "firebase/firestore";
import { db } from "./firebase"; 

export const signUp = async (email, password, additionalData) => {
  console.log('signUp email -->'+email);
  console.log('signUp password -->'+password);
  console.log('additionalData -->'+JSON.stringify(additionalData));
  const userCredential= await createUserWithEmailAndPassword(auth, email, password);
  const { uid } = userCredential.user;
  console.log("userCredential --> "+JSON.stringify(userCredential));
  console.log('auth.currentuser --> '+JSON.stringify(auth.currentUser))
  // Save additional data in Firestore
  await setDoc(doc(db, "users", uid), { email, ...additionalData });
  return userCredential.user;
};

export const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;
      const token = await userCredential.user.getIdToken();
      console.log('userCredential in signIn --> '+JSON.stringify(userCredential.user))
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
