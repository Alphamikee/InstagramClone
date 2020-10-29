import React , {useState , useContext} from 'react';
import {LoginContext} from './userContext';
import { ReactComponent as PaperPlane } from './paperPlane.svg';
import {ReactComponent as Chat} from './Chat.svg';
import {ReactComponent as Save} from './Save.svg';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Firebase from './Firebase';
import Popup from 'reactjs-popup';
import ViewPosts from './ViewPosts';
const Div = styled.div`
background-color: white;
display: grid;
grid-template-rows: 1fr 10fr 4fr;
width: 616px;
height: 811px;
margin-left: auto ;
margin-right: auto;
margin-top: 12px;
border-radius: 5px 5px 0px 0px;
`;
const Header = styled.div`
display: grid;
height: 60px;
grid-template-columns: 1fr 6fr 2fr;
align-items: left;
border-top: 1px solid lightgray;
border-right: 1px solid lightgray;
border-left: 1px solid lightgray;
border-radius: 5px 5px 0px 0px;
`;
const Image = styled.img`
width: 616px;
height: 530px;
margin-left: auto;
margin-right: auto;
`
const Footer = styled.div`
border-bottom: 1px solid lightgray;
border-right: 1px solid lightgray;
border-left: 1px solid lightgray;
display: grid;
grid-template-rows: 4fr 1fr;
height: 219px;
`;
const Status = styled.div`
display: inline-block;
border-bottom: 1px solid lightgray;
color: black;
padding-left: 6px;
`;
const InputContaier = styled.div`
width: 614px;
border-bottom: 1px;
margin-left: 0px;
margin-right: 0px;
padding: 3px;
display: grid;
grid-template-columns: 1fr 8fr;
`;
const Input = styled.input`
border: none;
background-color: white;
color: black;
display: inline-block;
width: 570px;
&:focus {
        outline: none;
    };
&::-webkit-input-placeholder {
    color: gray;
  }
`;
const Button = styled.button`
border: none;
font-size: 12px;
margin-left: -20px;
display: inline-block;
background-color: white;
&:focus{
    outline: none;
}
`;
const Img = styled.img`
width: 32px;
height: 32px;
margin-left: auto;
margin-right: auto;
margin-top: 20px;
border-radius: 50%;
border: 1px solid lightgray;
`;
const I = styled.i`
padding: 4px;
display: inline-block;
`;
const P = styled.p`
display: inline-block;
color: gray;
font-size: 14px;
`;
let HeartS = styled.span`   
    background-image: url(".glass.png");
    background-size: 100%;
    background-repeat: no-repeat;
`;
let ImagE = styled.img`
    //filter: invert(15%) sepia(90%) saturate(7438%) hue-rotate(358deg) brightness(103%) contrast(107%);   
    `;
let Btn = styled.button`
    border: none;
    background-color: white;
    display: inline-block;
    margin: auto;
    color: lightblue;
    &:hover {
        color: blue;
    }
    &:focus{
    outline: none;
    }
`;
export default function Posts(props) {
    let [Comment,setComment] = useState('');
    let {state,update} = useContext(LoginContext);
    let CurrentUser = state.allUsersData.filter(user => user.id === Firebase.auth.currentUser.uid)[0];
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
        console.log('hi');
        let copyData = [...state.Posts];
        let targetPost = copyData.filter( post => post.id === props.id)[0];
        targetPost.Comments.push({Content: Comment , Author: CurrentUser.userId , likes: [] , image: props.launcher.img});
        setComment('');
        Firebase.db.collection('Posts').doc(props.id).update({
            Comments: targetPost.Comments
        })
        update({Posts: copyData});
    }
    console.log(props);
    return (
        <Div>
        <Header > 
            <Img src={props.launcher.img} alt='launcherPhoto' />
            <Link to ={props.launcher.userId} onClick={createPage}>
            <p style={{marginRight: 'auto' , marginTop: '25px'}}>{props.launcher.userId}</p>
            </Link>
            <Popup modal trigger ={<Btn>ViewPost</Btn>}>
            {close => <ViewPosts close={close} likes={props.likes} Comments={props.Comments} img={props.img} launcher={{img: props.launcher.img , userId: props.launcher.userId}} id={props.id}/>}
            </Popup>
        </Header>
        <Image src={props.img} />
        <Footer>
        <Status>
       <img src={require('./iconmonstr-heart-thin.svg')} onClick={like} style={{filter: props.likes.includes(CurrentUser.userId) ? 'invert(15%) sepia(90%) saturate(7438%) hue-rotate(358deg) brightness(103%) contrast(107%)' : 'none'}}></img>
        <I><Chat /></I>
         <I><PaperPlane /></I>
        <I style={{ marginLeft: '460px'}}><Save /></I>
        <p style={{fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana'}}>{props.Content}</p>
        <p>{props.likes.length} likes</p>
         <P>view all {props.Comments.length} comments</P>
        <p style={{fontSize: '14px'}}>{props.date}</p>
        {props.Comments.length > 2 ? props.Comments.sort( (commentOne,commentTwo) => commentOne.likes + commentTwo.likes).slice(0 , 2).map( comment => <h4>{comment}</h4>) : console.log()}
        </Status>
        <InputContaier>
        <Input placeholder='Add a comment...' type='text' onChange = { e => setComment(e.target.value)} value={Comment}/>
        <Button style={{color :  Comment.length > 0 ? 'blue' : 'lightblue'}} onClick={comment}>
            Post
        </Button>
        </InputContaier>
        </Footer>
        </Div>
    )
}
