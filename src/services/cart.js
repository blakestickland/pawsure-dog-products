import firestore from "./firestore";

// CRUD items in a database

// READ of CRUD -- ALL RECORDS

// clean a single record,
const cleanRecord = (docSnapshot) => ({
  id: docSnapshot.id,
  ...docSnapshot.data(),
});

// clean all records
const cleanRecords = (querySnapshot) => {
    return querySnapshot.docs.map(cleanRecord);
};

// get all cartItems from firestore
export const getCartItems = async () => {
    // the Firestore Collection reference
    const colRef = firestore.collection("cartItems");
    // create a Snapshot
    const snapshot = await colRef.get();

    return cleanRecords(snapshot);
};

// CREATE of CRUD
export const createCartItem = async (item) => {
    // store collection reference in a variable
    const colRef = firestore.collection("cartItems");
    // store the passed-in item in the document reference
    const docRef = colRef.doc();
    await docRef.set(item);
}
// UPDATE of CRUD
export const updateCartItem = async (id, partial) => {
    const colRef = firestore.collection("cartItems");
    const docRef = colRef.doc(id);
    await docRef.update(partial);
}
// DELETE of CRUD
export const deleteCartItem = async (id) => {
    const colRef = firestore.collection("cartItems");
    const docRef = colRef.doc(id);
    await docRef.delete();
}