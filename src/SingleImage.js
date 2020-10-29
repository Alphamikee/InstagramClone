import React, { useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as Comment } from './comment.svg';
import { ReactComponent as Heart } from './heart.svg';
import {ReactComponent as Play } from './play.svg'
import { LoginContext } from './userContext';
import Firebase from './Firebase';
const ImgContainer = styled.div`
  position: relative;
  flex-basis: 100%;
  flex-basis: calc(33.333% - 20px);
  margin: 10px;
  cursor: pointer;
  transition: 0.5s all ease-in;
`;
 
const ImgIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  margin-right: 20px;
 
  svg {
    margin-right: 10px;
  }
`;
 
const ImgMeta = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
 
  ${ImgContainer}:hover & {
    display: flex !important;
  }
`;
 
const Img = styled.img`
  cursor: pointer;
  width: 100%;
`;
function Image (props) {
  const item = props.image
  let {state,update} = useContext(LoginContext);
  let CurrentUser = state.allUsersData.filter(user => user.id === Firebase.auth.currentUser.uid)[0];
  function like(){
    let copyData = [...state.Posts];
    let targetPost = copyData.filter( post => post.id === item.id)[0];
    let targetIndex = copyData.findIndex( post => post.id === item.id);
    item.likes.includes(CurrentUser.userId) ? 
    copyData[targetIndex] = {...copyData[targetIndex] , likes: copyData[targetIndex].likes.filter(user => user !== CurrentUser.userId)}
     : targetPost.likes.push(CurrentUser.userId);
     Firebase.db.collection("Posts").doc(item.id).update({
         likes: copyData[targetIndex].likes
     })
    update({Posts: copyData});
}
  return (
    <ImgContainer>
      <Img src={item.image} />
      <ImgMeta>
        <ImgIcons>{item.isVideo ? <Play /> : <image src={require('./heart.svg')} onClick={like} style={{fill: ! item.likes.includes(CurrentUser.userId) ? 'white' : 'red'}}> <Heart /> </image> } {item.likes.length}</ImgIcons>
        <ImgIcons><Comment /> {item.Comments.length}</ImgIcons>
      </ImgMeta>
    </ImgContainer>
  )
}
   
  export default Image;
