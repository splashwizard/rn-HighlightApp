import axios from 'axios';
import { SAVE_MESSAGES } from './types'
export const saveMessages = (messages) => async (dispatch) => {
    dispatch({
        type: SAVE_MESSAGES,
        payload: messages
    })
}