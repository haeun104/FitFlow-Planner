import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fitflow-planner.firebaseapp.com",
  projectId: "fitflow-planner",
  storageBucket: "fitflow-planner.appspot.com",
  messagingSenderId: "504609888",
  appId: "1:504609888:web:87089ed4300d8ccd1ad705",
};

// Firebase 앱 인스턴스를 이용하여 Firestore 데이터베이스를 초기화
const app = initializeApp(firebaseConfig);

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

// Firestore에 새 목록을 추가
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

// Firestore에 변경된 목록을 업데이트
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

// Firestore에 데이터 삭제
export async function deleteDataDb(listOfId) {
  try {
    for (let id of listOfId) {
      const docRef = doc(db, "plan", id);
      await deleteDoc(docRef);
    }
  } catch (error) {
    console.error(error);
  }
}

// Firestore 에 isDone 상태 업데이트
export async function updateIsDoneDB(lists) {
  try {
    for (let list of lists) {
      const docRef = doc(collection(db, "plan"), list.id);
      await updateDoc(docRef, { isDone: list.isDone });
      console.log("document is updated successfully");
    }
  } catch (error) {
    console.error(error);
  }
}

// Firestore에 isClose 상태 업데이트
export async function updateIsClosedDB(lists) {
  try {
    for (let list of lists) {
      const docRef = doc(collection(db, "plan"), list.id);
      await updateDoc(docRef, { isClosed: true });
      console.log("document is updated successfully");
    }
  } catch (error) {
    console.error(error);
  }
}
