import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ObjectProvider} from './userContext';
import * as serviceWorker from './serviceWorker';
alert('Note: We store ALL YOUR DATA  , so never enter anything important here ! \n*yes even your password and email *');
ReactDOM.render(
  <ObjectProvider>
    <App />
    </ObjectProvider>    
 ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
