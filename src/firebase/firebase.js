import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsS1VLdKvzdd9Jhqendufj2FYN42Ek3Ao",
  authDomain: "igcafe.firebaseapp.com",
  projectId: "igcafe",
  storageBucket: "igcafe.appspot.com",
  messagingSenderId: "88676271047",
  appId: "1:88676271047:web:b6f09182b7d52b53980fe2",
  measurementId: "G-Z47JYRYVM5"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const storage = getStorage(app)