import firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyAGsBA_Rw0d3UjgTc9zygLUgHpAUNlEa8c",
    authDomain: "fb-firebase-9afa2.firebaseapp.com",
    projectId: "fb-firebase-9afa2",
    storageBucket: "fb-firebase-9afa2.appspot.com",
    messagingSenderId: "647594656548",
    appId: "1:647594656548:web:0917e4d0b7d4d3f668e9b1"
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};

