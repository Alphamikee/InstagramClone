import React  from 'react';
import Firebase from "./Firebase";
import './HOme.css'
import { Redirect } from 'react-router-dom';
import NavBar from "./navBar";
import MainContents from "./MainContents";
function Home(props){
    function SignOut(){
        Firebase.logout();
    }
        return (
        // Firebase.isLoggedIn() ?
                <div className={'HomeContainer'}>
                    <NavBar />
                    <MainContents />
                </div> //: <Redirect to={'/Login'}/>
        );
}
export default Home;