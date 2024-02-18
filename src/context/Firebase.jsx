import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
const FirebaseContext = createContext();
const firebaseConfig = {
  apiKey: "AIzaSyCXQe6bbMw9vAWD77FvBbgGVMgps7AuVo8",
  authDomain: "bookify-4211f.firebaseapp.com",
  projectId: "bookify-4211f",
  storageBucket: "bookify-4211f.appspot.com",
  messagingSenderId: "5010621165",
  appId: "1:5010621165:web:bbc7bcbd0b81d0dff042e4",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const goggleProvider = new GoogleAuthProvider();
const fireStore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
export const useFirebase = () => useContext(FirebaseContext);

export const ContextProvider = (props) => {
  const [user, setUser] = useState(null);
  // create Acount with email and password
  const signUpWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  // Login With email and password
  const logInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  // login with Goggle

  const signinWithGoggle = () => signInWithPopup(firebaseAuth, goggleProvider);
  console.log(user);
  const addDocumentInFirestore = async (name, isbp, price, cover) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadImage = await uploadBytes(imageRef, cover);
    await addDoc(collection(fireStore, "books"), {
      name,
      isbp,
      price,
      imageURl: uploadImage.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
    });
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      console.log(user);
    });
  });

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signUpWithEmailAndPassword,
        logInWithEmailAndPassword,
        signinWithGoggle,
        addDocumentInFirestore,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
