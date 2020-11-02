import React, {useState , useContext} from 'react';
import './SignUp.css'
import {Link} from "react-router-dom";
import Firebase from "../Firebase";
import {LoginContext} from "../userContext";
import styled from 'styled-components';
const FileStyling = {
    width:' 0.1px',
    height:' 0.1px',
    opacity: '0',
    overflow: "visible" /*Alpha*/,
    position: 'absolute',
    Zindex: '-1'
}
const Label = styled.label`
    display: inline-block;
    border: none;
    color: gray;
    background-color: white;
    height: 25px;
    width: 123px;
    border-bottom: 1px gray solid;
    margin: auto;
    margin-top: 40px;
    font-size: 20px;
    & :focus {
            outline: none;
            color: white; 
        }
`;
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
        let profilePhoto = state.profilePhoto;
        let setProfilePhoto = profilePhoto => update({profilePhoto: profilePhoto});
        state.availabeUsers === null ?  Firebase.fetchAllDate().then(data => {
            update({availabeUsers: data.map( array => array[0].userId)})
        })  : console.log();
    async function sett(){
        try{
            profilePhoto === '' ? alert('please entire a profile photo ') : 
            state.availabeUsers.includes( userId ) ? alert('please try another UserId !'): 
            await Firebase.signUp(fullName,email,password,userId);
            alert('wait please...');
            setLoginState(true);
            update({UID : Firebase.auth.currentUser.uid})
            let usersRef = Firebase.db.collection('User').doc(Firebase.auth.currentUser.uid);
            usersRef.get()
            .then( docSnapshot => {
              if (docSnapshot.exists) {
                props.history.replace('/');
            } else {
                Firebase.promisedUploadData(profilePhoto).then( data => {
                Firebase.downloadData(data.ref.name).then( dataUrl => {
                usersRef.set({
                  password: state.password,
                  email: state.email,
                  fullName: state.fullName,
                  userId: state.userId,
                  followers: [],
                  following: [],
                  profilePhoto: dataUrl
                })})}).then( () => setTimeout(() => {
                    props.history.replace('/')
                } , 1000)) 
                 
              }
          });
        } catch (error){
            alert(error.message);
        }
    }
    function testing(){
        Firebase.auth.signInWithPopup(Firebase.provider).then( result  => {
            let user = result.user.providerData[0];
            let usersRef = Firebase.db.collection('User').doc(Firebase.auth.currentUser.uid);
            usersRef.get()
            .then( docSnapshot => {
              if (docSnapshot.exists) {
                    update({Login : true});
                     props.history.replace('/');
            } else {
                usersRef.set({
                  password: 'google login',
                  email: user.email ,
                  fullName: user.displayName,
                  userId: user.displayName,
                  followers: [],
                  following: [],
                  profilePhoto: user.photoURL
                }).then(() => { 
                    update({Login : true});
                    props.history.replace('/')}); 
              }
          });
        }).catch( err => alert(err.message))
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
                                <input type="text" placeholder="Mobile Number or Email" name='Email' onChange={ e => setEmail(e.target.value)} value={email} required/>
                                    <input type="text" placeholder="Full Name" name='Full Name' onChange={e => setFullName(e.target.value)} value={fullName} required/>
                                        <input type="text" placeholder="UserId" name='Username' onChange={ e => setUserId(e.target.value)} value={userId} required/>
                                            <input type="password" placeholder="Password" name='Password' onChange={ e => setPassword(e.target.value)} value={password} required/>
                                             <input type='file' name='file' onChange ={e => setProfilePhoto(e.target.files[0])} required style={FileStyling} id = 'profilePhoto'/>
                                             <Label for = 'profilePhoto' > { profilePhoto.name !== undefined ? profilePhoto.name : 'choose a Profile Photo'}</Label>
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