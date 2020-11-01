import React , {useContext , useState}from "react";
import './searchResults.css';
import {LoginContext} from './userContext';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
import SearchResults from "./searchResults";
import { Link } from "react-router-dom";
import { ReactComponent as Explore } from './explore.svg';
import { ReactComponent as Avatar } from './avatar.svg';
import { ReactComponent as Compass } from './compass.svg';
import { ReactComponent as HomeIcon} from './icons8-home (1).svg'; 
const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px outset rgba(0,0,0,.0975);
  box-shadow: 0 2px 2px -2px gray;

`
const NavHeader = styled.div`
  max-width: 1010px;
  max-height: 55px;
  padding-bottom: 40px; 
  padding: 26px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`
const NavLeft = styled.div`
  width: 33.333%;
  text-align: left;
`
const NavCenter = styled.div`
  width: 33.333%;
  text-align: center;
`
const NavRight = styled.div`
  width: 33.333%;
  text-align: right;
  svg {
    margin-right: 20px;
  }
`
function NavBar(){
    let {state,update} = useContext(LoginContext);
    let [value,setValue] = useState('');
    let [suggestions,setSuggestions] = useState('');
    let allList = state.allUsersData;
    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : allList.filter( person => person.userId.toLowerCase().slice( 0 , inputLength) === inputValue)
    }
    const getSuggestionValue = suggestion => suggestion.name;
    const renderSuggestion = suggestion => (
        <SearchResults userId = {suggestion.userId} img ={state.finalObject[suggestion.profilePhoto]} followers={suggestion.followers} following={suggestion.following} fullName={suggestion.fullName} id={suggestion.id} key={suggestion.id}/>
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
          <Nav>
            <NavHeader>
            <NavLeft>NotInstagram</NavLeft>    
            <NavCenter>  
            <Autosuggest 
           suggestions ={suggestions}
           onSuggestionsFetchRequested ={onSuggestionsFetchRequested}
           onSuggestionsClearRequested ={onSuggestionsClearRequested}
           getSuggestionValue={getSuggestionValue}
           renderSuggestion={renderSuggestion}
           inputProps={inputProps}
           />
           </NavCenter>  
            <NavRight>
                <Compass />
                <Explore />
            <Link to='/profilePage'>
            <Avatar />
            </Link>
            <Link to='/' >
              <HomeIcon />
            </Link>
            </NavRight>
            </NavHeader>
        </Nav> 
            )}
            //<a href="https://icons8.com/icon/132/search">Search icon by Icons8</a>
export default NavBar;