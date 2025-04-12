import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBtFPEXXI_uZdp30FsSj1je8RvD1AzRbII",
  authDomain: "netflix-clone-faa23.firebaseapp.com",
  projectId: "netflix-clone-faa23",
  storageBucket: "netflix-clone-faa23.firebasestorage.app",
  messagingSenderId: "575174287812",
  appId: "1:575174287812:web:bcd80efe282ba7e9b2c491"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const user= res.user;

      await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider: "local",
        email,
      })
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email,password)=>{
  try{
   await signInWithEmailAndPassword(auth,email,password);
  }catch (error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = ()=>{
  signOut(auth);
}

export {auth,db,login,signup,logout};