import { NEW_USER, SAVE_MESSAGES } from '../actions/types'

const initialState = {
    messages: []
}

export default function(state = initialState, action){
    switch(action.type){
        case SAVE_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state;
    }
}