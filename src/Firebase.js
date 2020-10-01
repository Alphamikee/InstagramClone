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
        this.storage = app.storage()
        this.uploadData = this.uploadData.bind(this);
        this.downloadData = this.downloadData.bind(this);
        this.fetchAllDate = this.fetchAllDate.bind(this);
    }
    /*      const snapshot = await db.collection('books').get();
            //console.log(snapshot.docs.map(doc => doc.data()));
            this.props.downloadBooks(snapshot.docs.map(doc => doc.data()));
            return snapshot.docs.map(doc => doc.data());
     */
    login(email,password){
        return this.auth.signInWithEmailAndPassword(email,password);
    }
    logout(){
        return this.auth.signOut().then(() => console.log('done'));
    }
    downloadData(value) {
         let storageref = this.storage.ref();
          storageref.child(value).getDownloadURL()
          .then(url => url)
          .catch( error => console.log(error.message));
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
    async fetchAllDate(){
        const snapshot = await this.db.collection('User').get();
        let array =  snapshot.docs.map(doc => doc.data().profilePhoto).filter( name => name !== undefined);
        return array
    }
}
export default new Firebase();
        //console.log(snapshot.docs.map(doc => doc.data().profilePhoto));
     /*     async componentDidMount() {
            const snapshot = await db.collection('books').get();
            console.log(snapshot.docs.map(doc => doc.data()));
            this.props.downloadBooks(snapshot.docs.map(doc => doc.data()));
        return snapshot.docs.map(doc => doc.data());
    }
           */