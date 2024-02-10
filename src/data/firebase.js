// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, getDocs, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvdb5Ix3zp6tngjhGoCg3p7rfNePVNI_4",
  authDomain: "fitflow-planner.firebaseapp.com",
  projectId: "fitflow-planner",
  storageBucket: "fitflow-planner.appspot.com",
  messagingSenderId: "504609888",
  appId: "1:504609888:web:87089ed4300d8ccd1ad705",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase 앱 인스턴스를 이용하여 Firestore 데이터베이스를 초기화

export const db = getFirestore(app);

// Firestore에서 데이터를 가져오는 함수
export async function fetchDataFromDb() {
  try {
    const querySnapshot = await getDocs(collection(db, "plan"));
    let dbList = [];
    querySnapshot.forEach((doc) => {
      dbList.push(doc.data());
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


