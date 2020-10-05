import React , {useContext} from 'react'
import Posts from './Posts'
import './ProfilePage.css';
import { LoginContext } from './userContext';
import { Redirect } from 'react-router-dom';
import NavBar from './navBar';
export default function ProfilePage(props) {
    let [Context,setContext] = useContext(LoginContext);
    alert('hellot');
    console.log(Context.allUsersData.length);
    console.log(Context.finalObject);
    console.log(props.img)
    let posts = props.posts > 0 ? props.posts.map( post => <Posts img = {post.img} likes ={post.likes} comments = {post.comments}/>) : <div>There is no Posts yet !</div>
    return (
        Context.allUsersData.length > 2 ? 
            [ <NavBar /> , <header>
                <div>
                <div className='container2' >
                  <div class="profile">
                    <div class="profile-image">
                        <img src={props.img} alt='profilePhoto' style={{height: '152px', width: '152px'}}/>
                      </div>
                      
                <div class="profile-user-settings">
                    <h1 class="profile-user-name">{props.UserId}</h1>
                    <button class="btn profile-edit-btn">Edit Profile</button>
                    <button class="btn profile-settings-btn" aria-label="profile settings"><i class="fas fa-cog" aria-hidden="true"></i> </button>
                </div>
                <div class="profile-stats">
                    <ul>
                        <li><span class="profile-stat-count">{props.posts.length}</span> posts</li>
                        <li><span class="profile-stat-count">{props.followers.length}</span> followers</li>
                        <li><span class="profile-stat-count">{props.following.length}</span> following</li>
                    </ul>
                </div>
                <div class="profile-bio">
                    <p><span class="profile-real-name">{props.fullName}</span>{props.Bio}</p>
                </div>

                    </div>
                </div>
                </div>
            </header> ,
            <main>
                <div className='container2'>
                    <div className='gallery'>
                        {posts}
                    </div>
                </div>
            </main>   
        ]  : <Redirect to='/' />
    )
}
