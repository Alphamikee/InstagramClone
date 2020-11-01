import React , {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Firebase from './Firebase';
import { LoginContext } from './userContext';
let Container = styled.div`
    width: 880px;
    height: 600px;
    margin: 14px;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    background-color: white;
    border: 1px outset whitesmoke;
`;
let Image = styled.img`
    height: 598px;
    width: 544px;
`;
let CommentsSection = styled.div`
    display: grid;
    border-left: whitesmoke 0.1px outset;
    grid-template-rows: 1fr 5.2fr 0.6fr 0.23943fr 0.28169014084fr 0.70422535211fr;
`;
let Bio = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1.5fr 1.5fr;
    border-bottom: whitesmoke 1px solid;
`;
let BioImage = styled.img`
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin: auto;
    margin-left: auto;
    margin-right: 15px;
`;
let CommentContainer = styled.div`
    width: 380px;
    height: 70px;
    border: none;
    border-bottom: whitesmoke 1px solid;
    display: grid;
    grid-template-columns: 1fr 3fr;
`;
let AnotherCommentImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin: auto ;
`;
let Icon = styled.img`
    height: 24px;
    width: 24px;
    margin: auto;
`;
let IconContainer = styled.div`
    width: 100%;
    height: 100%;
    border-bottom: whitesmoke 1px solid;
    border-top: whitesmoke 1px solid;
    padding-top: 6px;
    padding-left: 12px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 4fr;
`;
let Input = styled.input`
    border: none;
    background-color: white;
    color: black;
    display: inline-block;
    & :focus{
        outline: none;
    }
`;
let I = styled.i`
    margin: auto;
    width: 100%;
    margin-right: auto;
    margin-left: 30px; 
    margin-top: 7px;
`;
const Button = styled.button`
    border: none;
    font-size: 12px;
    display: inline-block;
    background-color: white;
    &:focus{
        outline: none; 
    }
    border-left: 1px whitesmoke solid;
    border-top: 1px whitesmoke solid;
`;
let InputsContainer = styled.div`
  max-width: 87%;
  display: grid;
  grid-template-columns: 4fr 1fr;  
`;
function Comments(props) {
    return (
        <CommentContainer>
            <AnotherCommentImage src={props.img}/>
            <p style={{margin: 'auto' , marginRight: 'auto' , marginLeft: '3px'}}><strong>{props.Author}</strong>  {props.Content}</p>
        </CommentContainer>
    )
}

export default function ViewPosts(props) {
    let { state , update } = useContext(LoginContext);
    let CurrentUser = state.allUsersData.filter( user => user.id === Firebase.auth.currentUser.uid)[0];
    let [ Comment , setComment ] = useState('');
    let WantedUser = state.allUsersData.filter( user => user.userId === props.launcher.userId)[0];
    console.log(CurrentUser);
    function like(){
        let copyData = [...state.Posts];
        let targetPost = copyData.filter( post => post.id === props.id)[0];
        let targetIndex = copyData.findIndex( post => post.id === props.id);
        props.likes.includes(CurrentUser.userId) ? 
        copyData[targetIndex] = {...copyData[targetIndex] , likes: copyData[targetIndex].likes.filter(user => user !== CurrentUser.userId)}
         : targetPost.likes.push(CurrentUser.userId);
         Firebase.db.collection("Posts").doc(props.id).update({
             likes: copyData[targetIndex].likes
         })
        update({Posts: copyData});
    }
    function comment(){
        let copyData = [...state.Posts];
        let targetPost = copyData.filter( post => post.id === props.id)[0];
        targetPost.Comments.push({Content: Comment , Author: CurrentUser.userId , likes: [] , image: props.launcher.img});
        setComment('');
        Firebase.db.collection('Posts').doc(props.id).update({
            Comments: targetPost.Comments
        })
        update({Posts: copyData});
    }
    function createPage(){
        let targetUser = state.allUsersData.filter(user => user.userId === props.launcher.userId)[0];
        update({target: props.launcher.userId,
                    targetUser: {
                        fullName: targetUser.fullName,
                        userId: targetUser.userId,
                        followers: targetUser.followers,
                        following: targetUser.following,
                        photo: props.launcher.img,
                        id: targetUser.id
                    }
        })
    }
    function follow(){
        let targetUser = state.allUsersData.filter(user => user.userId === props.launcher.userId)[0];
        update({[state.allUsersData.filter( doc => doc.userId ===  props.launcher.userId)]: state.allUsersData.filter(doc => doc.userId === props.launcher.userId)[0].followers.push(CurrentUser.userId)})
        update({[state.allUsersData.filter( doc => doc.id === Firebase.auth.currentUser.uid)]: state.allUsersData.filter(doc => doc.id === Firebase.auth.currentUser.uid)[0].following.push(props.launcher.userId)})
        Firebase.db.collection('User').doc(WantedUser.id).update({
        followers: targetUser.followers
        })
        Firebase.db.collection('User').doc(Firebase.auth.currentUser.uid).update({
        following: CurrentUser.following
        })}
        function unFollow(){
            let elementIndex = state.allUsersData.findIndex( doc => doc.userId === props.launcher.userId);
            let copyUsersData = [...state.allUsersData];
            copyUsersData[elementIndex] = {...copyUsersData[elementIndex] , followers : state.allUsersData[elementIndex].followers.filter( follower => follower !== CurrentUser.userId)}
            let followingIndex = state.allUsersData.findIndex( doc => doc.id === Firebase.auth.currentUser.uid);
            copyUsersData[followingIndex] = {...copyUsersData[followingIndex] , following : state.allUsersData[followingIndex].following.filter( user =>  user !== props.launcher.userId)}
            Firebase.db.collection('User').doc(WantedUser.id).update({
              followers:  copyUsersData[elementIndex].followers
              })
              Firebase.db.collection('User').doc(Firebase.auth.currentUser.uid).update({
              following: copyUsersData[followingIndex].following
              })
              update({allUsersData : copyUsersData});
                      }
    let RenderComments = props.Comments;
    
    return (
        <Container>
           <Image src={props.img}/> 
           <CommentsSection >
               <Bio>
                   <BioImage src={props.launcher.img}/>
                   <Link onClick={createPage} to={props.launcher.userId}  style={{margin: 'auto' , marginRight: 'auto' , marginLeft: '1px'}} ><strong>{props.launcher.userId}</strong></Link>
                   <strong style={{margin: 'auto' , marginRight: '100px' , marginLeft: '1px'}} onClick={CurrentUser.following.includes(props.launcher.userId) ? unFollow : follow}>{CurrentUser.following.includes(props.launcher.userId) ? 'unfollow' : 'follow'}{console.log(CurrentUser.following.includes(props.launcher.userId))}</strong>
               </Bio>
                <div style={{width: '90%' , height: '100%'}}>
               </div>
               <IconContainer>
               <Icon src={require('./iconmonstr-heart-thin.svg')} onClick={like} style={{filter: props.likes.includes(CurrentUser.userId) ? 'invert(15%) sepia(90%) saturate(7438%) hue-rotate(358deg) brightness(103%) contrast(107%)' : 'none'}} />
               <Icon src={require('./Chat.svg')} />
               <Icon src={require('./paperPlane.svg')} />
               <Icon src={require('./Save.svg')} />
               </IconContainer>
            <I >{props.likes.length > 0 ? `${props.likes.length} likes` : 'No likes yet'}</I>
            <I >{props.date}</I>
            <InputsContainer>
            <Input placeholder='Write a Comment' onChange={ e => setComment(e.target.value)} value = {Comment}/>
            <Button style={{color : Comment.length > 0 ? 'blue' : 'lightblue'}} onClick={ Comment.length > 1 ? comment : () => alert('Please Write a Comment first')}>Post</Button>
            </InputsContainer>
           </CommentsSection>
        </Container>
    )
}
