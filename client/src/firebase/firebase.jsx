import { initializeApp } from "firebase/app";
import { createContext,useContext } from "react";
import { getStorage ,ref,uploadBytes,getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCh03i-XO3cLg6Cp-qwRHoHWnc1SpZHLeA",
  authDomain: "coffeeproducts-f3780.firebaseapp.com",
  projectId: "coffeeproducts-f3780",
  storageBucket: "coffeeproducts-f3780.appspot.com",
  messagingSenderId: "39854557974",
  appId: "1:39854557974:web:e3b32fec3913e8defa9e37",
  measurementId: "G-3ZGC45M8E5"
};

 const FirebaseContext = createContext(null)
 export const useFirebase =()=>useContext(FirebaseContext)

const firebaseApp = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebaseApp)

export const FirebaseProvider =(props)=>{

    const uploadImage = async(image,url)=>{
        const imageRef = ref(firebaseStorage,`uploads/${url}-${image.name}-${Date.now()}`)
        const uploadresult = await uploadBytes(imageRef,image)
        return uploadresult.ref.fullPath
    }
    const getImage = async(imgUrl)=>{
        try {
            const imageRef = ref(firebaseStorage,imgUrl)
            const url = await getDownloadURL(imageRef)
            return url
        } catch (error) {
            console.log(error);
        }
    }
    return <FirebaseContext.Provider value={{uploadImage,getImage}}>
       {props.children}
    </FirebaseContext.Provider>
}
