import React, {useEffect , useState , useContext, Fragment} from 'react';
import { SignUp } from './authentication/SignUp'
import Home from "./Home Page/Home";
import Firebase from './Firebase'
import {LoginContext, ObjectProvider} from './userContext';
import ProfilePage from './profile Page/ProfilePage';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch , Redirect
} from 'react-router-dom'
import Login from "./authentication/Login";
function App(){
    let [firebaseInitialized, setFirebaseInitialized] = useState(false);
    let  {state , update} = useContext(LoginContext);
    useEffect(() => {
        Firebase.isInitialized().then(val =>
        setFirebaseInitialized(val));
    } , []);
    let CurrentUser = state.allUsersData.filter( person => person.id === state.UID)[0];
        return Firebase.isInitialized() !== false ? (
            <Router>
                <Switch>
                  <Route exact component={Login} path={'/Login'}/>
                  <Route exact component={SignUp} path={'/SignUp'}/>
                  <Route exact component={Home} path={'/'}/> 
                  <Route exact component={() => <ProfilePage posts={state.Posts.filter( post => post.Author === CurrentUser.userId)} followers={CurrentUser.followers} following={CurrentUser.following} fullName ={CurrentUser.fullName} img={CurrentUser.profilePhoto}  UserId={CurrentUser.userId } id={CurrentUser.id} />} path={'/ProfilePage'}  />
                  <Route exact component={() => <ProfilePage posts={[]} followers={state.targetUser.followers} following={state.targetUser.following} fullName ={state.targetUser.fullName} img={state.targetUser.photo}  UserId={state.targetUser.userId }  id={state.targetUser.id} /> } path={`/${state.target}`} /> 
                 </Switch>
            </Router>
        ) : <div id={'loader'}><h1>loadeing...</h1></div>;
} //                        posts,followers,following,fullName
export default App;