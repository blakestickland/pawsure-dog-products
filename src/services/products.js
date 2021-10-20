import firestore from "./firestore";


const cleanRecords = (querySnapshot) => {
  return querySnapshot.docs.map(cleanRecord);
}

// CRUD
// Read All-------------
// get all products from firestore
export const getProducts = async () => {
  // Collection Reference
  const colRef = firestore.collection("products");
  // Promise<QuerySnapshot> -> QuerySnapshot
  const snapshot = await colRef.get();

  // Array<QueryDocumentSnapshot> -> Array(T)
  return cleanRecords(snapshot);
};

const cleanRecord = (docSnapshot) => ({
  id: docSnapshot.id,
  ...docSnapshot.data(),
});

// Read One--------------
// get a specific product from firestore using an id
export const findProduct = async (id) => {
  // Collection reference
  const colRef = firestore.collection("products");
  // DocumentReference
  const docRef = colRef.doc(id);
  // Promise<DpcimentSnapshot> -> DocumentSnapshot
  const docSnap = await docRef.get();

  // T -> Custom Object
  return cleanRecord(docSnap);
};
