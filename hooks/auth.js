import { useState, useEffect } from "react";

import firebase from "../services/firebase";

export function signIn(provider) {
  let authProvider = {};

  switch (provider) {
    case "google":
      authProvider = new firebase.auth.GoogleAuthProvider();
      break;

    case "facebook":
      break;

    default:
      // Default is email sign in
      break;
  }

  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      firebase
        .auth()
        .signInWithPopup(authProvider)
        .then(credentials => {
          firebase
            .firestore()
            .collection("users")
            .doc(credentials.user.uid)
            .set({
              email: credentials.user.email
            });
        })
        .catch(function(error) {
          console.error(error.message);
        });
    });
}

export function signOut() {
  firebase
    .auth()
    .signOut()
    .then(
      () => {
        console.log("Sign out successful");
      },
      error => {
        console.log(error.message);
      }
    );
}

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    let firebaseAuthListener = firebase.auth().onAuthStateChanged(userData => {
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    });

    return () => { firebaseAuthListener = null; };

  }, []);

  return user;
}
