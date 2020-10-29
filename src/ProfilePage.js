import React , {useContext} from 'react'
import { LoginContext } from './userContext';
import { Redirect } from 'react-router-dom';
import NavBar from './navBar';
import SingleImage from './SingleImage'
import styled, { createGlobalStyle } from 'styled-components'
import Firebase from './Firebase';
import { useState } from 'react';

const ProfileContainer = styled.div`
  max-width: 1010px;
  width: 100%;
  margin: 20px auto;
`

const ProfileDetails = styled.div`
  display: flex;
  margin-right: auto;
  margin-left: auto;
`
const ProfileDetailsLeft = styled.div`
  margin-right: 40px;
  width: 300px;
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProfileDetailsRight = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  flex-direction: column;
`
const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
`
const ProfileDetailsUsername = styled.div`
  display: flex;
  align-items: center;
  margin-top: -30px;
  justify-content: center;
  margin-bottom: 15px;
`

const EditProfileButton = styled.div`
  background-color: transparent;
  border: 1px solid #dbdbdb;
  color: #262626;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  padding: 5px 9px;
  text-transform: capitalize;
  font-size: 14px;
  margin-left: 20px;
`

const HeadingThreeText = styled.p`
  font-family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  font-size: 28px;
  line-height: 32px;
  letter-spacing: normal;
  fill: #262626;
`
const ParagraphText = styled.p`
  margin-right: 25px;
  margin-bottom: 10px
`

const ProfileDetailsMeta = styled.div`
  display: flex;
  justify-content: center;
`
const ProfileDetailsName = styled.div`
  text-align: left;
`

const ImagesWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
`
let AppWarpper = styled.div`
  background-color: #fafafa;
  fill: #fafafa;
  margin-top: -20px;
  margin-bottom: 0px;
  `;
export default function ProfilePage(props) {

    let { state , update } = useContext(LoginContext);
    let [sillyState,setsillyState] = useState(false);
    let CurrentUser = state.allUsersData.filter( person => person.profilePhoto === state.currentPhoto)[0];
    function EditProfile(){
      let elementIndex = state.array.findIndex( object => object.userId === 'Alpha');
      console.log(elementIndex);
      let copyState = [...state.array];
      console.log(copyState);
      copyState[elementIndex] = {...copyState[elementIndex] , userId: 'hisss'}
      update({array : copyState})
      console.log(state.array)
    }
    function follow(){
      console.log(CurrentUser);
      update({[state.allUsersData.filter( doc => doc.id ===  props.id)]: state.allUsersData.filter(doc => doc.id === props.id)[0].followers.push(CurrentUser.userId)})
      update({[state.allUsersData.filter( doc => doc.id === Firebase.auth.currentUser.uid)]: state.allUsersData.filter(doc => doc.id === Firebase.auth.currentUser.uid)[0].following.push(props.UserId)})
      console.log(CurrentUser);
      Firebase.db.collection('User').doc(props.id).update({
      followers: state.targetUser.followers
      })
      Firebase.db.collection('User').doc(Firebase.auth.currentUser.uid).update({
      following: CurrentUser.following
      })}
      function unFollow(){
        let elementIndex = state.allUsersData.findIndex( doc => doc.id === props.id);
        let copyUsersData = [...state.allUsersData];
        copyUsersData[elementIndex] = {...copyUsersData[elementIndex] , followers : state.allUsersData[elementIndex].followers.filter( follower => follower !== CurrentUser.userId)}
        let followingIndex = state.allUsersData.findIndex( doc => doc.id === Firebase.auth.currentUser.uid);
        copyUsersData[followingIndex] = {...copyUsersData[followingIndex] , following : state.allUsersData[followingIndex].following.filter( user =>  user !== props.UserId)}
        console.log(copyUsersData);
        console.log(state.allUsersData);
        console.log(copyUsersData);
        Firebase.db.collection('User').doc(props.id).update({
          followers:  copyUsersData[elementIndex].followers
          })
          Firebase.db.collection('User').doc(Firebase.auth.currentUser.uid).update({
          following: copyUsersData[followingIndex].following
          })
          update({allUsersData : copyUsersData});
          setsillyState( !setsillyState);
      }
     let Posts = state.Posts.filter( Post => Post.Author.userId === props.UserId);
      Posts.length > 0 ? Posts = Posts.map( post => (
        <SingleImage image={post} key={post.id} />
    )) : Posts = <div>{console.log(state.Posts.filter( Post => Post.Author.userId === props.UserId))}</div>
     return (
      state.allUsersData.length > 2 && state.Login === true  ? 
      [ <NavBar /> , <AppWarpper>
                       <ProfileContainer>
                    <ProfileDetails>
                        <ProfileDetailsLeft>
                            <ProfileImage src={props.img} />
                        </ProfileDetailsLeft>
                        {console.log(props)}
                        {console.log(state.Posts)}
                        <ProfileDetailsRight>
                            <ProfileDetailsUsername>
                                <HeadingThreeText>
                                    {props.UserId} 
                                </HeadingThreeText>
                                { Firebase.auth.currentUser.uid === props.id ? <EditProfileButton onClick={EditProfile}>Edit Profile</EditProfileButton> : 
                                  CurrentUser.following.includes( props.UserId) === false ? 
                                 <EditProfileButton onClick={follow}>
                                   follow
                                 </EditProfileButton>:
                                  <EditProfileButton onClick = {unFollow}>
                                   unFollow
                                  </EditProfileButton>
                              }
                            </ProfileDetailsUsername>
                            <ProfileDetailsMeta>
                                <ParagraphText>
                                    <strong>{Posts.length}</strong>  posts
                                </ParagraphText>
                                <ParagraphText>
                                  {console.log(props.followers)}
                                    <strong>{props.followers.length}</strong>  followers
                                </ParagraphText>
                                <ParagraphText>
                                    <strong>{props.following.length}</strong>  follwings
                                </ParagraphText>
                            </ProfileDetailsMeta>
                            <ProfileDetailsName>
                                <ParagraphText>
                                    {props.fullName}
                                </ParagraphText>
                            </ProfileDetailsName>
                        </ProfileDetailsRight>
                    </ProfileDetails>
                    {console.log(state.Posts.filter( Post => Post.Author.userId === props.UserId))}
                    <ImagesWrapper>
                      {Posts}
                    </ImagesWrapper>
                </ProfileContainer> 
                </AppWarpper>
        ]   : <Redirect to='/' />
    ) 
}
