import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

import Header from './components/Header'
import FilmsList from './components/FilmsList';
import Film from './components/Film';
import Error from './components/Error'
import Character from './components/Character'
import { getFilmList } from './actions/filmsActions';
import { getCharacterList } from './actions/charactersActions';
import Favourites from './components/Favourites';
export class App extends Component {

  loadData = () => {
    const localState = store.getState()
    if (localState.films.length === 0 || localState.characters.length === 0) {
      store.dispatch(getFilmList());
      store.dispatch(getCharacterList());
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} onBeforeLift={this.loadData}>
          <Router>
            
            <div className="app-component">
              <Header />
              <div className="content">
                <Error />
                <Route exact path="/" component={FilmsList} />
                <Route exact path="/films/" component={FilmsList} />
                <Route exact path="/characters">
                  <Redirect to="/" />
                </Route>
                <Route exact path="/characters/:id/" component={Character} />
                <Route exact path="/films/:id/" component={Film} />
                <Route path="/favourites" component={Favourites} />
              </div>
            </div>

          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;