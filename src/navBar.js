import React from "react";
import './HOme.css'
function NavBar(props){
    return (
        <div className='NavBar' id='NavBar'>
            <img src={require('./800px-Instagram_logo.svg.png')} alt='instagramLogo' className='image'/>
            <input type='text' name={'subject'} className='instaSearch' placeholder='Search'/>
            <div className='icons'>
                <img src="https://img.icons8.com/material/50/000000/dog-house--v1.png" className='icon'/>
                <img src="https://img.icons8.com/wired/64/000000/paper-plane.png" className='icon'/>
                <img src="https://img.icons8.com/android/24/000000/compass.png" className='icon'/>
                <img src="https://img.icons8.com/android/24/000000/like.png" className='icon'/>
            </div>
        </div>
            )}
            //<a href="https://icons8.com/icon/132/search">Search icon by Icons8</a>
export default NavBar;