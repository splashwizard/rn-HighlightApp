import { SAVE_THREAD_LIST } from '../actions/types'

const initialState = {
    thread_list: []
}

export default function(state = initialState, action){
    switch(action.type){
        case SAVE_THREAD_LIST:
            return {
                ...state,
                thread_list: action.payload
            }
        default:
            return state;
    }
}