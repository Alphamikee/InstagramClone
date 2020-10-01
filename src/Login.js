import React, {useState , useContext} from 'react';
import 'firebase/auth';
import './Login.css'
import {LoginContext} from './userContext';
import Firebase from "./Firebase";
import {
    Link,
    withRouter
} from 'react-router-dom'
function Login(props){
    const [Context,setContext] = useContext(LoginContext);
    let [email,setEmail] = useState('');
    let [password ,setPassword] = useState('');
    async function login(){
        try{
            await Firebase.login(email,password);
            setContext({Login: true});
            props.history.replace('/');
        } catch (err){
            console.log(err.message);
        }
    }
        return (
                <div id="wrapper">
                    <div className="main-content"> 
                        <div className="header">
                            <h1 style={{fontFmaily: 'Lobster'}}>Instagram</h1>
                        </div>
                        <div className="l-part">
                            <input type="text" placeholder="Username" className="input-1" name='Username' value={email} onChange={e => setEmail( e.target.value)}/>
                            <div className="overlap-text">
                                <input type="password" placeholder="Password" className="input-2" name='Password' value={password} onChange={event => setPassword(event.target.value)}/>
                            </div>
                            <input type="button" value="Log in" className="btn" onClick={login}/>
                        </div>
                    </div>
                    <div className="sub-content">
                        <div className="s-part">
                            Don't have an account?<Link to ="/SignUp">Sign up</Link>
                        </div>
                    </div>
                </div>
        );
}
export default Login