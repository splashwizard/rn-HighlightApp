import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './src/redux/reducers'

import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const middleware = [thunk];

const store = createStore(
    rootReducer, initialState, 
    composeWithDevTools(
        applyMiddleware(...middleware), 
    )
)

export default store;