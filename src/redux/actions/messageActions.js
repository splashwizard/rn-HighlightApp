import axios from 'axios';
import { SAVE_THREAD_LIST } from './types'
export const saveThreadList = (messages) => async (dispatch) => {
    dispatch({
        type: SAVE_THREAD_LIST,
        payload: messages
    })
}