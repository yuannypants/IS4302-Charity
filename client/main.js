import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers';

// Mounts React files into div with id 'root' in 'public/index.html'
const MOUNT_NODE = document.getElementById('root');
const renderApp = (Component) => ReactDOM.render(<Component />, MOUNT_NODE);

renderApp(App);

// Webpack Hot Module Replacement API
module.hot && module.hot.accept('./containers', () => {
    renderApp(App);// if you are using harmony modules ({modules:false})
    renderApp(require('./containers'))// in all other cases - re-require App manually
  })