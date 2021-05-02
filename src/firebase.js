import firebase from 'firebase';


const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCMZCMVmDTlAC9O93QK99Z3VIMXpDko8wQ",
    authDomain: "shopdata-b2683.firebaseapp.com",
    databaseURL: "https://shopdata-b2683-default-rtdb.firebaseio.com",
    projectId: "shopdata-b2683",
    storageBucket: "shopdata-b2683.appspot.com",
    messagingSenderId: "18055142093",
    appId: "1:18055142093:web:1deae8e0cbfee52de46784"
});

let db = firebaseConfig.firestore();

export { db };



