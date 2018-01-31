import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import BeerList from './BeerList';
import BeerDetails from './BeerDetails';

export default class App extends Component {
  componentWillMount() {
    document.getElementById('loadingView').style.display = 'none';
  }
  render() {
    return (
      <div className='wrapper'>
        <NavBar />
        <Switch>
          <Route exact path='/' component={BeerList} />
          <Route path='/details/:id' component={BeerDetails} />
        </Switch>
      </div>
    );
  }
}
