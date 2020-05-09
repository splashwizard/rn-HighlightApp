import { NEW_USER, SAVE_TOKEN } from '../actions/types'

const initialState = {
    user: {},
    token: ''
}

export default function(state = initialState, action){
    switch(action.type){
        case NEW_USER:
            return{
                ...state,
                user:action.payload
            }
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default: 
            return state;
    }
}