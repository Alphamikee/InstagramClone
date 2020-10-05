import React, {useEffect , useState , useContext} from 'react';
import { SignUp } from './SignUp'
import Home from "./Home";
import Firebase from './Firebase'
import {LoginContext} from './userContext';
import ProfilePage from './ProfilePage';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Login from "./Login";
import Testing from './testing';
//{console.log(Context.allUsersData.filter( item => item.currentPhoto === Context.currentPhoto)[0].followers)}
function App(){
    let [firebaseInitialized, setFirebaseInitialized] = useState(false);
    const [Context,setContext] = useContext(LoginContext);
    useEffect(() => {
        Firebase.isInitialized().then(val =>
        setFirebaseInitialized(val));
    } , []);
        return Firebase.isInitialized() !== false ? (
                <Router>
                  <Route exact component={Login} path={'/Login'}/>
                  <Route exact component={SignUp} path={'/SignUp'}/>
                  <Route exact component={Home} path={'/'} />  
                <Route exact component={() => <ProfilePage posts={[]} followers={Context.allUsersData.filter( person => person.profilePhoto === Context.currentPhoto)[0].followers} following={Context.allUsersData.filter( person => person.profilePhoto === Context.currentPhoto)[0].following} fullName ={Context.allUsersData.filter( person => person.profilePhoto === Context.currentPhoto)[0].fullName} img={Context.finalObject[Context.currentPhoto]}  UserId={Context.allUsersData.filter( person => person.profilePhoto === Context.currentPhoto)[0].userId } />} path={'/ProfilePage'}  />
                </Router>
        ) : <div id={'loader'}><h1>loadeing...</h1></div>;
} //                        posts,followers,following,fullName
export default App;