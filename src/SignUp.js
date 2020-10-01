import React, {useState , useContext} from 'react';
import './SignUp.css'
import {Link} from "react-router-dom";
import Firebase from "./Firebase";
import {LoginContext} from "./userContext";
export function SignUp(props){
        let [Context,setContext] = useContext(LoginContext);
        let login = Context.Login;
        let setLoginState = State => setContext({Login: State});
        let email = Context.email;
        let setEmail = email => setContext({email: email});
        let fullName = Context.fullName;
        let setFullName = fullName => setContext({fullName: fullName});
        let userId = Context.userId;
        let setUserId = userId => setContext({userId: userId});
        let password = Context.password;
        let setPassword = password => setContext({password: password});
        let profilePhoto = Context.profilePhoto
        let setProfilePhoto = profilePhoto => setContext({profilePhoto: profilePhoto});
    async function sett(){
        try{
            await Firebase.signUp(fullName,email,password,userId);
            setLoginState(true);
            props.history.replace('/');
        } catch (error){
            console.log(error.message);
        }
    }
        return (
                    <div className="page">
                        <div className="header">
                            <h1 className="logo">Instagram</h1>
                            <p>Sign up to see photos and videos from your friends.</p>
                            <button style={{backgroundColor: "orangered"}}>
                            <i className="fab fa-google-square"></i> Log in with Google !</button>
                            <div>
                                <hr />
                                    <p>OR</p>
                                    <hr />
                            </div>
                        </div>
                        <div className="container">
                            <div>
                                <input type="text" placeholder="Mobile Number or Email" name='Email' onChange={ e => setEmail(e.target.value)} value={email}/>
                                    <input type="text" placeholder="Full Name" name='Full Name' onChange={e => setFullName(e.target.value)} value={fullName}/>
                                        <input type="text" placeholder="UserId" name='Username' onChange={ e => setUserId(e.target.value)} value={userId}/>
                                            <input type="password" placeholder="Password" name='Password' onChange={ e => setPassword(e.target.value)} value={password}/>
                                             <input type='file' name='file' onChange ={e => setProfilePhoto(e.target.files[0])} />
                                                <button onClick={sett}>Sign up</button>
                            </div>

                            <ul>
                                <li>By signing up, you agree to our</li>
                                <li><a href="">Terms</a></li>
                                <li><a href="">Data Policy</a></li>
                                <li>and</li>
                                <li><a href="">Cookies Policy</a> .</li>
                            </ul>
                        </div>
                    <div className="option">
                        <p>Have an account? <Link to ="/Login">Log in</Link></p>
                    </div>
                    <div className="footer">
                        <ul>
                            <li><a href="">ABOUT</a></li>
                            <li><a href="">HELP</a></li>
                            <li><a href="">PRESS</a></li>
                            <li><a href="">API</a></li>
                            <li><a href="">JOBS</a></li>
                            <li><a href="">PRIVACY</a></li>
                            <li><a href="">TEMS</a></li>
                            <li><a href="">LOCATIONS</a></li>
                            <li><a href="">TOP ACCOUNTS</a></li>
                            <li><a href="">HASHTAGS</a></li>
                            <li><a href="">LANGUAGE</a></li>
                        </ul>
                        <p>© 2020 PICTUREGRAM</p>
                        </div>
                        </div>
        );
}