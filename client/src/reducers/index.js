import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import overlayReducer from './overlayReducer';

export default combineReducers({
    overlay: overlayReducer,
    modal: modalReducer
});