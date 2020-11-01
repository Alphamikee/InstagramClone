import React , {useContext , useState , useEffect}  from 'react';
import Firebase from "./Firebase";
import {LoginContext} from './userContext'
import { Redirect, Route, Router } from 'react-router-dom';
import NavBar from "./navBar";
import MainContents from "./MainContents";
function Home(props){
    let {state,update} = useContext(LoginContext);
    let [State, setState] = useState('');
    let [sillyState , setSillyState] = useState(0);
    let [allPhotos , setallPhotos] = useState([]);
    function SignOut(){
        Firebase.logout();
        update({state: false})
    }
    function toggleDocs(UID){
        let usersRef = Firebase.db.collection('User').doc(UID);
        usersRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            usersRef.onSnapshot((doc) => { 
             setTimeout(() => {
               setState(doc.data().profilePhoto);
              setSillyState(true);
             }, 800); 
            });
          } else {
            usersRef.set({
              password: state.password,
              email: state.email,
              fullName: state.fullName,
              userId: state.userId,
              followers: [null],
              following: [null],
              profilePhoto: state.profilePhoto.name.replace(/.*[\/\\]/, '')
            }) 
            Firebase.uploadData(state.profilePhoto);
            usersRef.onSnapshot(doc => {
              setState(doc.data().profilePhoto);
              setTimeout(() => {
                setSillyState(true);
               }, 800);
            })
          }
      });
    }
      useEffect( () => {
        (async function test(){
        const snapshot = await Firebase.db.collection('User').get();
        setallPhotos(snapshot.docs.map( doc => doc.data().profilePhoto).filter( name => name !== undefined))
        if(sillyState === true){ 
          update({currentPhoto: State})
          let convertToObject  = (arrayOne,arrayTwo) => {
            let object = {};
            for (let index = 0; index < arrayOne.length;) {
              object[arrayOne[index]] = arrayTwo.filter( url => url.includes( arrayOne[index]))[0];
              index += 1;     
            }
            return object
          }
          Firebase.fetchAllDate().then( data => update({ allUsersData : data.map( data => data[0] = {...data[0] , id: data[1]})}));
          let myArray = [];
          Promise.all(
            allPhotos.map( item => Firebase.downloadData(item).then(myData => myArray.push(myData)
            ).catch(err => alert(err.message))
            )).then( () => { 
              update({finalObject: convertToObject(allPhotos,myArray)});
            })
            Firebase.fetchAllPosts().then(data =>{ 
                update({Posts: data.map( data => data[0] = {...data[0] , id: data[1]})})
            }
          )
          Firebase.fetchAllStories().then(
            data => update({Stories: data.map( data => data[0] = {...data[0] , docId : data[1]})})
          )
        }})()}
       , [ sillyState === true ])
       state.Login ? toggleDocs(Firebase.auth.currentUser.uid) : console.log('state!')
            return (
              state.Login  ?  
              state.Stories.length > 0 ? 
                <div>
                     <NavBar />
                     {console.log(state.Posts)}
                    <MainContents />
                </div> : <div className='loader'></div>
                 : <Redirect to={'/Login' } />
        );
}
export default Home;