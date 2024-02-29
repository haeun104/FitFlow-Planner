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
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: "fitflow-planner",
  storageBucket: "fitflow-planner.appspot.com",
  messagingSenderId: "504609888",
  appId: "1:504609888:web:87089ed4300d8ccd1ad705",
};

// Initialize the Firestore database using the Firebase app instance
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Fetch data from Firestore
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

// Add new lists in Firestore
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

// Update edited lists in Firestore
export async function updateDataToDb(lists) {
  const newItems = lists.filter((item) => !("id" in item));
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
      await addDoc(collection(db, "plan"), item);
    }
  } catch (error) {
    console.error(error);
  }
}

// Delete data in Firestore
export async function deleteDataDb(listOfId) {
  try {
    for (let id of listOfId) {
      const docRef = doc(db, "plan", id);
      await deleteDoc(docRef);
      console.log("document is deleted successfully");
    }
  } catch (error) {
    console.error(error);
  }
}

// Update isDone status in Firestore
export async function updateIsDoneDB(lists) {
  try {
    for (let list of lists) {
      const docRef = doc(collection(db, "plan"), list.id);
      await updateDoc(docRef, { isDone: list.isDone });
      console.log("IsDone is updated successfully");
    }
  } catch (error) {
    console.error(error);
  }
}

// Update isClose status in Firestore
export async function updateIsClosedDB(lists) {
  try {
    for (let list of lists) {
      const docRef = doc(collection(db, "plan"), list.id);
      await updateDoc(docRef, { isClosed: true });
      console.log("IsClose is updated successfully");
    }
  } catch (error) {
    console.error(error);
  }
}
