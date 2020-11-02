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
        this.storage = app.storage();
        this.provider = new app.auth.GoogleAuthProvider();
        this.uploadData = this.uploadData.bind(this);
        this.downloadData = this.downloadData.bind(this);
        this.fetchAllDate = this.fetchAllDate.bind(this);
        this.promisedUploadData = this.promisedUploadData.bind(this);
    }
    login(email,password){
        return this.auth.signInWithEmailAndPassword(email,password);
    }
    logout(){
        return this.auth.signOut().then(() => alert('done'));
    }
   downloadData(value) {
         let storageref = this.storage.ref();
         return storageref.child(value).getDownloadURL()
         .then( url => url)
    }
    async signUp(fullName,email,password,userId){
       await this.auth.createUserWithEmailAndPassword(email,password);
    }
    uploadData(file){
        let storageref = this.storage.ref();
        let thisRef = storageref.child(file.name);
        thisRef.put(file).then(snapshot => alert('done!'));
    }
    isInitialized(){
    return new Promise(resolve => {
       this.auth.onAuthStateChanged(resolve)
    })
    }
    isLoggedIn(){
        return this.auth.currentUser ? true : false;
    }
    fetchAllDate(){
        return  this.db.collection('User').get()
        .then( datas => datas.docs.map( doc => [doc.data() , doc.id]).filter( name => name !== undefined))
        //let array =  snapshot.docs.map(doc => doc.data()).filter( name => name !== undefined);
    }
    fetchAllPosts(){
        return this.db.collection('Posts').get()
        .then(datas => datas.docs.map( doc => [doc.data() , doc.id]))
    }
    promisedUploadData(file){
        return this.storage.ref().child(file.name).put(file)
    }
    fetchAllStories(){
        return this.db.collection('Stories').get()
        .then( Stories => Stories.docs.map( doc => [doc.data() , doc.id]))
    }     
}
export default new Firebase();
