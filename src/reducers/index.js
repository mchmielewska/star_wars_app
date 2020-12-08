import { combineReducers } from 'redux';
import filmsreducer from './filmsreducer';
import charactersreducer from './charactersreducer';
import favouritesreducer from './favouritesreducer';

export default combineReducers({
    films: filmsreducer,
    characters: charactersreducer,
    favourites: favouritesreducer
});