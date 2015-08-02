'use strict';

import {
	ADD_MESSAGE,
	GET_MESSAGES
} from '../constants/actionTypes';

export function addMessage(msg) {
	return dispatch => dispatch({type: ADD_MESSAGE, data: msg});
}

export function getMessages() {
	return dispatch => dispatch({type: GET_MESSAGES, data: null});
}
