// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

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

// Firebase에 목록을 추가
export async function addDataToDb(lists) {
  try {
    for (let list of lists) {
      await addDoc(collection(db, "plan"), list);
    }
    console.log("Lists added to DB successfully.");
  } catch (error) {
    console.error(error);
  }
}

// Firebase에 변경된 목록을 업데이트
export async function updateDataToDb(lists) {
  const newItems = lists.filter((item) => !("id" in item));
  console.log(newItems);
  const id = [...new Set(lists.map((item) => item.id))].filter(
    (item) => item !== undefined
  );
  const date = [...new Set(lists.map((item) => item.date))].join();
  const q = query(collection(db, "plan"), where("date", "==", date));

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // 문서의 ID가 삭제할 ID 목록에 포함되어 있지 않은 경우에만 출력하고 삭제
      if (!id.includes(doc.id)) {
        deleteDoc(doc.ref);
      }
    });
    for (let item of newItems) {
      console.log(item);
      await addDoc(collection(db, "plan"), item);
    }
  } catch (error) {
    console.error(error);
  }
}
