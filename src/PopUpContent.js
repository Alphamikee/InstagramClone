import React, { useContext, useState } from 'react';
import {Tab , Tabs , TabList , TabPanel} from 'react-tabs';
import styled from 'styled-components';
import {LoginContext} from './userContext';
import Firebase from './Firebase';
import Posts from './Posts';
let Div = styled.div`
    width: 500px;
    height: 300px;
    background-color: white;
    color: black;
    display: grid;
    grid-template-rows: 1.5fr 12fr;
`;
let StyledTabs = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    color: white;
    text-align: center;
    background-color: #D9AFD9;
    background-image: linear-gradient(90deg, #D9AFD9 0%, #97D9E1 100%);    & > {
        &: focus {
            outline: none;
        }
    }
`;
let PopContent = styled.div`
    display: block;
    text-align: center;
    color: black;
    border: whitesmoke 1px outset;
    margin-top: -10px;
    padding-top: 20px; 
    `;
let Input = styled.input`
    border: none;
    background-color: white;
    height: 25px;
    border-left: 3px aqua solid;
    border-bottom: 1px gray solid;
    margin: auto;
    font-size: 20px;
    &: focus {
            outline: none;
        }
`;
const FileStyling = {
        width:' 0.1px',
        height:' 0.1px',
        opacity: '0',
        overflow: 'hidden',
        position: 'absolute',
        Zindex: '-1'
}
const Label = styled.label`
    display: inline-block;
    border: none;
    color: gray;
    background-color: white;
    height: 25px;
    width: 123px;
    border-bottom: 1px gray solid;
    margin: auto;
    margin-top: 40px;
    font-size: 20px;
    &: focus {
            outline: none;
            color: white; 
        }
`;
let PostButton = styled.button`
    display: inline-block;
    background-color: deepskyblue;
    margin-left: 40px;
    margin-top: auto;
    border: none;
    color: white;
    width: 120px;
    height: 35px;
    &: focus {
        outline: none;
    }
    &: hover {
        //background-color: #1E90FF;
        background: rgb(30,227,255);
        background: linear-gradient(90deg, deepskyblue 0%, #1E90FF) 91%);
    };
`;
export default function PopUpContent({close}) {
    let timeStamp  = require('time-stamp');
    let [content , setContent] = useState('');
    let [image , setImage] = useState('');
    let { state, update} = useContext(LoginContext);
    let Url;
    function post() {
        Firebase.promisedUploadData(image).then(data => {
        Firebase.downloadData(data.ref.name).then(url => console.log(url));
        Firebase.downloadData(data.ref.name).then(url => Url = url).then(() => {
            let doc = Firebase.db.collection('Posts').doc();
            doc.set({
            Author : {
                image: state.finalObject[state.currentPhoto] ,
                userId: state.allUsersData.filter( doc => doc.id === Firebase.auth.currentUser.uid)[0].userId
            } , 
            Comments: [] ,
            Content: content , 
            date :  timeStamp.utc('YYYY/MM/DD:HH:mm:ss') , 
            likes: [] , 
            image: Url
           // postImage: 
        }).then( ()  => {
            let copyData = [...state.Posts];
            copyData.push({
                Author : {
                image: state.finalObject[state.currentPhoto] ,
                userId: state.allUsersData.filter( doc => doc.id === Firebase.auth.currentUser.uid)[0].userId
            } , 
            Comments: [] ,
            Content: content , 
            date :  timeStamp.utc('YYYY/MM/DD:HH:mm:ss') , 
            likes: [] , 
            image: Url,
            id: doc.id
        });
            update({Posts: copyData});
        })})});
    }
    return (
        <Tabs>
            <Div>
            <TabList>  
                <StyledTabs>
                <Tab>Post</Tab>
                <Tab>Story</Tab>
                </StyledTabs>
            </TabList>
            <PopContent>
            <TabPanel>
                <Input placeholder={'Post\'s description'} onChange={ e => setContent(e.target.value)} value={content} />
                <br />
                <input type={'file'} required style={FileStyling} name={'file'} id={'file'} onChange={ e => e.target.files[0] != undefined ? setImage(e.target.files[0]) : console.log()}/>
                <Label for={'file'} > { image.name !== undefined ? image.name : 'Post photo'}</Label>
                <PostButton onClick={post}>Post</PostButton>
            </TabPanel>
            <TabPanel>
                test2
            </TabPanel>
            </PopContent>
            </Div>
        </Tabs>
    )
}
