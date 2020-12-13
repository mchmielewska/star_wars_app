import * as types from '../actions/types';
import errorsReducer from './errorsReducer';

describe('Errors Reducer', () => {

    it('Should return default state', () => {
        const newState = errorsReducer(undefined, {});
        expect(newState).toEqual({
            error: null
        });
    });

    describe('Errors reducer - checking types', () => {

        it('Should return new state if receiving type GET_ERRORS', () => {

            const action = 
            {
                error: undefined            
            };

            const newState = errorsReducer(undefined, {
                type: types.GET_ERRORS,
                payload: action
            });

            expect(newState).toEqual(
                { error: action.error });
        })
    });

})