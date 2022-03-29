
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";



//SDK CONFIG
const config = {
    apiKey: "AIzaSyA68u2KcP6L-mhrrk1fqesfzsPhzC6R35Y",
    authDomain: "react-enero-fb-2cfb6.firebaseapp.com",
    projectId: "react-enero-fb-2cfb6",
    storageBucket: "react-enero-fb-2cfb6.appspot.com",
    messagingSenderId: "1048124528339",
    appId: "1:1048124528339:web:09ce2faf1ecfc080ca6626"
  };


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get(); //object 

    if(!snapShot.exists){
        const {displayName,email} = userAuth;
        const createAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            });
        }catch(error){
            console.log("Error creating User",error.message);
        }
    } 
 
};

//exports 
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Proveedor de google
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt:"select_account"});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;





