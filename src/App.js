import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

import Header from './components/Header'
import Films from './components/Films';
import Film from './components/Film';
import Character from './components/Character'
import { getFilmsList } from './actions/filmsactions';
import { getCharactersList } from './actions/charactersactions';
import Favourites from './components/Favourites';
class App extends Component {

  render() {
    store.dispatch(getFilmsList());
    store.dispatch(getCharactersList());
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={ persistor }>
        <Router>
          
          <div>
            <Header />
            <div className="content">
            <Route exact path="/" component={ Films } />
            <Route exact path="/characters/:id/" component={ Character } />
            <Route exact path="/films/:id/" component={ Film } />
            <Route path="/favourites" component={ Favourites } />
            </div>
          </div>
      
        </Router>
      </PersistGate>
      </Provider>
    )
  }
}

export default App;