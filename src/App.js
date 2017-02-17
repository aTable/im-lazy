import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRoute, } from 'react-router';
import { observer, Provider, } from 'mobx-react';

import logo from './logo.svg';
import './App.css';

import MyApp from './MyApp';
import AppState from './stores/AppState';
import Home from './components/Home';
import Posts from './components/Posts';
import Post from './components/Post';
import NotFound from './components/NotFound';


const store = new AppState();

export default observer(class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          {/*<DevTools />*/}
          <Route path="/" component={MyApp}>
            <IndexRoute component={Home} />
            <Route path="posts" component={Posts}>
              <Route path=":id" component={Post} />
            </Route>
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </Provider>
    );
  }
}
)