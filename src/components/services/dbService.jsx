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

export function dbSubmitArtistDetails(
  user,
  artistName,
  artistGenre,
  artistCountry,
  artistZipcode
) {
  let altName = "test";

  generateUniqueName(artistName).then(res => {
    altName = res;

    submitNewData(
      user.uid,
      altName,
      artistName,
      artistGenre,
      artistCountry,
      artistZipcode
    );
  });

  function submitNewData(
    userID,
    altName,
    artistName,
    artistGenre,
    artistCountry,
    artistZipcode
  ) {
    db.collection("users")
      .doc(userID)
      .set(
        {
          altName: altName,
          userName: artistName,
          artistGenre: artistGenre,
          artistCountry: artistCountry,
          artistZipcode: artistZipcode
        },
        { merge: true }
      )
      .then(() => {
        console.log("Artist details written!");
        window.location = "/" + altName;
      });
  }

  function generateUniqueName(name) {
    let altName = name.replace(/[^a-zA-Z0-9]/g, "");

    return db
      .collection("users")
      .where("altName", "==", altName)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size === 0) {
          console.log("name is ok");
          return altName;
        } else {
          altName = fixDuplicateName(altName, querySnapshot.size);
          return altName;
        }
      });

    function fixDuplicateName(name, duplicatesLength) {
      return name + duplicatesLength.toString();
    }
  }
}

export function dbGetUserByAltName(name) {
  return db
    .collection("users")
    .where("altName", "==", name)
    .get();
}
