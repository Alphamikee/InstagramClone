import React , {useContext , useState , useEffect}  from 'react';
import Firebase from "../Firebase";
import {LoginContext} from '../userContext'
import { Redirect } from 'react-router-dom';
import NavBar from "./navBar";
import MainContents from "./MainContents";
function Home(props){
    let {state,update} = useContext(LoginContext);
    let [allowRenderStories , setAllowRenderStories] = useState(false);
    let [allowRenderUsers , setAllowRenderUsers] = useState(false);
      useEffect( () => {
          Firebase.fetchAllDate().then( data => update({ allUsersData : data.map( data => data[0] = {...data[0] , id: data[1]})})).then(() => setAllowRenderUsers(true));
            Firebase.fetchAllPosts().then(data =>{ 
                update({Posts: data.map( data => data[0] = {...data[0] , id: data[1]})})
            }
          )
          Firebase.fetchAllStories().then(
            data => update({Stories: data.map( data => data[0] = {...data[0] , docId : data[1]})})
          ).then( setAllowRenderStories(true))
        }
       , [])
            return (
              state.Login  ?  
              allowRenderStories & allowRenderUsers ? 
                <div>
                     <NavBar />
                    <MainContents />
                </div> : <div className='loader'></div>
                 : <Redirect to={'/Login' } />
        );
}
export default Home;