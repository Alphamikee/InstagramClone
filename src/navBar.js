import React , {useContext , useState}from "react";
import './HOme.css';
import './searchResults.css';
import Firebase from './Firebase';
import {LoginContext} from './userContext';
import Autosuggest from 'react-autosuggest';
import Logo from './InstagramLogo.png'
import SearchResults from "./searchResults";
import { Link } from "react-router-dom";
function NavBar(){
    let [Context,setContext] = useContext(LoginContext);
    //let [inputValue,setinputValue] = useState('');
    let [value,setValue] = useState('');
    let [suggestions,setSuggestions] = useState('');
    let allList = Context.allUsersData;
    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : allList.filter( person => person.userId.toLowerCase().slice( 0 , inputLength) === inputValue)
    }
    const getSuggestionValue = suggestion => suggestion.name;
    const renderSuggestion = suggestion => (
      //  <div>{suggestion.userId}</div>
        <SearchResults userId = {suggestion.userId} img ={Context.finalObject[suggestion.profilePhoto]}/>
    )
    let onSuggestionsFetchRequested = ({value}) => {
        setSuggestions(getSuggestions(value));
    }
    const inputProps = {
        placeholder: 'Type a UserId',
        value,
        onChange: e => setValue(e.target.value)
      };
    let onSuggestionsClearRequested = () => {
        setSuggestions([]);
      }
    return (
        <div className='NavBar' id='NavBar'>
            <img src={Logo} alt='instagramLogo' className='image' style={{marginLeft: 'auto'}}/>
           {/* <input type='text' name={'subject'} className='instaSearch' placeholder='Search' onChange={ e => setinputValue(e.target.value)} value={inputValue}/> */}
           <Autosuggest 
           suggestions ={suggestions}
           onSuggestionsFetchRequested ={onSuggestionsFetchRequested}
           onSuggestionsClearRequested ={onSuggestionsClearRequested}
           getSuggestionValue={getSuggestionValue}
           renderSuggestion={renderSuggestion}
           inputProps={inputProps}
           />
            <div className='icons'>
                <img src="https://img.icons8.com/material/50/000000/dog-house--v1.png" className='icon'/>
                <img src="https://img.icons8.com/wired/64/000000/paper-plane.png" className='icon'/>
                <img src="https://img.icons8.com/android/24/000000/compass.png" className='icon'/>
                <img src="https://img.icons8.com/android/24/000000/like.png" className='icon'/>
               <Link to='ProfilePage'><img src={Context.finalObject[Context.currentPhoto]} className='icon'/></Link> 
            </div>
        </div> 
            )}
            //<a href="https://icons8.com/icon/132/search">Search icon by Icons8</a>
export default NavBar;