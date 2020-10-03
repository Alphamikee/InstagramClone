import React , {useContext , useState , useEffect}  from 'react';
import Firebase from "./Firebase";
import './HOme.css'
import {LoginContext} from './userContext'
import { Redirect } from 'react-router-dom';
import NavBar from "./navBar";
import MainContents from "./MainContents";
function Home(props){
    let [Login,setLogin] = useContext(LoginContext);
    let [State, setState] = useState('');
    let [sillyState , setSillyState] = useState(false);
    let [allPhotos , setallPhotos] = useState([]);
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
              setState(doc.data().profilePhoto);
             setTimeout(() => {
              setSillyState(true);
             }, 800); 
            });
          } else {
            usersRef.set({
              password: Login.password,
              email: Login.email,
              fullName: Login.fullName,
              userId: Login.userId,
              followers: [null],
              following: [null],
              profilePhoto: Login.profilePhoto.name.replace(/.*[\/\\]/, '')
            }) 
            Firebase.uploadData(Login.profilePhoto);
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
          setLogin({currentPhoto: State})
          let convertToObject  = (arrayOne,arrayTwo) => {
            let object = {};
            for (let index = 0; index < arrayOne.length;) {
              object[arrayOne[index]] = arrayTwo[index];
              index += 1;     
            }
            return object
          }
          Firebase.fetchAllDate().then( data => setLogin({ allUsersData : data}));
          let myArray = [];
          Promise.all(
            allPhotos.map( item => Firebase.downloadData(item).then(myData => myArray.push(myData)
            ).catch(err => console.log(err.message))
            )).then( () => { 
              setLogin({finalObject: convertToObject(allPhotos,myArray)});
            })
        }
        })()}
       , [ sillyState === true ])
       Login.Login ? toggleDocs(Firebase.auth.currentUser.uid) : console.log('Login!')
            return (
              Login.Login  ?  
              Login.finalObject !== null ? 
                <div className={'HomeContainer'}>
                     <NavBar />
                    {console.log(Login.allUsersData)}
                    <MainContents />
                </div> : <div className='loader'></div>
                 : <Redirect to={'/Login' } />
        );
}
export default Home;