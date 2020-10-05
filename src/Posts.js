import React from 'react'

export default function Posts(props) {
    return (
        <div className='gallery' tabIndex='0'>
            <div className='gallery-item'>
            <img src={props.img} alt=''/>
            </div>
            <div className='gallery-item-info'>
                <ul>
                <li className='gallery-item-likes'><span className='visually-hidden'>Likes: </span><i class="fas fa-heart" aria-hidden="true"></i>{props.likes}</li> 
                <li className='gallery-item-comments'><span className='visually-hidden'>Comments: </span><i className='fas fa-comment'></i>{props.comments.length}</li>
                </ul>
            </div>
        </div>
    )
}
