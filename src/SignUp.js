import React, {useState , useContext} from 'react';
import './SignUp.css'
import {Link} from "react-router-dom";
import Firebase from "./Firebase";
import {LoginContext} from "./userContext";
export function SignUp(props){
        let {state,update} = useContext(LoginContext);
        let login = state.Login;
        let setLoginState = State => update({Login: State});
        let email = state.email;
        let setEmail = email => update({email: email});
        let fullName = state.fullName;
        let setFullName = fullName => update({fullName: fullName});
        let userId = state.userId;
        let setUserId = userId => update({userId: userId});
        let password = state.password;
        let setPassword = password => update({password: password});
        let profilePhoto = state.profilePhoto
        let setProfilePhoto = profilePhoto => update({profilePhoto: profilePhoto});
        state.availabeUsers === null ?  Firebase.fetchAllDate().then(data => {
            update({availabeUsers: data.map( array => array[0].userId)})
        })  : console.log();
    async function sett(){
        try{
            state.availabeUsers.includes( userId ) ? alert('please try another UserId !'): 
            await Firebase.signUp(fullName,email,password,userId);
            setLoginState(true);
            props.history.replace('/');
        } catch (error){
            alert(error.message);
        }
    }
    function testing(){
        
    }
        return (
                    <div className="page">
                        <div className="header">
                            <h1 className="logo">Instagram</h1>
                            <p>Sign up to see photos and videos from your friends.</p>
                            <button style={{backgroundColor: "orangered"}} onClick = {testing}>
                            <i className="fab fa-google-square" ></i> Log in with Google !</button>
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