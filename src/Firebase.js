import firebase from "firebase";
import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/firebase-firestore'
var firebaseConfig = {
    apiKey: "AIzaSyAAzyvTDRFNQqQZAmuOau4kUGqXPtEv7w8",
    authDomain: "inastgram-156cc.firebaseapp.com",
    databaseURL: "https://inastgram-156cc.firebaseio.com",
    projectId: "inastgram-156cc",
    storageBucket: "inastgram-156cc.appspot.com",
    messagingSenderId: "28493662096",
    appId: "1:28493662096:web:6bdd09f4c03d3d19255515",
    measurementId: "G-BT5J8YLPQ2"
};
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }
    login(email,password){
        return this.auth.signInWithEmailAndPassword(email,password);
    }
    logout(){
        return this.auth.signOut().then(() => console.log('done'));
    }
    async signUp(fullName,email,password){
        await this.auth.createUserWithEmailAndPassword(email,password);
        return this.auth.currentUser.updateProfile({
            displayName: fullName,
        })
    }
   addUserId(userId){
        return !this.auth.currentUser ? alert('not auth! ') : this.db.doc(`usersId${this.auth.currentUser.uid}`).set({
            userId
        })
    }
    isInitialized(){
    return new Promise(resolve => {
       this.auth.onAuthStateChanged(resolve)
    })
    }
    isLoggedIn(){
        return this.auth.currentUser ? true : false;
    }
}
export default new Firebase();