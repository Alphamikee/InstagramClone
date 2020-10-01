import React , {useContext , useState , useEffect}  from 'react';
import Firebase from "./Firebase";
import './HOme.css'
import {LoginContext} from './userContext'
import { Redirect } from 'react-router-dom';
import NavBar from "./navBar";
import MainContents from "./MainContents";
function Home(props){
    let [Login,setLogin] = useContext(LoginContext);
    let [State, setState] = useState('');
    let [sillyState , setSillyState] = useState(false);
    let [allPhotos , setallPhotos] = useState([]);
    let test;
    function SignOut(){
        Firebase.logout();
        setLogin({Login: false})
    }
    function toggleDocs(UID){
        let usersRef = Firebase.db.collection('User').doc(UID);
        usersRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            usersRef.onSnapshot((doc) => {
              let wanted = doc.data().profilePhoto;
              test = wanted
              setState(test);
             setTimeout(() => {
              setSillyState(true);
             }, 800); 
            //  Firebase.downloadData(test);
            });
          } else {
            usersRef.set({
              password: Login.password,
              email: Login.email,
              fullName: Login.fullName,
              userId: Login.userId,
              followers: [null],
              following: [null],
              profilePhoto: Login.profilePhoto.name.replace(/.*[\/\\]/, '')
            }) // create the document
            Firebase.uploadData(Login.profilePhoto);
            usersRef.onSnapshot(doc => {
           //   Firebase.downloadData(doc.data().profilePhoto);
            })
          }
      });
    }
      useEffect( () => {
        (async function test(){
        const snapshot = await Firebase.db.collection('User').get();
        setallPhotos(snapshot.docs.map( doc => doc.data().profilePhoto).filter( name => name !== undefined))
        if(sillyState === true){ 
          console.log(State);
          console.log(allPhotos)
          await setallPhotos(allPhotos.map( item =>  Firebase.downloadData(item)));
          console.log(allPhotos);
        }
          //allPhotos.map( name => Firebase.downloadData(name))
        })()}
       , [ sillyState === true ])
            return (
         Login.Login ? 
                <div className={'HomeContainer'}>
                    <NavBar />
                    <MainContents />
                    {toggleDocs(Firebase.auth.currentUser.uid)}
                </div> : <Redirect to={'/Login' } />
        );
}
export default Home;