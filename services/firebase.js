import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBy0vm8D-sxttWkryDAHrO7K1KgWxYv_Io",
    authDomain: "travel-planner-e252f.firebaseapp.com",
    databaseURL: "https://travel-planner-e252f.firebaseio.com",
    projectId: "travel-planner-e252f",
    storageBucket: "travel-planner-e252f.appspot.com",
    messagingSenderId: "732037472555",
    appId: "1:732037472555:web:c7c658aee75003547ba56e",
    measurementId: "G-N5JHW91CBX"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
