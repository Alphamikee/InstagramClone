import React, { useContext } from "react";
import styled from "styled-components";
import {LoginContext} from './userContext';
import Posts from './Posts'
import Popup from 'reactjs-popup';
import PopUpContent from './PopUpContent';
import Firebase from "./Firebase";
import Storeis from "./Storeis";
let MainContent = styled.div`
    min-height: 100vw;
    grid-row: 2 / 3;
    display: grid;
    grid-template-columns: 1fr 1fr 0.5fr;
    grid-template-rows: 1fr 5fr;
    width: 100%;
    height: 100%;
`;
let StoriesContainer = styled.div`
    grid-column: 2 / 3;
    background-color: white;
    margin-right: 260px;
    border: whitesmoke 1px outset;
    overflow: visible /*Alpha*/;
    width: 700px;
    height: 100px;
    margin-top: 10%;
    border: lightgrey 1px solid;
`;
 let Div = styled.div`
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    margin-right: auto;
    margin-top: -250px;
 `;
 let Button = styled.button`
    position: fixed;
    background-color: deepskyblue;
    right: 20px;
    bottom: 20px;
    border: none;
    border-radius: 50%;
    color: white;
    width: 60px;
    height: 60px;
    font-size: 53px;
    &: hover {
        //background-color: #1E90FF;
        background: rgb(30,227,255);
        background: linear-gradient(90deg, deepskyblue 0%, #1E90FF) 91%);
    };
    &: focus {
        outline: none;
    }
 `; 
function MainContents(props){
    let {state,update} = useContext(LoginContext);
    let CurrentUser = state.allUsersData.filter(user => user.id === Firebase.auth.currentUser.uid)[0];
    let RenderPosts = state.Posts.map( post => <Posts likes = {post.likes} Comments={post.Comments} launcher={{
        userId: post.Author.userId,
        img: post.Author.image ,
    }}
    img={post.image}
    Content = {post.Content}
    date={post.date}
    id = {post.id}
    />)
    return(
        [ <div id = 'Stories'></div>, <MainContent>
                <StoriesContainer id = 'stories'>
                    <Storeis />
                </StoriesContainer>
                <Div>
                    {RenderPosts}
                </Div>
                <Popup modal trigger ={<Button>+</Button>}>
                     {close => <PopUpContent close={close} />}
                </Popup>
        </MainContent>]
    )
}
export default MainContents;
/**
 *         buildItem('1', 'photo', 3, 'https://pbs.twimg.com/profile_images/782474226020200448/zDo-gAo0_400x400.jpg', '', false, 1492665454),

     stories:  [
         {
             id: props.userId,
             photo: props.userPhoto,
             name: props.userName,
             link:'',
             lastUpdate: props.time,
             items: props.items.map( item => buildStory(item.id,item.type,3,item.src,'',item.lastUpdate)),

 */