import { combineReducers } from 'redux';
import filmsReducer from './filmsReducer';
import charactersReducer from './charactersReducer';
import favouritesReducer from './favouritesReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
    films: filmsReducer,
    characters: charactersReducer,
    favourites: favouritesReducer,
    errors: errorsReducer
});