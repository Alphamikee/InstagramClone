import React, {useEffect , useState} from 'react';
import { SignUp } from './SignUp'
import Home from "./Home";
import Firebase from './Firebase'
import {LoginProvider} from "./userContext";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Login from "./Login";
function App(){
    let [firebaseInitialized, setFirebaseInitialized] = useState(false);
    alert('Note: We store ALL YOUR DATA  , so never enter anything important here ! \n*yes even your password and email *');
    useEffect(() => {
        Firebase.isInitialized().then(val =>
        setFirebaseInitialized(val));
    } , []);
        return Firebase.isInitialized() !== false ? (
            <LoginProvider>
                <Router>
                  <Route exact component={Login} path={'/Login'}/>
                  <Route exact component={SignUp} path={'/SignUp'}/>
                  <Route exact component={Home} path={'/'} />
                </Router>
            </LoginProvider>
        ) : <div id={'loader'}><h1>loadeing...</h1></div>;
}
export default App;