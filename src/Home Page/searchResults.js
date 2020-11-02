import React , {useContext , useState} from 'react'
import { Link } from 'react-router-dom';
import './searchResults';
import {LoginContext} from '../userContext';
export default function SearchResults(props) {
    let {state,update} = useContext(LoginContext);
    function createPage(){
        update({target: props.userId,
                    targetUser: {
                        fullName: props.fullName,
                        userId: props.userId,
                        followers: props.followers,
                        following: props.following,
                        photo: props.img,
                        id: props.id
                    }
        })
    }
    return (
        <div className='searchResult' onClick={createPage}>
            <img className='searchPhoto' src={props.img}/>
            <div className='searchUserId'><Link to={props.userId}>{props.userId}</Link></div> 
        </div>
    )
}
