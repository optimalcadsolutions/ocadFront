 
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; 
import { initializeApp } from "firebase/app"; 


export default async function signInAndGetFileURL( file : string ) {
  
  const firebaseConfig = {
    apiKey: "AIzaSyDHpnsGY1RuwBR5fbx-TZyIfj-Fzci6U8g",
    authDomain: "ocadbackend.firebaseapp.com",
    projectId: "ocadbackend",
    storageBucket: "ocadbackend.appspot.com",
    messagingSenderId: "95116377099",
    appId: "1:95116377099:web:6c99022a827ef72b765b0e",
    measurementId: "G-4SVG0Y4XL4"
  };
  
  const app = initializeApp(firebaseConfig);

  // const auth = getAuth(app); 
  
  const storage = getStorage(app);
 
  try {
    
    // const userCredential = await signInWithEmailAndPassword(auth, "solutionsocad@gmail.com", "ocadSolutions#123");  
    // const user = userCredential.user;
    // console.log("User signed in: ", user);

    const storageRef = ref(storage, file )
  

    const url = await getDownloadURL(storageRef); 
    return url;
      
  }
  catch (error) {
    console.error("Error:", error);
    
  }
}
