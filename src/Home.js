import React , {useContext}  from 'react';
import Firebase from "./Firebase";
import './HOme.css'
import {LoginContext} from './userContext'
import { Redirect } from 'react-router-dom';
import NavBar from "./navBar";
import MainContents from "./MainContents";
function Home(props){
    let [Login,setLogin] = useContext(LoginContext)
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
                
            });
          } else {
            usersRef.set({test: 'test'}) // create the document
          }
      });
    }
            return (
         Login.Login ? 
                <div className={'HomeContainer'}> {toggleDocs(Firebase.auth.currentUser.uid)} {console.log(Login)}
                    <NavBar />
                    <MainContents />
                </div> : <Redirect to={'/Login' } />
        );
}
export default Home;