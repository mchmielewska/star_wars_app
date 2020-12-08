import { combineReducers } from 'redux';
import filmsreducer from './filmsreducer';
import charactersreducer from './charactersreducer'

export default combineReducers({
    films: filmsreducer,
    characters: charactersreducer
});