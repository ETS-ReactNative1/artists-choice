import fire from "../../config/fire";

const db = fire.firestore();

export function dbAddUser(user, userType) {
  console.log("adding...");
  db.collection("users")
    .doc(user.uid) //Name the document after the current user ID
    .set({
      userID: user.uid,
      userType: userType,
      email: user.email
    })
    .then(() => {
      window.location = "/finishSignup";
    });
}

export function dbGetUser(userID) {
  return db.collection("users").doc(userID);
}
