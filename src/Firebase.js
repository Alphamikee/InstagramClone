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
class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore()
        this.addData = this.addData.bind(this);
    }
    login(email,password){
        return this.auth.signInWithEmailAndPassword(email,password);
    }
    addData(fullName,userId){
        console.log(this.auth.currentUser.uid);
        this.db.collection('User').doc(this.auth.currentUser.uid).set({
            fullName: 'fdfd',
        })
    }
    logout(){
        return this.auth.signOut().then(() => console.log('done'));
    }
    async signUp(fullName,email,password,userId){
       // this.addData(email,password,fullName,userId,'dkd');
       await this.auth.createUserWithEmailAndPassword(email,password);
       this.addData(fullName,userId);
    }
   /*addUserId(userId){
        return !this.auth.currentUser ? alert('not auth! ') : this.db.doc(`usersId${this.auth.currentUser.uid}`).set({
            userId
        })
    }*/
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