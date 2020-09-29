import React , {useState} from 'react'

export default function Stories(props) {
    function buildStory(id,type,Length,src,preview,link,seen,time){
        return {
            id,
            type,
            Length,
            src,
            preview,
            link,
            seen,
            time
        };
    }
    let stories = new Zuck('stories', {
     backNative: true,
     autoFullScreen: 'true',
     skin: 'Snapgram',
     avatars: 'true',
     list: false,
     cubeEffect: 'true',
     localStorage: true,
     stories:  [
         {
             id: props.userId,
             photo: props.userPhoto,
             name: props.userName,
             link:'',
             lastUpdate: props.time,
             items: props.items.map( item => buildStory(item.id,item.type,3,item.src,'',item.lastUpdate)),
         }]
        }
    )
    return (
        <div id='stories'>
            
        </div>
    )
}
