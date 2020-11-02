import React, { useContext, useEffect  , useState } from 'react';
import Zuck from 'zuck.js';
import Firebase from '../Firebase';
import { LoginContext } from '../userContext';
export default function Storeis() {
    let { state , update } = useContext(LoginContext);
    let myStories = state.Stories;
    let myStoriesArray = []
    let CurrentUser = state.allUsersData.filter( user => user.id === Firebase.auth.currentUser.uid)[0];
    for( let Story in myStories){
        myStoriesArray.push(myStoriesArray[Story]);
    }
    let toArray = obj => {
      let newArray = [];
      for( let value in obj){
        newArray.push(obj[value]);
      }
      return newArray;
    }
   /* [
      {
        [
          {

          }
        ]
      }
    ] */
    let copyStories = [...myStories];
    copyStories = copyStories.map( story => story = {...copyStories[copyStories.findIndex( storee => storee.docId === story.docId)] , items: copyStories[copyStories.findIndex( storee => storee.docId === story.docId)].items.map( item => toArray(item) ).flat()});
    let myStory = {
    id: 'ramon',
    photo: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/users/1.jpg',
    name : 'Ramon',
    link : '',
    lastUpdated : 1575221470504,
    items:   [
      [
        'ramon-1',//id
        'photo',//type
        3,//length
        'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/1.jpg',//src
        'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/1.jpg',//preview
        '',//link
        false,//seen
        false,// linktext
        1575221470504,//last update
      ],
      [
        'ramon-2',
        'video',
        0,
        'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.mp4',
        'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.jpg',
        '',
        false,
        false,
        1575221470504,
      ],
      [
        'ramon-3',
        'photo',
        3,
        'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/3.png',
        'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/3.png',
        'https://ramon.codes',
        'Visit my Portfolio',
        false,
        1575221470504,
      ],
    ] 
  }
  let [storiesElement , setStoriesElement] = useState(null);
  let [ Stories, setStories] = useState(
    copyStories.filter( story => story.name === CurrentUser.userId || CurrentUser.following.includes(story.name)).filter( story => Date.now() / 1000 - story.lastUpdated / 1000 < 86400).map( story => Zuck.buildTimelineItem(
      story.id , story.photo , story.name , story.link , story.lastUpdated , story.items
    )));
  useEffect(() => {
    let stories = new Zuck(storiesElement, {
      skin: 'snapgram', // container class
      avatars: true, // shows user photo instead of last story item preview
      list: false, // displays a timeline instead of carousel
      openEffect: true, // enables effect when opening story - may decrease performance
      cubeEffect: false, // enables the 3d cube effect when sliding story - may decrease performance
      autoFullScreen: false, // enables fullscreen on mobile browsers
      backButton: true, // adds a back button to close the story viewer
      backNative: false, // uses window history to enable back button on browsers/android
      previousTap: true, // use 1/3 of the screen to navigate to previous item when tap the story
      localStorage: true, // set true to save "seen" position. Element must have a id to save properly.
      reactive: true, // set true if you use frameworks like React to control the timeline (see react.sample.html)
      stories: Stories,
    });
  } , [])
  const timelineItems = [];
  Stories.map((story, storyId) => {
    const storyItems = [];
    story.items.map(storyItem => {
      storyItems.push(
        <li
          key={storyItem.id}
          data-id={storyItem.id}
          data-time={storyItem.time}
          className={storyItem.seen ? 'seen' : ''}
        >
          <a
            href={storyItem.src}
            data-type={storyItem.type}
            data-length={storyItem.length}
            data-link={storyItem.link}
            data-linkText={storyItem.linkText}
          >
            <img src={storyItem.preview} />
          </a>
        </li>,
      );
    });
    let arrayFunc = story.seen ? 'push' : 'unshift';
    timelineItems[arrayFunc](
      <div
        className={story.seen ? 'story seen' : 'story'}
        key={storyId}
        data-id={storyId}
        data-last-updated={story.lastUpdated}
        data-photo={story.photo}
      >
        <a className="item-link" href={story.link}>
          <span className="item-preview">
            <img src={story.photo} />
          </span>
          <span className="info" itemProp="author" itemScope="" itemType="http://schema.org/Person">
            <strong className="name" itemProp="name">
              {story.name}
            </strong>
            <span className="time">{story.lastUpdated}</span>
          </span>
        </a>

        <ul className="items">{storyItems}</ul>
      </div>,
    );
  })
  return (
    <div>
              <div ref={node => (storiesElement = node)} id="stories-react" className="storiesWrapper">
          {timelineItems}
        </div>
    </div>
  )
}