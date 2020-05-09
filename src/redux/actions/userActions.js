import axios from 'axios';
import { NEW_USER, SAVE_TOKEN } from './types'
export const createUser = (userData) => async (dispatch) => {
    dispatch({
        type: NEW_USER,
        payload: userData
    })
}
export const savetoken = (token) => async (dispatch) => {
    dispatch({
        type: SAVE_TOKEN,
        payload: token
    })
}