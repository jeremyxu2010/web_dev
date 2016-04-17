import {CHANGE_NAME} from '../constants/GreetingConstant.js'

const initialState = {
    name: '',
    output: ''
}

export function GreetingReducer(state = initialState, action) {

    if (typeof state === 'undefined') {
        return initialState;
    }

    switch(action.type) {
        case CHANGE_NAME:
            return Object.assign({}, state, {
                name : action.name,
                output: 'Hello, ' + action.name
            });
        default:
            return state;
    }
};
