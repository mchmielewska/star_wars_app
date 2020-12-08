import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'

import Header from './components/Header'
import Films from './components/Films';
import Character from './components/Character'
import { getFilmsList } from './actions/filmsactions';
import { getCharactersList } from './actions/charactersactions';

class App extends Component {

  render() {
    store.dispatch(getFilmsList());
    store.dispatch(getCharactersList());
    return (
      <Provider store={store}>
        <Router>
          
          <div className="container">
            <Header />
            <Route exact path="/" component={ Films } />
            <Route exact path="/characters/:id/" component={ Character } />
          </div>
      
        </Router>

      </Provider>
    )
  }
}

export default App;