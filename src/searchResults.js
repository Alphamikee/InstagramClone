import React , {useContext , useState} from 'react'
export default function SearchResults(props) {
    return (
        <div className='searchResult'>
            <img className='searchPhoto' src={props.img}/>
            <div className='searchUserId'>{props.userId}</div>
        </div>
    )
}
