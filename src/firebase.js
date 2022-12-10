import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore/lite';
// TODO: Replace the following with your app's Firebase project configuration

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxLicwleoWVAiqCLuAbDYad4WQZUfnRog",
  authDomain: "foodtucks.firebaseapp.com",
  projectId: "foodtucks",
  storageBucket: "foodtucks.appspot.com",
  messagingSenderId: "854105810628",
  appId: "1:854105810628:web:40055c9d1c6f7a12cc0b91",
  measurementId: "G-SPH97KZXRQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const usersCollection = collection(db, "users")

// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

export const createUser = user => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
  .then((userCredential) => {
    console.log(userCredential);
    const createdUser = userCredential.user;
    setDoc(doc(db, "users", createdUser.uid), {
      Name: user.name
    })
    return usersCollection
    // usersCollection.doc(user.id).set({
    //     "Name": user.name
    // })
    // addDoc(usersCollection, user);
    // ...
  }).catch(error => console.log(error))
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    // ..
  });
   
}

export const signInUser = user => {
  signInWithEmailAndPassword(auth, user.email, user.password)
  .then(userCredential => console.log(userCredential))
  .catch(error => console.log(error))
}

// export default getCities;